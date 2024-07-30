"use client";

import React, { memo } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TenderTitleBar from "./TenderTitleBar";
import { jobCardsData } from "@/utils/Constants";
import { TenderProps } from "./types";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import TenderSummarySection from "./TenderSummarySection";
import ApplicationCard from "./ApplicationCard";

interface TenderDetailsProps {
  id: string;
}

const TenderDetails: React.FC<TenderDetailsProps> = ({ id }) => {
  const jobCard = jobCardsData.find((card) => card.id === id);

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
            <TenderSummarySection/>
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
        <Grid item xs={2}>
        </Grid>
      </Grid>
      {/* <Button onClick={() => window.history.back()}>Back</Button>
      <Typography variant="h4">{`Tender ID: ${id}`}</Typography> */}
    </Grid>
  );
};

export default memo(TenderDetails);
