"use client";
import { Item } from "@/utils/Constants";
import { MenuItem, InputLabel, Select, FormControl } from "@mui/material";

interface CustomSelectProps {
  name: string;
  value: string;
  label?: string;
  options: Item[];
  onChange: (selectedItem: any) => void;
}

const CustomSelect = ({
  name,
  value,
  label,
  options,
  onChange,
}: CustomSelectProps): JSX.Element => {
  return (
    <FormControl fullWidth>
      <InputLabel id="custom-select">{label}</InputLabel>
      <Select
        name={name}
        value={value}
        onChange={onChange}
        labelId="custom-select"
      >
        {options?.length > 0 &&
          options?.map((option: Item, index: number) => {
            return (
              <MenuItem key={index} value={option?.value}>
                {option?.label}
              </MenuItem>
            );
          })}
      </Select>
    </FormControl>
  );
};

export default CustomSelect;
