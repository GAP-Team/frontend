"use client";
import React from "react";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import InputAdornment from "@mui/material/InputAdornment";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import SearchIcon from "@mui/icons-material/Search";
import {
  ALL_FACILITY_TYPES,
  DeadlineTab,
  FacilityFilters,
} from "./facilityFilters";

interface FacilityListToolbarProps {
  filters: FacilityFilters;
  facilityTypes: string[];
  onChange: (filters: FacilityFilters) => void;
}

const DEADLINE_TABS: { value: DeadlineTab; label: string }[] = [
  { value: "all", label: "Alle" },
  { value: "overdue", label: "Überfällig" },
  { value: "soon", label: "Bald fällig" },
  { value: "ok", label: "In Ordnung" },
];

const FacilityListToolbar: React.FC<FacilityListToolbarProps> = ({
  filters,
  facilityTypes,
  onChange,
}) => (
  <Box sx={styles.container}>
    <TextField
      size="small"
      placeholder="Name oder Art der Anlage suchen"
      value={filters.search}
      onChange={(event) => onChange({ ...filters, search: event.target.value })}
      sx={styles.search}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon fontSize="small" />
          </InputAdornment>
        ),
      }}
    />
    <ToggleButtonGroup
      exclusive
      size="small"
      value={filters.tab}
      // Clicking the active button would deselect it; keep one tab selected.
      onChange={(_event, tab: DeadlineTab | null) =>
        tab && onChange({ ...filters, tab })
      }
    >
      {DEADLINE_TABS.map(({ value, label }) => (
        <ToggleButton key={value} value={value} sx={styles.toggle}>
          {label}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
    <Select
      size="small"
      displayEmpty
      value={filters.facilityType}
      onChange={(event) =>
        onChange({ ...filters, facilityType: event.target.value })
      }
      sx={styles.select}
    >
      <MenuItem value={ALL_FACILITY_TYPES}>Alle Anlagenarten</MenuItem>
      {facilityTypes.map((type) => (
        <MenuItem key={type} value={type}>
          {type}
        </MenuItem>
      ))}
    </Select>
    <Chip
      label="Nur mit aktiver Ausschreibung"
      color={filters.onlyActiveTender ? "gprimary" : "default"}
      onClick={() =>
        onChange({ ...filters, onlyActiveTender: !filters.onlyActiveTender })
      }
    />
  </Box>
);

export default FacilityListToolbar;

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "0.75rem",
    backgroundColor: "white",
    borderRadius: "0.5rem",
    px: "1rem",
    py: "0.75rem",
    mb: "1rem",
  },
  search: {
    flex: "1 1 15rem",
    minWidth: "12rem",
  },
  select: {
    minWidth: "12rem",
  },
  toggle: {
    textTransform: "none",
    px: "1rem",
  },
};
