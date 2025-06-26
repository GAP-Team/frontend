// Selector.tsx
import React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export interface Item {
  label: string;
  value: string;
}

interface SelectorProps<> {
  options: Item[];
  selectedState: Item | null;
  placeholder?: string;
  name: string;
  onSelect: (selectedItem: Item) => void;
  error?: boolean;
  helperText?: string;
}

const Selector = ({
  name,
  options,
  placeholder = "Wählen Sie aus",
  onSelect,
  selectedState,
  error,
  helperText,
}: SelectorProps): JSX.Element => {
  return (
    <Autocomplete
      value={selectedState}
      options={options}
      getOptionLabel={(option) => option.value}
      isOptionEqualToValue={(options, value) =>
        options.valueOf === value.valueOf
      }
      onChange={(e, value: Item | null) => {
        onSelect(value as Item);
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

export default Selector;
