"use client";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import React, { memo, ReactElement, Children } from "react";

interface DashboardProps {
  children?: React.ReactNode;
}

const Dashboard: React.FC<DashboardProps> = ({ children }) => {
  const getChildBySlot = (slotName: string): ReactElement | undefined => {
    return Children.toArray(children).find(
      (child) =>
        React.isValidElement(child) && (child.props as any)?.slot === slotName
    ) as ReactElement | undefined;
  };

  return (
    <Grid container spacing={2} sx={styles.mainContainer} columns={16}>
      <Grid item xs={3}>
        <Paper sx={styles.coloredPaper}>
          {getChildBySlot("overview") || "Overview Panel"}
        </Paper>
      </Grid>
      <Grid item xs={13}>
        <Grid container spacing={2} columns={16}>
          <Grid item xs={16}>
            <Paper sx={styles.topPaper}>
              {getChildBySlot("tenders") || "Tenders Panel"}
            </Paper>
          </Grid>
          <Grid item xs={9}>
            <Paper sx={styles.bottomLeftPaper}>
              {getChildBySlot("applications") || "Applications Panel"}
            </Paper>
          </Grid>
          <Grid item xs={7}>
            <Paper sx={styles.bottomRightPaper}>
              {getChildBySlot("news") || "News Panel"}
            </Paper>
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
