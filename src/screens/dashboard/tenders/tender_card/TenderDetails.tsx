"use client";
import React, { memo, useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import TenderTitleBar from "./TenderTitleBar";
import Paper from "@mui/material/Paper";
import TenderSummarySection from "./TenderSummarySection";
import ApplicationCard from "./ApplicationCard";

interface TenderDetailsProps {
  id: string;
}

const TenderDetails: React.FC<TenderDetailsProps> = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 8000);

    return (): void => clearTimeout(timer);
  }, []);

  return (
    <Grid container component="main">
      <TenderTitleBar title="title" projectId="projectId" location="location" />
      <Grid container spacing={2} mx={1} columns={18}>
        <Grid item xs={8}>
          <Paper sx={{ maxWidth: "false", width: "100%", p: "1.25rem" }}>
            <TenderSummarySection />
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
