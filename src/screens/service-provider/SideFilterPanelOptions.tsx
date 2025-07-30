import { useState, useEffect } from "react";
import {
  Box,
  List,
  Button,
  Divider,
  Collapse,
  Checkbox,
  IconButton,
  Typography,
  FormControl,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import {
  NUMBER_OF_STATE_OPTIONS,
  NUMBER_OF_OTHER_OPTIONS,
} from "@/utils/Constants";
import { FilterPanelLabels } from "@/utils/enums";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { SideFilterPanelOptionsProps } from "./contracts/types";

const SideFilterPanelOptions: React.FC<SideFilterPanelOptionsProps> = ({
  title,
  options,
  onSelect,
  preSelectedOptions,
}) => {
  const [showAllOptions, setShowAllOptions] = useState(false);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>(
    options.reduce((acc) => ({ ...acc, [title]: true }), {})
  );
  const [optionExpanded, setOptionExpanded] = useState<Record<string, boolean>>(
    {}
  );
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  useEffect(() => {
    setSelectedOptions(preSelectedOptions);
    if (title === FilterPanelLabels.STATE) {
      const initialExpanded = options.reduce(
        (acc, option) => ({ ...acc, [option.category]: true }),
        {}
      );
      setOptionExpanded(initialExpanded);
    }
  }, [preSelectedOptions, title, options]);

  const toggleSection = (): void => {
    setOpenSections((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  const handleOptionsExpand = (category: string): void => {
    setOptionExpanded((prev) => ({ ...prev, [category]: !prev[category] }));
  };

  const handleOptionSelect = (item: string): void => {
    const updatedSelection = selectedOptions.includes(item)
      ? selectedOptions.filter((selected) => selected !== item)
      : [...selectedOptions, item];

    setSelectedOptions(updatedSelection);
    onSelect(updatedSelection, title);
  };

  const renderItems = (items: string[]): JSX.Element[] =>
    items
      .slice(
        0,
        showAllOptions
          ? items.length
          : title === FilterPanelLabels.STATE
            ? NUMBER_OF_STATE_OPTIONS
            : NUMBER_OF_OTHER_OPTIONS
      )
      .map((item) => (
        <ListItemButton
          key={item}
          onClick={() => handleOptionSelect(item)}
          sx={{ pl: 4 }}
        >
          <Checkbox checked={selectedOptions.includes(item)} />
          <ListItemText primary={item} />
        </ListItemButton>
      ));

  return (
    <>
      <Box key={title} sx={{ mt: 2 }}>
        <Box sx={styles.panelHeadSection}>
          <Typography variant="subtitle1" fontWeight="bold">
            {title}
          </Typography>
          <IconButton size="small" onClick={toggleSection}>
            {openSections[title] ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        </Box>
        <Collapse in={openSections[title]}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <FormControl fullWidth>
              <List component="nav" disablePadding>
                {options
                  .slice(0, showAllOptions ? options.length : 4)
                  .map((option, index) => (
                    <Box key={index}>
                      {option.category !== "Staaten" && (
                        <ListItemButton
                          onClick={() => handleOptionsExpand(option.category)}
                        >
                          <ListItemText primary={option.category} />
                          {optionExpanded[option.category] ? (
                            <ExpandLess />
                          ) : (
                            <ExpandMore />
                          )}
                        </ListItemButton>
                      )}
                      <Collapse
                        in={optionExpanded[option.category]}
                        timeout="auto"
                        unmountOnExit
                      >
                        <List disablePadding>{renderItems(option.items)}</List>
                      </Collapse>
                    </Box>
                  ))}
              </List>

              {(title === FilterPanelLabels.STATE || options.length > 4) && (
                <Button
                  size="small"
                  sx={{ alignSelf: "flex-start" }}
                  onClick={() => setShowAllOptions((prev) => !prev)}
                >
                  <Typography sx={styles.buttonText}>
                    {showAllOptions ? "weniger sehen" : "Mehr sehen"}
                  </Typography>
                </Button>
              )}
            </FormControl>
          </Box>
        </Collapse>
      </Box>
      <Divider sx={{ mt: 2 }} />
    </>
  );
};

export default SideFilterPanelOptions;

const styles = {
  panelHeadSection: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  buttonText: {
    ml: 1,
    mt: 1,
    cursor: "pointer",
    fontSize: "0.875rem",
    color: "primary.main",
    "&:hover": { textDecoration: "underline" },
  },
};
