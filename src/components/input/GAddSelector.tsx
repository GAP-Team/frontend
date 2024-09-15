import React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import IconButton from "@mui/material/IconButton";
import { Item } from "./GSelector";
import { CgClose } from "react-icons/cg";

interface AddSelectorProps {
  options: Item[];
  selectedState: Item | null;
  placeholder?: string;
  name: string;
  onSelect: (selectedItem: Item) => void;
  onAdd: (newItem: Item) => void;
  onDelete: (item: Item) => void;
  error?: boolean;
  helperText?: string;
}

const AddSelector =({
  name,
  options,
  placeholder = "Wählen Sie aus",
  onSelect,
  onAdd,
  onDelete,
  selectedState,
  error,
  helperText,
}: AddSelectorProps) : JSX.Element => {
  const [, setInputValue] = React.useState("");
  const filter = createFilterOptions<Item>();

  return (
    <Autocomplete
      value={selectedState}
      options={options}
      getOptionLabel={(option) => option.value}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        if (params.inputValue !== "") {
          filtered.push({
            label: `Add "${params.inputValue}"`,
            value: params.inputValue,
          });
        }
        return filtered;
      }}
      onChange={(e, value: any) => {
        if (value && !options.some((option) => option.value === value.value)) {
          const newItem = { label: value.value, value: value.value };
          onAdd(newItem);
          onSelect(newItem);
        } else {
          onSelect(value);
        }
      }}
      renderOption={(props, option) => (
        <li
          {...props}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {option.label}
          {options.some((opt) => opt.value === option.value) && (
            <IconButton
              onClick={() => onDelete(option)}
              edge="end"
              size="small"
            >
              <CgClose />
            </IconButton>
          )}
        </li>
      )}
      onInputChange={(e, newInputValue) => setInputValue(newInputValue)}
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

export default AddSelector;
