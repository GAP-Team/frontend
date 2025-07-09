"use client";
import { Grid } from "@mui/material";
import LandingPageLayout from "@/components/layout/LandingPageLayout";
import FunctionsSection from "@/screens/landing_page/FunctionsSection";

export default function OurServicePage(): JSX.Element {
  return (
    <main className="flex min-h-screen flex-col items-center bg-white justify-between">
      <LandingPageLayout>
        <Grid className="gap-20" sx={styles.pageContainer}>
          <FunctionsSection />
        </Grid>
      </LandingPageLayout>
    </main>
  );
}

const styles = {
  pageContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    minHeight: "35rem",
  },
};
