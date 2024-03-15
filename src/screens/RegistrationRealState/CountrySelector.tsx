'use client';
import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';

interface Country {
  name: string;
  iso2: string;
}

interface CountrySelectorProps {
  onCountrySelect: (countryCode: string) => void;
}

export const CountrySelector: React.FC<CountrySelectorProps> = ({ onCountrySelect }) => {
  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get('https://api.countrystatecity.in/v1/countries', {
          headers: {
            'X-CSCAPI-KEY': process.env.NEXT_PUBLIC_COUNTRY_STATE_API_KEY // Replace 'YOUR_API_KEY_HERE' with your actual API key
          }
        });
        setCountries(response.data);
      } catch (error) {
        console.error('Failed to fetch countries:', error);
      }
    };
    fetchCountries();
  }, []);

  return (
    <Autocomplete
      options={countries}
      getOptionLabel={(option) => option.name}
      renderInput={(params) => <TextField {...params} placeholder="Select Country" />}
      onChange={(_, value) => onCountrySelect(value?.iso2 || '')}
    />
  );
};
