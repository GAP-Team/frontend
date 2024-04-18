import React from "react";
import styles from "./LandingPage.module.scss";
import GBlogSection from "@/components/common/GBlogSection/GBlogSection";
import GFeatures from "@/components/common/GFeatures/GFeatures";
import GOfferSection from "@/components/common/GOfferSection/GOfferSection";
import GFunctionSection from "@/components/common/GFunctionSection/GFunctionSection";
import GTestimonials from "@/components/testimonial/GTestimonials";
import GVideoSection from "@/components/common/GVideoSection/GVideoSection";
import GClientSection from "@/components/common/GClientSection/GClientSection";
import GStatSection from "@/components/common/GStatSection/GStatSection";
import HeroSection from "@/components/common/GHeroSection/GHeroSection";

export default function LandingPage() {
  return (
    <div className={`${styles.loginPageContainer} gap-20`}>
      <HeroSection />
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
