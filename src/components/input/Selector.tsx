// Selector.tsx
import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

interface Item {
  label: string; 
  value: string; 
}

interface SelectorProps<T extends Item> {
  options: T[];
  onSelect: (selectedItem: Item) => void;
  placeholder?: string;
}

const Selector = <T extends Item>({ options, onSelect, placeholder = 'Select item' }: SelectorProps<T>) => {
  return (
    <Autocomplete
      options={options}
      getOptionLabel={(option) => option.label}
      renderInput={(params) => <TextField {...params} placeholder={placeholder} />}
      onChange={(_, value) => onSelect(value!)}
    />
  );
};

export default Selector;
