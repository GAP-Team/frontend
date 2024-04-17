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

const FilterBar = () => {
  const [value, setValue] = React.useState(0);
  const [propertyType, setPropertyType] = React.useState("");
  const [federalState, setFederalState] = React.useState("");

  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };

  const handlePropertyTypeChange = (event: any) => {
    setPropertyType(event.target.value);
  };

  const handleFederalStateChange = (event: any) => {
    setFederalState(event.target.value);
  };

  return (
    <Container
      color="default"
      maxWidth={false}
      sx={{
        backgroundColor: "white",
        borderRadius: "5px",
        display: "flex",
        alignContent: "space-between",
        justifyContent: "space-between",
      }}
    >
      <Typography
        variant="h6"
        component="div"
        sx={{ flexGrow: 1, alignContent: "center" }}
      >
        Alle Objekte
      </Typography>

      <Box sx={{ flexGrow: 2 }}>
        <GTab tabs={filterTab} />
      </Box>

      <Box sx={{ flexGrow: 1 }} />
      <FormControl size="small" sx={{ m: 1, minWidth: 140 }}>
        <InputLabel id="property-type-select-label">Anlagentyp</InputLabel>
        <Select
          labelId="property-type-select-label"
          id="property-type-select"
          value={propertyType}
          label="Anlagentyp"
          onChange={handlePropertyTypeChange}
        >
          <MenuItem value="type1">Type 1</MenuItem>
          <MenuItem value="type2">Type 2</MenuItem>
          {/* More types */}
        </Select>
      </FormControl>
      <FormControl size="small" sx={{ m: 1, minWidth: 140 }}>
        <InputLabel id="federal-state-select-label">Bundesland</InputLabel>
        <Select
          labelId="federal-state-select-label"
          id="federal-state-select"
          value={federalState}
          label="Bundesland"
          onChange={handleFederalStateChange}
        >
          <MenuItem value="state1">State 1</MenuItem>
          <MenuItem value="state2">State 2</MenuItem>
          {/* More states */}
        </Select>
      </FormControl>
      <FormControl size="small" sx={{ m: 1, minWidth: 140 }}>
        <InputLabel id="federal-state-select-label">Stadt</InputLabel>
        <Select
          labelId="federal-state-select-label"
          id="federal-state-select"
          value={federalState}
          label="Stadt"
          onChange={handleFederalStateChange}
        >
          <MenuItem value="state1">State 1</MenuItem>
          <MenuItem value="state2">State 2</MenuItem>
          {/* More states */}
        </Select>
      </FormControl>
    </Container>
  );
};

export default FilterBar;
