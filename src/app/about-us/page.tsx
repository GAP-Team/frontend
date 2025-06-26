"use client";
import { Grid } from "@mui/material";
import LandingPageLayout from "@/components/layout/landingpage_layout/LandingPageLayout";
import AboutUsSection from "@/components/layout/about_us_section/AboutUsSection";

export default function ContactUs(): JSX.Element {
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
