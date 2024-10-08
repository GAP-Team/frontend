import { Box, Grid } from "@mui/material";
import GTab from "@/components/filter/GTab";
import React from "react";

const maintenanceProcessTab = [
  { label: "Prüfung", content: undefined },
  { label: "Wartung", content: undefined },
];

const ExtraInformation = () => {
  const [maintenanceProcess, setMaintenanceProcess] = React.useState(0);

  const handleMaintenanceProcessTabChange = (
    event: React.SyntheticEvent,
    newValue: number
  ) => {
    setMaintenanceProcess(newValue);
  };
  return (
    <Box
      component="form"
      noValidate
      sx={{ p: 1, width: "auto", marginLeft: "1.5rem" }}
    >
      <Grid container spacing={2}>
        <GTab
          tabs={maintenanceProcessTab}
          tabvalue={maintenanceProcess}
          handleChange={handleMaintenanceProcessTabChange}
        />
      </Grid>
    </Box>
  );
};

export default ExtraInformation;
