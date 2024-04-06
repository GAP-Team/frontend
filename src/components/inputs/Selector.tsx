'use client';
import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';

interface Country {
  name: string;
  iso2: string;
}

interface SelectorProps {
  onSelect: (countryCode: string) => void;
}

export const CountrySelector: React.FC<SelectorProps> = ({ onSelect }) => {
  const [options, setOptions] = useState<Country[]>([]);


  return (
    <Autocomplete
      options={options}
      getOptionLabel={(option) => option.name}
      renderInput={(params) => <TextField {...params} placeholder="Land auswählen" />}
      onChange={(_, value) => onSelect(value?.iso2 || '')}
    />
  );
};
