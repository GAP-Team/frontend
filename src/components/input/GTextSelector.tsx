import React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Item } from "@/utils/Constants";
interface GTextSelectorProps {
  options: Item[];
  value: Item | string | null;
  placeholder?: string;
  name: string;
  onChange: (selectedItem: any) => void;
  error?: boolean;
  helperText?: React.ReactNode;
  disabled?: boolean;
  required?: boolean;
  size?: "small" | "medium";
  label?: string;
  fullWidth?: boolean;
  freeSolo?: boolean;
}

const GTextSelector = ({
  name,
  options,
  value,
  placeholder = "Wählen Sie aus",
  onChange,
  error = false,
  helperText,
  disabled = false,
  required = false,
  size = "medium",
  label,
  fullWidth = true,
  freeSolo = true,
}: GTextSelectorProps): JSX.Element => {
  return (
    <Autocomplete
      freeSolo={freeSolo}
      value={value}
      options={options}
      getOptionLabel={(option) =>
        typeof option === "string" ? option : option.label
      }
      isOptionEqualToValue={(option, val) =>
        typeof val === "string"
          ? option.label === val
          : option.value === val?.value
      }
      disabled={disabled}
      onChange={(e, value: any) => {
        if (typeof value === "string") {
          const newValue = { label: value, value: value };
          onChange(newValue);
        } else if (value) {
          onChange(value);
        }
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          name={name}
          label={label}
          placeholder={placeholder}
          error={error}
          helperText={helperText}
          disabled={disabled}
          required={required}
          size={size}
          fullWidth={fullWidth}
        />
      )}
    />
  );
};

export default GTextSelector;
