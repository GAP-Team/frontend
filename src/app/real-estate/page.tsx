"use client";
import { Grid } from "@mui/material";
import LandingPageLayout from "@/screens/landingpage_layout/LandingPageLayout";
import RealEstateLandingPage from "@/screens/real_estate_landing_page/RealEstateLandingPage";

export default function Home(): JSX.Element {
  return (
    <main className="flex min-h-screen flex-col items-center bg-white justify-between">
      <LandingPageLayout>
        <Grid className="gap-20" sx={styles.pageContainer}>
          <RealEstateLandingPage />
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
