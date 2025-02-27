import GFeatures from "@/components/common/GFeatures/GFeatures";
import HeroSection from "@/components/common/GHeroSection/GHeroSection";
import GStatSection from "@/components/common/GStatSection/GStatSection";
import GOfferSection from "@/components/common/GOfferSection/GOfferSection";
import GFunctionSection from "@/components/common/GFunctionSection/GFunctionSection";

export default function LandingPage(): JSX.Element {
  return (
    <>
      <HeroSection />
      <GFunctionSection />
      <GOfferSection />
      <GFeatures />
      <GStatSection />
    </>
  );
}
