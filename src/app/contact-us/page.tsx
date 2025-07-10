"use client";
import { Grid } from "@mui/material";
import LandingPageLayout from "@/components/layout/LandingPageLayout";
import ContactSection from "@/screens/landing_page/contact/ContactSection";

export default function ContactUsPage(): JSX.Element {
  return (
    <main className="flex min-h-screen flex-col items-center bg-white justify-between">
      <LandingPageLayout>
        <Grid className="gap-20" sx={styles.pageContainer}>
          <ContactSection />
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
