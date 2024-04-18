import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

export default function CustomizedSearchBar() {
  const [category, setCategory] = React.useState("");

  const handleChange = (event: any) => {
    setCategory(event.target.value);
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        borderRadius: "20rem",
        width: "25rem",
        backgroundColor: "white",
        outline: "none",
      }}
    >
      <OutlinedInput
        id="outlined-adornment-search"
        type="text"
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="search button"
              edge="end"
              sx={{ backgroundColor: "blue" }}
            >
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        }
        placeholder="Suche nach einer Ausschreibung"
        fullWidth
      />
    </div>
  );
}
