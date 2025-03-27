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

interface SideFilterPanelOptionsProps {
  title: string;
  options: string[];
}

const SideFilterPanelOptions: React.FC<SideFilterPanelOptionsProps> = ({
  title,
  options,
}) => {
  const [showAllStates, setShowAllStates] = useState(false);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>(
    options.reduce((acc) => ({ ...acc, [title]: true }), {})
  );

  const toggleSection = (title: string): void => {
    setOpenSections((prev) => ({ ...prev, [title]: !prev[title] }));
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
            .slice(0, showAllStates ? options.length : 4)
            .map((option, index) => (
              <FormControlLabel
                key={index}
                control={<Checkbox />}
                label={option}
                sx={{ display: "block", ml: 1 }}
              />
            ))}
          <Button size="small" onClick={() => setShowAllStates(!showAllStates)}>
            <Typography sx={styles.buttonText}>
              {showAllStates ? "weniger sehen" : "Mehr sehen"}
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
};
