import React from "react";
import { Grid, TextField, Typography } from "@mui/material";
import UploadButton from "@/components/button/UploadButton";

const ComercialPerson = (): JSX.Element => {
  return (
    <Grid container spacing={2} sx={{ p: 1, width: 'auto', marginLeft: '1.5rem' }}>
      <Grid item xs={12} sm={12}>
        <Typography variant="gsub" color="gray.500">
          GEWERBEANMELDUNG
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
    </Grid>
  );
};

export default ComercialPerson;
