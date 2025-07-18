import GFeatures from "@/screens/landing-page/features/GFeatures";
import GHeroSection from "@/screens/landing-page/hero-section/GHeroSection";
import GStatSection from "@/screens/landing-page/stat-section/GStatSection";
import GOfferSection from "@/screens/landing-page/offer-section/GOfferSection";
import GFunctionSection from "@/screens/landing-page/function/GFunctionSection";
import BlogsOverview from "@/screens/landing-page/blogs/BlogsOverview";

export default function LandingPage(): JSX.Element {
  return (
    <>
      <GHeroSection />
      <GFunctionSection />
      <GOfferSection />
      <GFeatures />
      <BlogsOverview />
      <GStatSection />
    </>
  );
}
