import { Box } from "@mui/material";
import Testimonial from "@/components/common/Testimonial/Testimonial";
import HeroSection from "@/components/common/HeroSection/HeroSection";
import FeatureSection from "@/components/common/FeatureSection/FeatureSection";
import RealEstateOwnerTypes from "@/components/common/RealEstateOwnerTypes/RealEstateOwnerTypes";

const RealEstateScreen = (): JSX.Element => {
  return (
    <Box sx={{ width: "100%" }}>
      <HeroSection />
      <RealEstateOwnerTypes />
      <FeatureSection />
      <Testimonial />
    </Box>
  );
};

export default RealEstateScreen;
