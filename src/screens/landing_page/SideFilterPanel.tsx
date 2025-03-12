"use client";
import { useState } from "react";
import {
  Box,
  Divider,
  Checkbox,
  Collapse,
  IconButton,
  Typography,
  FormControlLabel,
} from "@mui/material";
import GButton from "@/components/button/GButton";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const filters = [
  {
    title: "Bundesland",
    options: [
      "Baden-Württemberg",
      "Nordrhein-Westfalen",
      "Schleswig-Holstein",
      "Mecklenburg-Vorpommern",
    ],
  },
  {
    title: "Anlagentyp",
    options: ["Anlagentyp 1", "Anlagentyp 2"],
  },
  {
    title: "Auftragstyp",
    options: ["Wartung", "Installation", "Reparatur", "Prüfung"],
  },
];

const SideFilterPanel = (): JSX.Element => {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>(
    filters.reduce((acc, filter) => ({ ...acc, [filter.title]: true }), {})
  );

  const toggleSection = (title: string): void => {
    setOpenSections((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  return (
    <Box
      sx={{
        p: 2,
        boxShadow: 1,
        width: "100%",
        borderRadius: 2,
        bgcolor: "background.paper",
      }}
    >
      <div className="flex flex-row justify-between">
        <Typography variant="h6" fontWeight="bold">
          Filters
        </Typography>
        <GButton href="#">Filter</GButton>
      </div>
      {filters.map((filter) => (
        <Box key={filter.title} sx={{ mt: 2 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="subtitle1" fontWeight="bold">
              {filter.title}
            </Typography>
            <IconButton
              size="small"
              onClick={() => toggleSection(filter.title)}
            >
              {openSections[filter.title] ? (
                <ExpandLessIcon />
              ) : (
                <ExpandMoreIcon />
              )}
            </IconButton>
          </Box>
          <Collapse in={openSections[filter.title]}>
            {filter.options.map((option) => (
              <FormControlLabel
                key={option}
                control={<Checkbox />}
                label={option}
                sx={{ display: "block", ml: 1 }}
              />
            ))}
            <Typography
              sx={{
                ml: 1,
                mt: 1,
                color: "primary.main",
                fontSize: "0.875rem",
                cursor: "pointer",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              Show all
            </Typography>
          </Collapse>
          <Divider sx={{ mt: 2 }} />
        </Box>
      ))}
      <GButton href="#" color="error">
        Filter löschen
      </GButton>
    </Box>
  );
};

export default SideFilterPanel;
