import React from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { Typography, CircularProgress } from "@mui/material";
import PlacesAutocomplete from 'react-places-autocomplete';

interface GoogleAutocompleteProps {
  name: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<any>) => void;
  onSelect: (value: string) => void;
  onBlur: (e: React.FocusEvent<any>) => void;
  placeholder?: string;
  error?: boolean;
  helperText?: string;
}

const GoogleAutocomplete: React.FC<GoogleAutocompleteProps> = ({
  name,
  id,
  value,
  onChange,
  onSelect,
  onBlur,
  placeholder = "Straße",
  error,
  helperText
}) => {
  return (
    <PlacesAutocomplete
      value={value}
      onChange={(address) => onChange({ target: { name, value: address } } as React.ChangeEvent<any>)}
      onSelect={onSelect}
      searchOptions={{ componentRestrictions: { country: "de" } }}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <Box sx={{ position: "relative" }}>
          <TextField
            {...getInputProps({
              placeholder,
              fullWidth: true,
              onBlur,
              name,
              id
            })}
            error={error}
            helperText={helperText}
          />
          {loading && <CircularProgress size={24} sx={{ position: 'absolute', top: '50%', right: '10px', marginTop: '-12px' }} />}
          {suggestions?.length > 0 && (
            <Box sx={{ position: "absolute", zIndex: 1000, width: "100%", mt: 1 }}>
              <Paper elevation={3}>
                {suggestions.map((suggestion, index) => {
                  const style = {
                    backgroundColor: suggestion.active ? "#f0f0f0" : "#fff",
                    cursor: 'pointer',
                    padding: '10px'
                  };
                  return (
                    <Typography
                      {...getSuggestionItemProps(suggestion, { style })}
                      key={index}
                    >
                      {suggestion.description}
                    </Typography>
                  );
                })}
              </Paper>
            </Box>
          )}
        </Box>
      )}
    </PlacesAutocomplete>
  );
};

export default GoogleAutocomplete;
