"use client";
import { ReactNode } from "react";
import GFooter from "@/screens/landing-page/footer/GFooter";
import GNavbar from "@/components/navigation/navbar/GNavbar";

interface LandingPageLayoutProps {
  children: ReactNode;
}

const LandingPageLayout: React.FC<LandingPageLayoutProps> = ({ children }) => {
  return (
    <>
      <GNavbar />
      {children}
      <GFooter />
    </>
  );
};

export default LandingPageLayout;
