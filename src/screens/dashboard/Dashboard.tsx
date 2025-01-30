"use client";
import React, { memo } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

interface DashboardProps {
  NewsPanel?: React.ReactElement;
  TendersPanel?: React.ReactElement;
  OverviewPanel?: React.ReactElement;
  ApplicationsPanel?: React.ReactElement;
}

const Dashboard: React.FC<DashboardProps> = ({
  OverviewPanel,
  TendersPanel,
  ApplicationsPanel,
  NewsPanel,
}) => {
  return (
    <Grid container spacing={2} sx={styles.mainContainer} columns={16}>
      <Grid item xs={3}>
        <Paper sx={styles.coloredPaper}>{OverviewPanel && OverviewPanel}</Paper>
      </Grid>
      <Grid item xs={13}>
        <Grid container spacing={2} columns={16}>
          <Grid item xs={16}>
            <Paper sx={styles.topPaper}>{TendersPanel && TendersPanel}</Paper>
          </Grid>
          <Grid item xs={9}>
            <Paper sx={styles.bottomLeftPaper}>
              {ApplicationsPanel && ApplicationsPanel}
            </Paper>
          </Grid>
          <Grid item xs={7}>
            <Paper sx={styles.bottomRightPaper}>{NewsPanel && NewsPanel}</Paper>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default memo(Dashboard);

// Styles defined at the bottom of the component
const styles = {
  mainContainer: {
    height: "calc(100% - 24px)",
    p: "1rem",
    boxSizing: "border-box",
  },
  coloredPaper: {
    height: "100%",
    width: "100%",
    boxSizing: "border-box",
    backgroundColor: "#2356FF",
    p: "1rem",
  },
  topPaper: {
    height: "calc(50vh - 24px)",
    width: "100%",
    boxSizing: "border-box",
    p: "1.25rem",
  },
  bottomLeftPaper: {
    height: "calc(40vh - 12px)",
    width: "100%",
    boxSizing: "border-box",
    p: "1.25rem",
  },
  bottomRightPaper: {
    height: "calc(40vh - 12px)",
    width: "100%",
    boxSizing: "border-box",
    p: "1.25rem",
  },
};
