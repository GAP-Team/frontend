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
  const [showAllBundesland, setShowAllBundesland] = useState(false);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>(
    options.reduce((acc) => ({ ...acc, [title]: true }), {})
  );

  const toggleSection = (title: string): void => {
    setOpenSections((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  return (
    <>
      <Box key={title} sx={{ mt: 2 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="subtitle1" fontWeight="bold">
            {title}
          </Typography>
          <IconButton size="small" onClick={() => toggleSection(title)}>
            {openSections[title] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        </Box>
        <Collapse in={openSections[title]}>
          {options
            .slice(0, showAllBundesland ? options.length : 4)
            .map((option, index) => (
              <FormControlLabel
                key={index}
                control={<Checkbox />}
                label={option}
                sx={{ display: "block", ml: 1 }}
              />
            ))}
          <Button
            size="small"
            onClick={() => setShowAllBundesland(!showAllBundesland)}
          >
            <Typography
              sx={{
                ml: 1,
                mt: 1,
                cursor: "pointer",
                fontSize: "0.875rem",
                color: "primary.main",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              {showAllBundesland ? "Show Less" : "Show All"}
            </Typography>
          </Button>
        </Collapse>
      </Box>
      <Divider sx={{ mt: 2 }} />
    </>
  );
};

export default SideFilterPanelOptions;
