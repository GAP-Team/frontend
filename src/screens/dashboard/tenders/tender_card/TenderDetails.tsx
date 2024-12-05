"use client";
import React, { memo, useEffect, useState } from "react";
import { useAppSelector } from "@/lib/hooks";
import { selectTenderById } from "@/lib/features/tenderSlice";
import Grid from "@mui/material/Grid";
import TenderTitleBar from "./TenderTitleBar";
import Paper from "@mui/material/Paper";
import TenderSummarySection from "./TenderSummarySection";
import ApplicationCard from "./ApplicationCard";

interface TenderDetailsProps {
  id: string;
}

const TenderDetails: React.FC<TenderDetailsProps> = ({ id }) => {
  const [loading, setLoading] = useState(true);

  // Fetch tender details by ID
  const tender = useAppSelector((state) => selectTenderById(state, id));

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 8000);

    return (): void => clearTimeout(timer);
  }, []);

  return (
    <Grid container component="main">
      <TenderTitleBar
        title={tender?.tenderType}
        projectId={tender?.facility.name}
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
              <ApplicationCard loading={loading} />
            </Grid>
            <Grid item xs={12}>
              <ApplicationCard loading={loading} />
            </Grid>
            <Grid item xs={12}>
              <ApplicationCard loading={loading} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>
    </Grid>
  );
};

export default memo(TenderDetails);
