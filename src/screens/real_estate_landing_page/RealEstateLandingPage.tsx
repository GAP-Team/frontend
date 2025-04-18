import HeroSection from "@/components/common/HeroSection/HeroSection";
import FeatureSection from "@/components/common/FeatureSection/FeatureSection";
import RealEstateOwnerTypes from "@/components/common/RealEstateOwnerTypes/RealEstateOwnerTypes";

const RealEstateLandingPage = (): JSX.Element => {
  return (
    <>
      <HeroSection />
      <RealEstateOwnerTypes />
      <FeatureSection />
    </>
  );
};

export default RealEstateLandingPage;
