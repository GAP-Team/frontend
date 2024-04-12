"use client";
import React from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import UploadButtons from "@/components/button/UploadButton";

interface BusinessRegistrationProps {
  value?: number;
  type?: string;
}

const BusinessRegistration = ({
  value,
  type,
}: BusinessRegistrationProps): JSX.Element => {
  return (
    <Box
      component="form"
      noValidate
      sx={{ p: 1, width: "auto", marginLeft: "1.5rem" }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12}>
          <Typography variant="gsub" color="gray.500">
            GEWERBEANMELDUNG
          </Typography>
          <UploadButtons />
        </Grid>
        <Grid item xs={12} sm={12}>
          <Typography variant="gsub" color="gray.500">
            OR
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12}>
          <Typography variant="gsub" color="gray.500">
            HANDELREGISTERNUMMER
          </Typography>
          <TextField
            InputProps={{ sx: { borderRadius: "0.5rem" } }}
            required
            id="registernumber"
            name="registernumber"
            placeholder="HANDELREGISTERNUMMER"
            fullWidth
            autoComplete="given-name"
            variant="outlined"
          />
        </Grid>

        <Grid item xs={12} sm={12}>
          <Typography variant="gsub" color="gray.500">
            GRUNDBUCHEINTRAG
          </Typography>
          <UploadButtons />
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
          <UploadButtons />
        </Grid>
      </Grid>
    </Box>
  );
};

export default BusinessRegistration;
