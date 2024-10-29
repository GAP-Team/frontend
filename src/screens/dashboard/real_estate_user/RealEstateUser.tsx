import * as React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import OverviewPanel from "./overview_panel/OverviewPanel";
import AssignmentsPanel from "./tenders_panel/TendersPanel";
import ApplicationsPanel from "./applications_panel/ApplicationsPanel";
import NewsPanel from "./communication_panel/NewsPanel";

export default function RealEstateUser(): JSX.Element {
  return (
    <Grid container spacing={2} sx={styles.mainContainer} columns={16}>
      <Grid item xs={3}>
        <Paper sx={styles.coloredPaper}>
          <OverviewPanel />
        </Paper>
      </Grid>
      <Grid item xs={13}>
        <Grid container spacing={2} columns={16}>
          <Grid item xs={16}>
            <Paper sx={styles.topPaper}>
              <AssignmentsPanel />
            </Paper>
          </Grid>
          <Grid item xs={9}>
            <Paper sx={styles.bottomLeftPaper}>
              <ApplicationsPanel />
            </Paper>
          </Grid>
          <Grid item xs={7}>
            <Paper sx={styles.bottomRightPaper}>
              <NewsPanel />
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

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
