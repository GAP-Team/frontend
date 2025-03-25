"use client";
import { Box, Typography } from "@mui/material";
import GButton from "@/components/button/GButton";
import { contactFiltersOption } from "@/utils/Constants";
import SideFilterPanelOptions from "./SideFilterPanelOptions";

const SideFilterPanel = (): JSX.Element => {
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
      <SideFilterPanelOptions
        title={contactFiltersOption.bundesland.title}
        options={contactFiltersOption.bundesland.options}
      />
      <SideFilterPanelOptions
        title={contactFiltersOption.anlagentyp.title}
        options={contactFiltersOption.anlagentyp.options}
      />
      <SideFilterPanelOptions
        title={contactFiltersOption.auftragstyp.title}
        options={contactFiltersOption.auftragstyp.options}
      />
      <GButton href="#" color="error">
        Filter löschen
      </GButton>
    </Box>
  );
};

export default SideFilterPanel;
