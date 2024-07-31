"use client";

import React, { memo, useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TenderTitleBar from "./TenderTitleBar";
import { jobCardsData } from "@/utils/Constants";
import Paper from "@mui/material/Paper";
import TenderSummarySection from "./TenderSummarySection";
import ApplicationCard from "./ApplicationCard";

interface TenderDetailsProps {
  id: string;
}

const TenderDetails: React.FC<TenderDetailsProps> = ({ id }) => {
  const [loading, setLoading] = useState(true);

  const jobCard = jobCardsData.find((card) => card.id === id);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 8000);

    return () => clearTimeout(timer);
  }, []);

  if (!jobCard) {
    return <Typography variant="h6">Job Card not found</Typography>;
  }

  return (
    <Grid container component="main">
      <TenderTitleBar
        title={jobCard.title}
        projectId={jobCard.projectId}
        location={jobCard.location}
      />
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
