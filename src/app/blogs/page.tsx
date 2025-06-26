"use client";
import { Grid } from "@mui/material";
import BlogsOverview from "@/components/layout/blogs/BlogsOverview";
import LandingPageLayout from "@/components/layout/landingpage_layout/LandingPageLayout";

export default function Blogs(): JSX.Element {
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
