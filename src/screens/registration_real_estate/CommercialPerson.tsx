import React from "react";
import { Grid, Typography } from "@mui/material";
import UploadButton from "@/components/button/UploadButton";
import GTextInput from "@/components/input/GTextInput";

const ComercialPerson = (): JSX.Element => {
  return (
    <Grid
      container
      spacing={2}
      sx={{ p: 1, width: "auto", marginLeft: "1.5rem" }}
    >
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
        <GTextInput
          placeholder="HANDELREGISTERNUMMER"
          id="registernumber"
          name="registernumber"
        />
      </Grid>
    </Grid>
  );
};

export default ComercialPerson;
