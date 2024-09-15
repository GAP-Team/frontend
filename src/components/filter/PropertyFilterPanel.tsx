"use client";
import React, { useState, useEffect } from "react";
import {
  Box,
  Select,
  MenuItem,
  Container,
  InputLabel,
  Typography,
  FormControl,
  SelectChangeEvent,
} from "@mui/material";
import { useSelector } from "react-redux";

import buildingAPIs from "@/api/building";
import { currentUser } from "@/lib/features/userSlice";
import { PropertyFilterProps } from "@/screens/dashboard/buildings/building_card/types";
import GButton from "../button/GButton";

const PropertyFilterPanel = ({
  handleOnChange,
  title,
}: PropertyFilterProps): JSX.Element => {
  const user = useSelector(currentUser);

  const [filters, setFilters] = useState({
    city: "",
    facilityType: "",
    federalState: "",
  });

  const [userCities, setUserCities] = useState<
    { value: string; label?: string }[]
  >([]);
  const [userStates, setUserStates] = useState<
    { value: string; label?: string }[]
  >([]);
  const [userFacilityType, setFacilityType] = useState<
    { value: string; label?: string }[]
  >([]);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const cs = await buildingAPIs?.getUserStatesCitiesFacilityTypes(
        user?._id
      );
      if (cs?.data?.cities)
        setUserCities(
          cs.data.cities.map((city: any) => ({ value: city, label: city }))
        );
      if (cs?.data?.states)
        setUserStates(
          cs.data.states.map((state: any) => ({ value: state, label: state }))
        );
      if (cs?.data?.facilityTypes)
        setFacilityType(
          cs.data.facilityTypes.map((facilityType: any) => ({
            value: facilityType,
            label: facilityType,
          }))
        );
    };

    fetchData();
  }, [user]);

  const handleChange =
    (field: string) => (event: SelectChangeEvent<string>) : void => {
      setFilters({ ...filters, [field]: event.target.value as string });
    };

  const handleReset = () : void=> {
    setFilters({ city: "", facilityType: "", federalState: "" });
    handleOnChange("", "", "");
  };

  const handleFilter = () : void=> {
    handleOnChange(filters.city, filters.federalState, filters.facilityType);
  };

  return (
    <Container maxWidth={false} sx={styles.container}>
      <Typography variant="h6" sx={styles.typography}>
        {title}
      </Typography>

      <Box sx={styles.box}>
        <FilterSelect
          id="facilityType"
          label="Anlagentyp"
          value={filters.facilityType}
          onChange={handleChange("facilityType")}
          options={userFacilityType}
        />
        <FilterSelect
          id="federalState"
          label="Bundesland"
          value={filters.federalState}
          onChange={handleChange("federalState")}
          options={userStates}
        />
        <FilterSelect
          id="city"
          label="Stadt"
          value={filters.city}
          onChange={handleChange("city")}
          options={userCities}
        />
        <Box sx={{ ml: 1, display: "flex" }}>
          <GButton onClick={handleFilter}>Filter</GButton>
          <GButton onClick={handleReset}>Reset</GButton>
        </Box>
      </Box>
    </Container>
  );
};

const FilterSelect = ({
  id,
  label,
  value,
  onChange,
  options,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (event: SelectChangeEvent<string>) => void;
  options: Array<{ value: string; label?: string }>;
}) : JSX.Element=> (
  <FormControl size="small" sx={styles.formControl}>
    <InputLabel id={`${id}-label`}>{label}</InputLabel>
    <Select
      labelId={`${id}-label`}
      id={`${id}-select`}
      value={value}
      label={label}
      onChange={onChange}
    >
      {options.length > 0 ? (
        options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label || option.value}
          </MenuItem>
        ))
      ) : (
        <MenuItem value="">Keine {label}</MenuItem>
      )}
    </Select>
  </FormControl>
);

export default PropertyFilterPanel;

const styles = {
  container: {
    backgroundColor: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: "0.5rem",
    mx: 2,
    py: "0.5rem",
    width: "auto",
  },
  typography: {
    flexGrow: 1,
  },
  box: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  formControl: {
    m: 1,
    minWidth: 140,
  },
};
