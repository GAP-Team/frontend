import React from "react";
import styles from "./LandingPage.module.scss";
import GBlogSection from "@/sections/GBlogSection/GBlogSection";
import GFeatures from "@/sections/GFeatures/GFeatures";
import GOfferSection from "@/sections/GOfferSection/GOfferSection";
import GFunctionSection from "@/sections/GFunctionSection/GFunctionSection";
import GTestimonials from "@/components/GTestimonials/GTestimonials";
import GVideoSection from "@/sections/GVideoSection/GVideoSection";
import GClientSection from "@/sections/GClientSection/GClientSection";
import GStatSection from "@/sections/GStatSection/GStatSection";


export default function LandingPage() {
  return (
    <div className={`${styles.loginPageContainer} gap-20`}>
      <GFunctionSection />
      <GOfferSection />
      <GFeatures />
      <GVideoSection />
      <GBlogSection />
      <GTestimonials />
      <GClientSection />
      <GStatSection />
    </div>
  );
}
