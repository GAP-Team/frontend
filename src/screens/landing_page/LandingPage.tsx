import styles from "./LandingPage.module.scss";
import GFeatures from "@/components/common/GFeatures/GFeatures";
import HeroSection from "@/components/common/GHeroSection/GHeroSection";
import GStatSection from "@/components/common/GStatSection/GStatSection";
import GOfferSection from "@/components/common/GOfferSection/GOfferSection";
import GFunctionSection from "@/components/common/GFunctionSection/GFunctionSection";

export default function LandingPage(): JSX.Element {
  return (
    <div className={`${styles.loginPageContainer} gap-20`}>
      <HeroSection />
      <GFunctionSection />
      <GOfferSection />
      <GFeatures />
      <GStatSection />
    </div>
  );
}
