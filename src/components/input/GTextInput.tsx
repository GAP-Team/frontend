import React from "react";
import TextField from "@mui/material/TextField";

interface TextInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  id?: string;
  name?: string;
}

const GTextInput: React.FC<TextInputProps> = ({
  placeholder,
  value,
  onChange,
  error,
  id,
  name,
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
      onChange={onChange}
    />
  );
};

export default GTextInput;
