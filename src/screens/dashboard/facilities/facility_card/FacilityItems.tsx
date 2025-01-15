import React, { useEffect, useState } from "react";
import FacilityCard from "./FacilityCard";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import { Facility } from "./types";
import buildingAPIs from "@/api/building";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  fetchFacilities,
  getFacilitiesByBuilding,
} from "@/lib/features/facilitySlice";

interface facilityListProps {
  buildingId: string;
  itemsPerPage?: number;
}

const FacilityItems: React.FC<facilityListProps> = ({ buildingId }) => {
  const dispatch = useAppDispatch();
  const facilities = useAppSelector(getFacilitiesByBuilding(buildingId));

  useEffect(() => {
    dispatch(fetchFacilities(buildingId));
  }, [dispatch, buildingId]);

  return (
    <Grid container spacing={"1.25rem"} sx={{ overflow: "auto", flexGrow: 1 }}>
      {facilities?.map((facility: Facility, index: number) => (
        <Grid item key={index}>
          <FacilityCard key={facility.id} facility={facility} />
        </Grid>
      ))}
      <Divider variant="middle" orientation="horizontal" flexItem />
    </Grid>
  );
};

export default FacilityItems;
