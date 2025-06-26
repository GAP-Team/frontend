import GFeatures from "@/components/layout/features_section/GFeatures";
import HeroSection from "@/components/layout/hero_section/GHeroSection";
import GStatSection from "@/components/layout/stat_section/GStatSection";
import GOfferSection from "@/components/layout/offer_section/GOfferSection";
import GFunctionSection from "@/components/layout/function_section/GFunctionSection";
import BlogsOverview from "@/components/layout/blogs/BlogsOverview";

export default function LandingPage(): JSX.Element {
  return (
    <>
      <HeroSection />
      <GFunctionSection />
      <GOfferSection />
      <GFeatures />
      <BlogsOverview />
      <GStatSection />
    </>
  );
}
