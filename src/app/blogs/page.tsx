"use client";
import { Grid } from "@mui/material";
import BlogsOverview from "@/components/common/BlogsOverview/BlogsOverview";
import LandingPageLayout from "@/screens/landingpage_layout/LandingPageLayout";

export default function BlogsPage(): JSX.Element {
  return (
    <main className="flex min-h-screen flex-col items-center bg-white justify-between">
      <LandingPageLayout>
        <Grid className="gap-20" sx={styles.pageContainer}>
          <BlogsOverview />
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
