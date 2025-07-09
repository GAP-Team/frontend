import GFeatures from "@/screens/landing_page/features/GFeatures";
import HeroSection from "@/screens/landing_page/hero-section/GHeroSection";
import GStatSection from "@/screens/landing_page/stat-section/GStatSection";
import GOfferSection from "@/screens/landing_page/offer-section/GOfferSection";
import GFunctionSection from "@/screens/landing_page/function/GFunctionSection";
import BlogsOverview from "@/screens/landing_page/blogs/BlogsOverview";

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
