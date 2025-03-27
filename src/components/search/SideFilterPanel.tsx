"use client";
import { Box, Typography } from "@mui/material";
import GButton from "@/components/button/GButton";
import { contactFiltersOption } from "@/utils/Constants";
import SideFilterPanelOptions from "./SideFilterPanelOptions";

const SideFilterPanel = (): JSX.Element => {
  return (
    <Box sx={styles.mainContainer}>
      <div className="flex flex-row justify-between">
        <Typography variant="h6" fontWeight="bold">
          Filters
        </Typography>
        <GButton href="#">Filter</GButton>
      </div>
      <SideFilterPanelOptions
        title={contactFiltersOption.state.title}
        options={contactFiltersOption.state.options}
      />
      <SideFilterPanelOptions
        title={contactFiltersOption.facilityType.title}
        options={contactFiltersOption.facilityType.options}
      />
      <SideFilterPanelOptions
        title={contactFiltersOption.tenderType.title}
        options={contactFiltersOption.tenderType.options}
      />
      <GButton href="#">Filter löschen</GButton>
    </Box>
  );
};

export default SideFilterPanel;

const styles = {
  mainContainer: {
    p: 2,
    boxShadow: 1,
    width: "100%",
    borderRadius: 2,
    bgcolor: "background.paper",
  },
};
