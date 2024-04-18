// Selector.tsx
import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

interface Item {
  label: string;
  value: string;
}

interface SelectorProps<T extends Item> {
  options: Item[];
  selectedState: Item | null;
  placeholder?: string;
  name: string;
  onSelect: (selectedItem: Item) => void;
  error?: boolean;
  helperText?: string;
}

const Selector = <T extends Item>({ name, options, placeholder = 'Wählen Sie aus',onSelect,selectedState,error, helperText }: SelectorProps<T>) => {
 
  return (
    <Autocomplete
      value={selectedState}
      options={options}
      getOptionLabel={(option) => option.value}
      onChange={(e, value:any) => {
        onSelect(value);
        }}
      renderInput={(params) => (
      <TextField
        {...params}
        name={name}
        placeholder={placeholder}
        error={error}
        // value={selectedState?.value}
        helperText={helperText}
      />
    )}
  />
  );
};

export default Selector;
