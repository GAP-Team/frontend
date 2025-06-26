import { Box } from "@mui/material";
import Testimonial from "@/components/layout/testimonial/Testimonial";
import HeroSection from "@/components/layout/hero_section/HeroSection";
import FeatureSection from "@/components/layout/feature_section/FeatureSection";
import RealEstateOwnerCards from "@/components/ui/card/real_estate_owner_cards/RealEstateOwnerCards";

const RealEstateLandingSection = (): JSX.Element => {
  return (
    <Box sx={{ width: "100%" }}>
      <HeroSection />
      <RealEstateOwnerCards />
      <FeatureSection />
      <Testimonial />
    </Box>
  );
};

export default RealEstateLandingSection;
