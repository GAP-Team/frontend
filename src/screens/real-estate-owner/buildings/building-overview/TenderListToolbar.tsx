"use client";
import React from "react";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import { ApplicationFilter, TenderSort } from "./tenderFilters";

interface TenderListToolbarProps {
  counts: Record<ApplicationFilter, number>;
  filter: ApplicationFilter;
  sort: TenderSort;
  onFilterChange: (filter: ApplicationFilter) => void;
  onSortChange: (sort: TenderSort) => void;
}

const FILTERS: { value: ApplicationFilter; label: string }[] = [
  { value: "all", label: "Alle" },
  { value: "with", label: "Mit Bewerbungen" },
  { value: "without", label: "Ohne Bewerbungen" },
];

const TenderListToolbar: React.FC<TenderListToolbarProps> = ({
  counts,
  filter,
  sort,
  onFilterChange,
  onSortChange,
}) => (
  <Box sx={styles.container}>
    {counts.with > 0 && (
      <Box sx={styles.banner}>
        <Typography variant="bodylsb">
          {counts.with === 1
            ? "1 Ausschreibung hat Bewerbungen – jetzt prüfen"
            : `${counts.with} Ausschreibungen haben Bewerbungen – jetzt prüfen`}
        </Typography>
      </Box>
    )}
    <Box sx={styles.filterRow}>
      {FILTERS.map(({ value, label }) => (
        <Chip
          key={value}
          label={`${label} (${counts[value]})`}
          color={filter === value ? "gprimary" : "default"}
          onClick={() => onFilterChange(value)}
        />
      ))}
      <Box sx={{ flexGrow: 1 }} />
      <Select
        size="small"
        value={sort}
        onChange={(event) => onSortChange(event.target.value as TenderSort)}
      >
        <MenuItem value="default">Sortieren: Standard</MenuItem>
        <MenuItem value="mostApplications">
          Sortieren: Meiste Bewerbungen
        </MenuItem>
      </Select>
    </Box>
  </Box>
);

export default TenderListToolbar;

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
    mb: "1rem",
  },
  banner: {
    backgroundColor: "#FFF1DC",
    color: "#7A4A08",
    borderRadius: "0.625rem",
    px: "1rem",
    py: "0.75rem",
  },
  filterRow: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "0.625rem",
  },
};
