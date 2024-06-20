import React, { FocusEventHandler } from "react";
import TextField from "@mui/material/TextField";

interface TextInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  id?: string;
  name?: string;
  label?: string;
  onBlur?: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  helperText?: React.ReactNode | undefined; 
}

const GTextInput: React.FC<TextInputProps> = ({
  placeholder,
  value,
  onChange,
  error,
  id,
  name,
  label,
  onBlur,
  helperText,
}) => {
  return (
    <TextField
      InputProps={{ sx: { borderRadius: "0.5rem" } }}
      id={id}
      name={name}
      fullWidth
      variant="outlined"
      value={value}
      placeholder={placeholder}
      error={error}
      label={label}
      onBlur={onBlur}
      helperText={helperText}
      onChange={onChange}
    />
  );
};

export default GTextInput;
