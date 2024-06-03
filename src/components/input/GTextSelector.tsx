// GTextSelector.tsx
import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export interface Item {
  label: string;
  value: string;
}

interface GTextSelectorProps<T extends Item> {
  options: Item[];
  selectedState: Item | null;
  placeholder?: string;
  name: string;
  onSelect: (selectedItem: Item) => void;
  error?: boolean;
  helperText?: string;
}

const GTextSelector = <T extends Item>({ name, options, placeholder = 'Wählen Sie aus',onSelect,selectedState,error, helperText }: GTextSelectorProps<T>) => {
 
  return (
    <Autocomplete
      freeSolo
      value={selectedState}
      options={options}
      openOnFocus={false}
      getOptionLabel={(option: any) => option?.label}
      onInputChange={(e, value: string) => {
        const newValue = { label: value, value: value };
        onSelect(newValue);
      }}
      onChange={(e, value: any) => {
        if (typeof value === 'string') {
          const newValue = { label: value, value: value };
          onSelect(newValue);
        } else if (value) {
          onSelect(value);
        }
      }}
      renderInput={(params) => (
      <TextField
        {...params}
        name={name}
        placeholder={placeholder}
        error={error}
        helperText={helperText}
      />
    )}
  />
  );
};

export default GTextSelector;
