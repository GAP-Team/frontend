import { Box } from "@mui/material";
import Testimonial from "@/screens/landing_page/testimonial/Testimonial";
import HeroSection from "@/screens/landing_page/hero-section/HeroSection";
import DashboardFeatureSection from "@/screens/landing_page/DashboardFeatureSection";
import RealEstateOwnerTypes from "@/screens/landing_page/RealEstateOwnerTypes";

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
