import React from "react";
import { Grid, Typography } from "@mui/material";
import UploadButton from "@/components/button/UploadButton";

const PrivatePerson = (): JSX.Element => {
  return (
    <Grid container spacing={2} sx={{ p: 1, width: 'auto', marginLeft: '1.5rem' }}>
      <Grid item xs={12} sm={12}>
        <Typography variant="gsub" color="gray.500">
          GRUNDBUCHEINTRAG
        </Typography>
        <UploadButton />
      </Grid>
      <Grid item xs={12} sm={12}>
        <Typography variant="gsub" color="gray.500">
          OR
        </Typography>
      </Grid>
      <Grid item xs={12} sm={12}>
        <Typography variant="gsub" color="gray.500">
          GENEHMIGUNGSUNTERLAGEN
        </Typography>
        <UploadButton />
      </Grid>
    </Grid>
  );
};

export default PrivatePerson;
