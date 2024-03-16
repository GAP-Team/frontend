import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';

interface State {
  name: string;
  iso2: string;
}

interface StateSelectorProps {
  countryCode: string;
  onStateSelect: (state: State) => void;
}

export const StateSelector: React.FC<StateSelectorProps> = ({ countryCode, onStateSelect }) => {
  const [states, setStates] = useState<State[]>([]);

  useEffect(() => {
    if (countryCode) {
      const fetchStates = async () => {
        try {
          const response = await axios.get(`https://api.countrystatecity.in/v1/countries/${countryCode}/states`, {
            headers: {
              'X-CSCAPI-KEY': process.env.NEXT_PUBLIC_COUNTRY_STATE_API_KEY // Replace 'YOUR_API_KEY_HERE' with your actual API key
            }
          });
          setStates(response.data);
        } catch (error) {
          console.error(`Failed to fetch states for country ${countryCode}:`, error);
        }
      };
      fetchStates();
    }
  }, [countryCode]);

  return (
    <Autocomplete
      options={states}
      getOptionLabel={(option) => option.name}
      renderInput={(params) => <TextField {...params} placeholder="Select State" />}
      onChange={(_, value) => onStateSelect(value || { name: '', iso2: '' })}
      disabled={!countryCode}
    />
  );
};
