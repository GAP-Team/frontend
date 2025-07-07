import React from "react";
import TextField, { TextFieldProps } from "@mui/material/TextField";

const GTextInput: React.FC<TextFieldProps> = ({
  variant = "outlined",
  ...otherProps
}) => {
  return (
    <TextField
      InputProps={{ sx: { borderRadius: "0.5rem" } }}
      fullWidth
      variant={variant}
      {...otherProps}
    />
  );
};

export default GTextInput;
