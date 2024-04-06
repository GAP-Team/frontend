'use client';
import React, {useState} from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from "@mui/material/Box";
import LabelWithAsterisk from '@/components/label/LabelWithAsterisk';
import { CountrySelector } from './CountrySelector';
import { StateSelector } from './StateSelector';

interface State {
  name: string;
  iso2: string;
}

const AddresseFirma = () => {
  const [selectedCountry, setSelectedCountry] = React.useState('');
  const [selectedState, setSelectedState] = React.useState<State | null>(null);

  const handleCountrySelect = (countryCode: string) => {
    setSelectedCountry(countryCode);
    // Reset selected state when country changes
    setSelectedState(null);
  };

  const handleStateSelect = (state: State) => {
    setSelectedState(state);
  };


  return (
    <Box
      component="form"
      noValidate
      sx={{ p: 1, width: "auto", marginLeft: "1.5rem" }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <LabelWithAsterisk>LAND</LabelWithAsterisk>
          <CountrySelector onCountrySelect={handleCountrySelect} />
     
        </Grid>
        <Grid item xs={12}>
          <LabelWithAsterisk>BUNDESLAND</LabelWithAsterisk>
          <StateSelector countryCode={selectedCountry} onStateSelect={handleStateSelect} />
        </Grid>
        <Grid item xs={12} sm={9}>
          <Typography  variant="gsub" color="gray.500" >STRAßE</Typography>
          <TextField
            InputProps={{ sx: { borderRadius: '0.5rem' } }}
            id="strasse"
            name="strasse"
            fullWidth
            autoComplete="given-name"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <Typography  variant="gsub" color="gray.500">HAUSNR</Typography>
          <TextField
            InputProps={{ sx: { borderRadius: '0.5rem' } }}
            id="hausnr"
            name="hausnr"
            fullWidth
            autoComplete="family-name"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <LabelWithAsterisk >PLZ</LabelWithAsterisk>
          <TextField
            InputProps={{ sx: { borderRadius: '0.5rem' } }}
            id="plz"
            name="plz"
            fullWidth
            autoComplete="given-name"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={9}>
          <LabelWithAsterisk >STADT/ORT</LabelWithAsterisk>
          <TextField
            InputProps={{ sx: { borderRadius: '0.5rem' } }}
            id="stadt"
            name="stadt"
            fullWidth
            autoComplete="given-name"
            variant="outlined"
          />
        </Grid>
      </Grid>
    </Box>
  )
}

export default AddresseFirma