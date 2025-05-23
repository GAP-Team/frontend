import { useState, useEffect } from "react";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
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
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { SideFilterPanelOptionsProps } from "@/typings/types";

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
  const [optionExpanded, setOptionExpanded] = useState<{
    [key: string]: boolean;
  }>({});
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  useEffect(() => {
    setSelectedOptions(preSelectedOptions);
  }, [preSelectedOptions]);

  const toggleSection = (title: string): void => {
    setOpenSections((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  const handleOptionsExpand = (category: string): void => {
    setOptionExpanded((prev) => ({ ...prev, [category]: !prev[category] }));
  };

  const handleOptionSelect = (item: string): void => {
    const facilitySubcategories = handleOptionsSelectFilter(item);
    setSelectedOptions(facilitySubcategories);
    onSelect(facilitySubcategories, title);
  };

  const handleOptionsSelectFilter = (item: string): string[] => {
    return selectedOptions.includes(item)
      ? selectedOptions.filter((selected) => selected !== item)
      : [...selectedOptions, item];
  };

  return (
    <>
      <Box key={title} sx={{ mt: 2 }}>
        <Box sx={styles.panelHeadSection}>
          <Typography variant="subtitle1" fontWeight="bold">
            {title}
          </Typography>
          <IconButton size="small" onClick={() => toggleSection(title)}>
            {openSections[title] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        </Box>
        <Collapse in={openSections[title]}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <FormControl fullWidth>
              <List component="nav" disablePadding>
                {options
                  ?.slice(0, showAllOptions ? options.length : 4)
                  .map((option, index) => (
                    <Box key={index}>
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
                      <Collapse
                        in={optionExpanded[option.category]}
                        timeout="auto"
                        unmountOnExit
                      >
                        <List disablePadding>
                          {option.items.map((item) => (
                            <ListItemButton
                              key={item}
                              onClick={() => handleOptionSelect(item)}
                              sx={{ pl: 4 }}
                            >
                              <Checkbox
                                checked={selectedOptions.includes(item)}
                              />
                              <ListItemText primary={item} />
                            </ListItemButton>
                          ))}
                        </List>
                      </Collapse>
                    </Box>
                  ))}
              </List>
              {options.length > 4 && (
                <Button
                  size="small"
                  sx={{ alignSelf: "flex-start" }}
                  onClick={() => setShowAllOptions(!showAllOptions)}
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
  formControl: {
    display: "block",
    ml: 1,
  },
};
