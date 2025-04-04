import HeroSection from "@/components/real_estate_landing_page_components/HeroSection";
import FeatureSection from "@/components/real_estate_landing_page_components/FeatureSection";
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
