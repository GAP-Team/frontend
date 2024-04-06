import React from 'react';
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
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
}) => {
  return (
    <Grid item xs={12}>
      <Typography variant="gsub" color="gray.500">
        {label}
      </Typography>
      <TextField
        InputProps={{
          startAdornment: <InputAdornment position="start">{prefix}</InputAdornment>,
          sx: { borderRadius: "0.5rem" },
        }}
        id={id}
        name={name}
        placeholder={placeholder}
        fullWidth
        variant="outlined"
        value={value}
        onChange={onChange}
        error={error}
      />
    </Grid>
  );
};

export default PhoneInput;
