import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { IoSearch } from "react-icons/io5";

export default function CustomizedSearchBar() {
  const [category, setCategory] = React.useState("");

  const handleChange = (event: any) => {
    setCategory(event.target.value);
  };

  return (
    <div
      style={searchBarStyle}
    >
      <TextField
         sx={{
          "& fieldset": { border: 'transparent' },
          '.MuiInputBase-root': {
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              border: 'none', // Removes the border on focus
            },
          },
          '& .MuiOutlinedInput-notchedOutline': {
            border: 'none', 
          }
        }}
        id="outlined-adornment-search"
        variant="outlined"
        placeholder="Suche nach einer Ausschreibung"
        fullWidth
        InputProps={{
        endAdornment: (
          <InputAdornment position="end" sx={{paddingRight:'0.3rem'}}> 
            <IconButton
              aria-label="search button"
              edge="end"
              sx={{ backgroundColor: "#22A7F1" }}
            >
              <IoSearch size="1.5rem" color="white" />
            </IconButton>
          </InputAdornment>
        ),
        }}
      />
   </div>
  );
}

//Styles
const searchBarStyle = {
  display: "flex",
  alignItems: "center",
  borderRadius: "6.18rem",
  width: "25rem",
  height:'3.2rem',
  backgroundColor: "white",
  outline: "none",
}