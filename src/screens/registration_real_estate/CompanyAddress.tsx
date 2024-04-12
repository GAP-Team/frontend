"use client";
import React from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import LabelWithAsterisk from "@/components/label/LabelWithAsterisk";
import GTextInput from "@/components/input/GTextInput";
import GSelector from "@/components/input/GSelector";
import { germanStates } from "@/utils/Constants";

interface State {
  label: string;
  value: string;
}

const AddresseFirma = () => {
  const [selectedState, setSelectedState] = React.useState<State | null>(null);

  const handleStateSelect = (selectedState: State) => {
    setSelectedState(selectedState);
  };

  return (
    <Box
      component="form"
      noValidate
      sx={{ p: 1, width: "auto", marginLeft: "1.5rem" }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <LabelWithAsterisk>Land</LabelWithAsterisk>
          <GTextInput value="Deutschland" />
        </Grid>
        <Grid item xs={12}>
          <LabelWithAsterisk>BUNDESLAND</LabelWithAsterisk>
          <GSelector options={germanStates} onSelect={handleStateSelect} />
        </Grid>
        <Grid item xs={12} sm={9}>
          <LabelWithAsterisk>STRAßE</LabelWithAsterisk>

          <TextField
            InputProps={{ sx: { borderRadius: "0.5rem" } }}
            id="strasse"
            name="strasse"
            fullWidth
            autoComplete="given-name"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <LabelWithAsterisk>HAUSNR</LabelWithAsterisk>

          <TextField
            InputProps={{ sx: { borderRadius: "0.5rem" } }}
            id="hausnr"
            name="hausnr"
            fullWidth
            autoComplete="family-name"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <LabelWithAsterisk>PLZ</LabelWithAsterisk>
          <TextField
            InputProps={{ sx: { borderRadius: "0.5rem" } }}
            id="plz"
            name="plz"
            fullWidth
            autoComplete="given-name"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={9}>
          <LabelWithAsterisk>STADT/ORT</LabelWithAsterisk>
          <TextField
            InputProps={{ sx: { borderRadius: "0.5rem" } }}
            id="stadt"
            name="stadt"
            fullWidth
            autoComplete="given-name"
            variant="outlined"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default AddresseFirma;
