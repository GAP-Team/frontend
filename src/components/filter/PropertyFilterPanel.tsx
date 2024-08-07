"use client";
import React, 
  {
    useState,
    useEffect
  }
from "react";
import {
  Container,
  Box,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';

import buildingAPIs from "@/api/building";
import GTab from "@/components/filter/GTab";
import { currentUserId } from "@/lib/features/userSlice";
import { PropertyFilterProps } from "@/screens/dashboard/buildings/building_card/types";

const filterTab = [
  { label: "Filter", content: <></> },
  { label: "anstehende Prüfungen", content: <></> },
];



const PropertyFilterPanel = ({ 
  handleOnChange 
}: PropertyFilterProps): JSX.Element => {

  const userId = useSelector(currentUserId);

  const [city, setCity] = useState("");
  const [value, setValue] = useState(0);
  const [userCities, setUserCities] = useState([]);
  const [userStates, setUserStates] = useState([]);
  const [propertyType, setPropertyType] = useState("");
  const [federalState, setFederalState] = useState("");

  useEffect(() => {
    getUserStatesCities();
  }, []);

  useEffect(() => {
    handleOnChange(city, federalState);
  }, [city, federalState]);

  const getUserStatesCities = async () => {
    
    let cs = await buildingAPIs.getUserStatesCities(userId);

    if (cs?.data?.cities?.length > 0) {
      setUserCities(cs?.data?.cities);
    }
    if (cs?.data?.states?.length > 0) {
      setUserStates(cs?.data?.states);
    }
  }

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
          {userStates?.length > 0 ?
            userStates?.map((state) => {
              return <MenuItem value={state}>{state}</MenuItem>
            })
            :
            <MenuItem value="">Keine Staaten</MenuItem>
          }
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
          {userCities?.length > 0 ?
            userCities?.map((city) => {
              return <MenuItem value={city}>{city}</MenuItem>
            })
            :
            <MenuItem value="">Keine Städte</MenuItem>
          }
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
