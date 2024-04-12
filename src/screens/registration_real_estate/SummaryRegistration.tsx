import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import SummarySection from "@/components/summary/SummarySection";
import {grundinformation, adresse, gewerbeanmeldung} from '../../utils/Constants';


const SummaryRegistration = () => {
  return (
    <Box
      sx={{ flexGrow: 1, width: "auto", marginLeft: "1.5rem", mt: "0.5rem" }}
    >
      <Grid container spacing={2}>
      <Grid item xs={6}>
          <SummarySection title="GRUNDINFORMATION" details={grundinformation} />
        </Grid>
        <Grid item xs={12}>
          <SummarySection title="ADRESSE DER FIRMA" details={adresse} />
        </Grid>
        <Grid item xs={12}>
          <SummarySection title="GEWERBEANMELDUNG" details={gewerbeanmeldung} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default SummaryRegistration;
