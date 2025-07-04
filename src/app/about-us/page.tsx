"use client";
import { Grid } from "@mui/material";
import LandingPageLayout from "@/screens/landingpage_layout/LandingPageLayout";
import AboutUsSection from "@/components/common/AboutUsSection/AboutUsSection";

export default function AboutUsPage(): JSX.Element {
  return (
    <main className="flex min-h-screen flex-col items-center bg-white justify-between">
      <LandingPageLayout>
        <Grid className="gap-20" sx={styles.pageContainer}>
          <AboutUsSection />
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
  },
};
