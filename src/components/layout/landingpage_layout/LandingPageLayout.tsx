"use client";
import { ReactNode } from "react";
import GFooter from "@/components/layout/footer/GFooter";
import GNavbar from "@/components/layout/navigation/GNavbar/GNavbar";

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
