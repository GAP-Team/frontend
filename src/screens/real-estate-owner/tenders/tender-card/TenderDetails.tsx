"use client";
import React, { memo } from "react";
import { useAppSelector } from "@/lib/hooks";
import { getTenderById } from "@/lib/features/tenderSlice";
import Grid from "@mui/material/Grid";
import TenderTitleBar from "./TenderTitleBar";
import Paper from "@mui/material/Paper";
import TenderSummarySection from "./TenderSummarySection";
import ApplicationCard from "./ApplicationCard";
import { Facility } from "@/screens/real-estate-owner/facilities/facility-card/types";

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
      <TenderTitleBar
        title={tender?.tenderType}
        subTitle={subcategory || tender?.facility.name}
      />
      <Grid container spacing={2} mx={1} columns={18}>
        <Grid item xs={8}>
          <Paper sx={{ maxWidth: "false", width: "100%", p: "1.25rem" }}>
            <TenderSummarySection tender={tender} />
          </Paper>
        </Grid>
        <Grid item xs={8}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <ApplicationCard />
            </Grid>
            <Grid item xs={12}>
              <ApplicationCard />
            </Grid>
            <Grid item xs={12}>
              <ApplicationCard />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>
    </Grid>
  );
};

export default memo(TenderDetails);
