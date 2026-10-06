"use client";
import React, { memo } from "react";
import { useAppSelector } from "@/lib/hooks";
import { getTenderById } from "@/lib/features/tenderSlice";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TenderSummarySection from "./TenderSummarySection";
import { Facility } from "@/screens/real-estate-owner/facilities/facility-overview/types";
import DataDisplayBar from "@/components/data-display/DataDisplayBar";

interface TenderDetailsProps {
  tenderId: string;
}

const TenderDetails: React.FC<TenderDetailsProps> = ({ tenderId }) => {
  // Fetch tender details by ID
  const tender = useAppSelector(getTenderById(tenderId));
  const { facilities } = useAppSelector((state) => state.facility);
  const subcategory = facilities.find(
    (facility: Facility) => facility.id === tender?.facility?.id
  )?.subcategory;

  return (
    <Grid container component="main">
      <DataDisplayBar
        title={tender?.tenderType}
        subTitle={subcategory || tender?.facility.name}
      />
      <Grid container spacing={2} mx={1} columns={18}>
        <Grid item xs={8}>
          <Paper sx={{ maxWidth: "false", width: "100%", p: "1.25rem" }}>
            <TenderSummarySection tender={tender} />
          </Paper>
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>
    </Grid>
  );
};

export default memo(TenderDetails);
