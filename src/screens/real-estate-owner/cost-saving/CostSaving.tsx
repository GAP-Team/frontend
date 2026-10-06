import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TotalSavingSection from "./TotalSavingSection";
import PageTitle from "@/components/data-display/label/PageTitle";
import JobList from "./JobList";
import { jobItemListInCostPage } from "@/utils/Constants";
import GEmptyState from "@/components/data-display/GEmptyState";

export default function CostSaving(): JSX.Element {
  return (
    <Box sx={styles.pageContainer}>
      <PageTitle title="Kosteneinsparung" sx={{ ml: "1.5rem", my: "1rem" }} />
      <Grid
        container
        spacing={2}
        sx={{ flex: 1, padding: "1rem", paddingTop: 0 }}
      >
        {/* Left Column */}
        <Grid
          item
          xs={12}
          md={3}
          sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          <Box sx={styles.coloredPaper1}>
            <TotalSavingSection />
          </Box>
        </Grid>

        {/* Right Column */}
        <Grid item xs={12} md={9} sx={styles.rightColumn}>
          {jobItemListInCostPage.length === 0 ? (
            <GEmptyState
              text="Noch keine Einsparungen vorhanden"
              description="Hier sehen Sie, wie viel Sie durch Ausschreibungen gespart haben. Sobald Aufträge mit Einsparungen abgeschlossen sind, erscheinen sie hier."
            />
          ) : (
            <JobList jobs={jobItemListInCostPage} />
          )}
        </Grid>
      </Grid>
    </Box>
  );
}

const sharedColoredPaperStyles: React.CSSProperties = {
  flex: 1,
  padding: "1.5rem",
  boxSizing: "border-box",
  borderRadius: "1rem",
};

const styles: { [key: string]: React.CSSProperties } = {
  pageContainer: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    backgroundColor: "#F1F3F4",
  },
  coloredPaper1: {
    ...sharedColoredPaperStyles,
    backgroundColor: "#22BC7E",
  },
  rightColumn: {
    display: "flex",
    flexDirection: "column",
    height: "100%", // Fill height of the parent
    flex: 1, // Ensure the column grows to fill the available space
    padding: "1",
    boxSizing: "border-box",
  },
};
