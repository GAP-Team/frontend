"use client";
import { Box } from "@mui/material";
import LandingPageLayout from "@/components/layout/LandingPageLayout";
import RealEstateScreen from "@/screens/landing_page/RealEstateScreen";

export default function RealEstateLandingpage(): JSX.Element {
  return (
    <main className="flex min-h-screen flex-col items-center bg-white justify-between">
      <LandingPageLayout>
        <Box sx={styles.pageContainer}>
          <RealEstateScreen />
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
