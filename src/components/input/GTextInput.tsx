import React from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import LabelWithAsterisk from "@/components/label/LabelWithAsterisk";

interface TextInputProps {
  label: string;
  placeholder?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  id?: string;
  name?: string;
}

const GTextInput: React.FC<TextInputProps> = ({label, placeholder, value, onChange, error, id, name}) => {
    return (
        <Grid item xs={12}>
        <LabelWithAsterisk>{label}</LabelWithAsterisk>
        <TextField
          InputProps={{ sx: { borderRadius: '0.5rem' } }}
          id={id}
          name={name}
          fullWidth
          variant="outlined"
          value={value}
        />
      </Grid>
    );

}

export default GTextInput;