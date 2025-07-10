"use client";
import { Grid } from "@mui/material";
import LandingPageLayout from "@/components/layout/LandingPageLayout";
import SupportCenterSection from "@/screens/landing_page/SupportCenterSection";

export default function SupportCenterPage(): JSX.Element {
  return (
    <main className="flex min-h-screen flex-col items-center bg-white justify-between">
      <LandingPageLayout>
        <Grid className="gap-20" sx={styles.pageContainer}>
          <SupportCenterSection />
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
