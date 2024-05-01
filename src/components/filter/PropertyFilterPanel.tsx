"use client";
import React from "react";
import {
  Container,
  Box,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Typography,
} from "@mui/material";
import GTab from "@/components/filter/GTab";

const filterTab = [
  { label: "Filter", content: <></> },
  { label: "anstehende Prüfungen", content: <></> },
];

const PropertyFilterPanel = () => {
  const [value, setValue] = React.useState(0);
  const [propertyType, setPropertyType] = React.useState("");
  const [federalState, setFederalState] = React.useState("");
  const [city, setCity] = React.useState("");

  return (
    <Container maxWidth={false} sx={styles.container}>
      <Typography variant="h6" sx={styles.typography}>
        Alle Objekte
      </Typography>

      <Box sx={{ flexGrow: 1 }}>
        <GTab tabs={filterTab} />
      </Box>

      <FormControl size="small" sx={styles.formControl}>
        <InputLabel id="property-type-label">Anlagentyp</InputLabel>
        <Select
          labelId="property-type-label"
          id="property-type-select"
          value={propertyType}
          label="Anlagentyp"
          onChange={(e) => setPropertyType(e.target.value)}
        >
          <MenuItem value="type1">Type 1</MenuItem>
          <MenuItem value="type2">Type 2</MenuItem>
          {/* More types */}
        </Select>
      </FormControl>
      <FormControl size="small" sx={styles.formControl}>
        <InputLabel id="federal-state-label">Bundesland</InputLabel>
        <Select
          labelId="federal-state-label"
          id="federal-state-select"
          value={federalState}
          label="Bundesland"
          onChange={(e) => setFederalState(e.target.value)}
        >
          <MenuItem value="state1">State 1</MenuItem>
          <MenuItem value="state2">State 2</MenuItem>
          {/* More states */}
        </Select>
      </FormControl>
      <FormControl size="small" sx={styles.formControl}>
        <InputLabel id="city-label">Stadt</InputLabel>
        <Select
          labelId="city-label"
          id="city-select"
          value={city}
          label="Stadt"
          onChange={(e) => setCity(e.target.value)}
        >
          <MenuItem value="city1">City 1</MenuItem>
          <MenuItem value="city2">City 2</MenuItem>
          {/* More cities */}
        </Select>
      </FormControl>
    </Container>
  );
};

export default PropertyFilterPanel;

const styles = {
  container: {
    backgroundColor: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: '0.5rem',
    mx: 2, // Negative margin to counteract the container's padding
    py: '0.5rem',
    width: 'auto', // Ensure it adjusts to full width with negative margins
  },
  typography: {
    flexGrow: 1,
  },
  formControl: {
    m: 1,
    minWidth: 140,
  },
};
