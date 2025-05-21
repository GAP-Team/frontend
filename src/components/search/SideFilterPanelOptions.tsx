import { useState } from "react";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Box,
  Button,
  Divider,
  Collapse,
  Checkbox,
  IconButton,
  Typography,
  FormControlLabel,
} from "@mui/material";
import { Item } from "@/utils/Constants";

interface SideFilterPanelOptionsProps {
  title: string;
  options: Item[];
  formik?: any;
}

const SideFilterPanelOptions: React.FC<SideFilterPanelOptionsProps> = ({
  title,
  formik,
  options,
}) => {
  const [showAllOptions, setShowAllOptions] = useState(false);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>(
    options.reduce((acc) => ({ ...acc, [title]: true }), {})
  );
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const toggleSection = (title: string): void => {
    setOpenSections((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  const handleOnSelect = (option: Item): void => {
    console.log("Selected option:", option);
    const states = [];
    formik?.values.states.include(option.value);
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
          {options
            .slice(0, showAllOptions ? options.length : 4)
            .map((option, index) => (
              <FormControlLabel
                key={index}
                label={option.label}
                control={<Checkbox />}
                sx={styles.formControl}
                onChange={() => handleOnSelect(option)}
              />
            ))
          }
          <Button
            size="small"
            onClick={() => setShowAllOptions(!showAllOptions)}
          >
            <Typography sx={styles.buttonText}>
              {showAllOptions ? "weniger sehen" : "Mehr sehen"}
            </Typography>
          </Button>
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
    ml: 1
  }
};
