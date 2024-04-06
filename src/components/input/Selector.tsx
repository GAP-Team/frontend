// Selector.tsx
import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

interface Item {
  label: string; // Generic label, was 'name' for Country
  value: string; // Generic value, was 'iso2' for Country
}

interface SelectorProps<T extends Item> {
  options: T[];
  onSelect: (selectedItem: T | null) => void;
  placeholder?: string;
}

export const Selector = <T extends Item>({ options, onSelect, placeholder = 'Select item' }: SelectorProps<T>) => {
  return (
    <Autocomplete
      options={options}
      getOptionLabel={(option) => option.label}
      renderInput={(params) => <TextField {...params} placeholder={placeholder} />}
      onChange={(_, value) => onSelect(value)}
    />
  );
};
