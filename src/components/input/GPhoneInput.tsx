import React, { FocusEventHandler } from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

interface PhoneInputProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  id?: string;
  name?: string;
  prefix?: string; // Add prefix prop
  onBlur?:
    | FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined;
  helperText?: string;
}

const PhoneInput: React.FC<PhoneInputProps> = ({
  label = "Telefonnummer",
  placeholder = "Geben Sie Ihre Telefonnummer ein",
  value,
  onChange,
  error = false,
  id = "phone",
  name = "phone",
  prefix = "+49",
  onBlur,
  helperText,
}) => {
  return (
    <TextField
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">{prefix}</InputAdornment>
        ),
        sx: { borderRadius: "0.5rem" },
      }}
      id={id}
      name={name}
      placeholder={placeholder}
      fullWidth
      variant="outlined"
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      helperText={helperText}
      error={error}
    />
  );
};

export default PhoneInput;
