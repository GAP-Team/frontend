"use client";
import React, 
  {
    useState,
    useEffect
  }
from "react";
import {
  Box,
  Select,
  MenuItem,
  Container,
  InputLabel,
  Typography,
  FormControl,
} from "@mui/material";
import { useSelector } from 'react-redux';

import buildingAPIs from "@/api/building";
import { currentUser } from "@/lib/features/userSlice";
import { PropertyFilterProps } from "@/screens/dashboard/buildings/building_card/types";
import GButton from "../button/GButton";

const PropertyFilterPanel = ({ 
  handleOnChange 
}: PropertyFilterProps): JSX.Element => {

  const user = useSelector(currentUser);

  const [city, setCity] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [federalState, setFederalState] = useState("");
  const [userCities, setUserCities] = useState([]);
  const [userStates, setUserStates] = useState([]);

  useEffect(() => {
    getUserStatesCities();
  }, []);

  const getUserStatesCities = async () => {
    
    let cs = await buildingAPIs.getUserStatesCities(user?._id);

    if (cs?.data?.cities?.length > 0) {
      setUserCities(cs?.data?.cities);
    }
    if (cs?.data?.states?.length > 0) {
      setUserStates(cs?.data?.states);
    }
  };

  const handleReset = () => {
    setCity("");
    setPropertyType("");
    setFederalState("");
    handleOnChange("", "");
  };

  return (
    <Container maxWidth={false} sx={styles.container}>
      <Typography variant="h6" sx={styles.typography}>
        Alle Objekte
      </Typography>

      <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
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
            {userStates?.length > 0 ? (
              userStates?.map((state) => (
                <MenuItem key={state} value={state}>
                  {state}
                </MenuItem>
              ))
            ) : (
              <MenuItem value="">Keine Staaten</MenuItem>
            )}
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
            {userCities?.length > 0 ? (
              userCities?.map((city) => (
                <MenuItem key={city} value={city}>
                  {city}
                </MenuItem>
              ))
            ) : (
              <MenuItem value="">Keine Städte</MenuItem>
            )}
          </Select>
        </FormControl>
        <Box sx={{ ml: 1, display: 'flex'}}>
          <GButton onClick={()=>handleOnChange(city,federalState)}>Filter</GButton>

          <GButton onClick={handleReset}>Reset</GButton>
        </Box>
      </Box>
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
    borderRadius: "0.5rem",
    mx: 2, 
    py: "0.5rem",
    width: "auto", 
  },
  typography: {
    flexGrow: 1,
  },
  formControl: {
    m: 1,
    minWidth: 140,
  },
};
