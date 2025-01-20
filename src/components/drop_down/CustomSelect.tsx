"use client";
import { Item } from "@/utils/Constants";
import { MenuItem, Select } from "@mui/material";

interface CustomSelectProps {
  name: string;
  value?: string;
  options: Item[];
  onChange: (selectedItem: any) => void;
}

const CustomSelect = ({
  name,
  value,
  options,
  onChange,
}: CustomSelectProps): JSX.Element => {
  return (
    <Select name={name} value={value} onChange={onChange}>
      {options?.length > 0 &&
        options?.map((option: Item, index: number) => {
          return (
            <MenuItem key={index} value={option?.value}>
              {option?.label}
            </MenuItem>
          );
        })}
    </Select>
  );
};

export default CustomSelect;
