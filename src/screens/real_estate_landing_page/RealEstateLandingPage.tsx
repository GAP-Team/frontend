import HeroSection from "@/components/common/HeroSection/HeroSection";
import FeatureSection from "@/components/common/FeatureSection/FeatureSection";
import RealEstateOwnerTypes from "@/components/common/RealEstateOwnerTypes/RealEstateOwnerTypes";
import { Box } from "@mui/material";

const RealEstateLandingPage = (): JSX.Element => {
  return (
    <Box sx={{ width: "100%" }}>
      <HeroSection />
      <RealEstateOwnerTypes />
      <FeatureSection />
    </Box>
  );
};

export default RealEstateLandingPage;
