import React, { useState } from "react";
import { Facility } from "./types";
import FacilityCard from "./FacilityCard";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import { Typography } from "@mui/material";

interface facilityListProps {
  facilities: Facility[];
  itemsPerPage?: number;
}

const FacilityItems: React.FC<facilityListProps> = ({
  facilities,
  itemsPerPage,
}) => {
  return (
    <Grid container spacing={"1.25rem"} sx={{ overflow: "auto", flexGrow: 1 }}>
      {facilities.map((facility, index) => (
        <Grid item key={index}>
          <FacilityCard
            key={facility._id}
            facility={facility}
            status="ausgeschrieben"
          />
        </Grid>
      ))}
      <Divider variant="middle" orientation="horizontal" flexItem />
    </Grid>
  );
};

export default FacilityItems;
