import * as React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import TotalSavingSection from "./TotalSavingSection";
import PageTitle from "@/components/label/PageTitle";

export default function CostSavingPage(): JSX.Element {
  return (
    <Box sx={styles.pageContainer}>
      <PageTitle title="Kosteneinsparung" sx={{ ml: "1.5rem",my:'1rem' }} />
      <Grid container spacing={2} sx={{ flex: 1, padding:'1rem', }}>
        {/* Left Column */}
        <Grid item xs={12} md={3} sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Paper sx={styles.coloredPaper}>
            <TotalSavingSection />
          </Paper>
          <Paper sx={styles.coloredPaper}>
            <TotalSavingSection />
          </Paper>
        </Grid>

        {/* Right Column */}
        <Grid item xs={12} md={9} sx={{ display: "flex" }}>
          <Paper sx={styles.rightPaper}>
            {/* Right Panel Content */}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

const styles = {
  pageContainer: {
    display: "flex",
    flexDirection: "column",
    height: "100%", // Takes full height of the parent container
  },
  coloredPaper: {
    flex: 1, // Equal height for both sections
    backgroundColor: "#2356FF",
    padding: "1rem",
    boxSizing: "border-box",
  },
  rightPaper: {
    flex: 1,
    padding: "1.25rem",
    boxSizing: "border-box",
  },
};
