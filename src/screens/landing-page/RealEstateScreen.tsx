import { Box } from "@mui/material";
import Testimonial from "@/screens/landing-page/testimonial/Testimonial";
import HeroSection from "@/screens/landing-page/hero-section/HeroSection";
import DashboardFeatureSection from "@/screens/landing-page/DashboardFeatureSection";
import RealEstateOwnerTypes from "@/screens/landing-page/RealEstateOwnerTypes";

const RealEstateScreen = (): JSX.Element => {
  return (
    <Box sx={{ width: "100%" }}>
      <HeroSection />
      <RealEstateOwnerTypes />
      <DashboardFeatureSection />
      <Testimonial />
    </Box>
  );
};

export default RealEstateScreen;
