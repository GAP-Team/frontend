import { Box, Divider } from "@mui/material";
import React from "react";
import FacilityHeader from "./FacilityHeader";
import FacilityItems from "./FacilityItems";
import { BuildingFacilities } from "./types";

interface FacilityListProps {
  facilities: BuildingFacilities[];
}

const FacilityList: React.FC<FacilityListProps> = ({ facilities }) => {
  return (
    <Box sx={styles.listContainer}>
      <FacilityHeader code="F004" address="Mittelstraße 401, 37292 Essen" />
      <FacilityItems facilities={facilities} />
      <Divider variant="middle" orientation="horizontal" flexItem />

      <FacilityHeader
        code="F003"
        address="Mittelstraße 401, 66125 Saarbrucken"
      />
      <FacilityItems facilities={facilities} />
      <Divider variant="middle" orientation="horizontal" flexItem />
    </Box>
  );
};

export default FacilityList;

// Styles
const styles = {
  listContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "1.25rem",
    paddingBottom: "0.65rem",
    px: "1.5rem",
    pt: "1.5rem",
    overflowX: "auto",
  },
};
