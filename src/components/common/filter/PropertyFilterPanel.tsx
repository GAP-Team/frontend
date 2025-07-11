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

import userApi from "@/api/user";
import { currentUser } from "@/lib/features/userSlice";
// FIXME: props should be in same component file
import { PropertyFilterProps } from "@/screens/real-estate-owner/buildings/building-card/types";
import GButton from "@/components/inputs/button/GButton";

const PropertyFilterPanel = ({
  handleOnChange = () => {},
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
      if (!user?.id) return;

      const cs = await userApi?.getFilterCreteria(user?.id);
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
    (field: string) =>
    (event: SelectChangeEvent<string>): void => {
      setFilters({ ...filters, [field]: event.target.value as string });
    };

  const handleReset = (): void => {
    setFilters({ city: "", facilityType: "", federalState: "" });
    handleOnChange("", "", "");
  };

  const handleFilter = (): void => {
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
}): JSX.Element => (
  <FormControl size="small" sx={styles.formControl}>
    <InputLabel id={`${id}-label`}>{label}</InputLabel>
    {options.length > 0 ? (
      <Select
        labelId={`${id}-label`}
        value={value}
        label={label}
        id={`${id}-select`}
        onChange={onChange}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label || option.value}
          </MenuItem>
        ))}
      </Select>
    ) : (
      <Select
        labelId={`${id}-label`}
        value={value}
        label={label}
        id={`${id}-select`}
        onChange={onChange}
      >
        <MenuItem disabled key={0} value={""}>
          Keine {label}
        </MenuItem>
      </Select>
    )}
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
