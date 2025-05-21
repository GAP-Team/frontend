"use client";
import { Box } from "@mui/material";
import LandingPageLayout from "@/screens/landingpage_layout/LandingPageLayout";
import RealEstateLandingPage from "@/screens/real_estate_landing_page/RealEstateLandingPage";

export default function Home(): JSX.Element {
  return (
    <main className="flex min-h-screen flex-col items-center bg-white justify-between">
      <LandingPageLayout>
        <Box sx={styles.pageContainer}>
          <RealEstateLandingPage />
        </Box>
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
    minHeight: { xs: "25rem", md: "30rem", lg: "35rem" },
    gap: { xs: 8, sm: 12, md: 16, lg: 20 },
  },
};
