"use client";
import { MenuItem, Select } from "@mui/material";

export interface Item {
    label: string;
    value: string;
}

interface DropDownProps {
    name: string;
    value: string;
    options: Item[];
    onChange: (selectedItem: any) => void;
}

const DropDown = ({
    name,
    value,
    options,
    onChange,
}: DropDownProps): JSX.Element=> {
        
    return(
        <Select
            name={name}
            value={value}
            onChange={onChange}
        >
            {options?.length > 0 &&
            options?.map(
                (option: Item, index: number) => {
                    return (
                        <MenuItem key={index} value={option?.value}>
                            {option?.label}
                        </MenuItem>
                    );
                }
            )}
        </Select>
    );
}

export default DropDown;

const styles = {
    errorTexts: {
        color: "#d32f2f",
        fontWeight: 400,
        fontSize: "0.75rem",
    },
};