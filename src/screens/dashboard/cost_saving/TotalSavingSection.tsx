import SectionTitle from "@/components/label/SectionTitle";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import StatisticsItem from "@/components/label/StatisticsItem";
import DividerDecorator from "@/components/divider/DividerDecorator";

const TotalSavingSection = (): JSX.Element => {
  return (
    <>
      <SectionTitle
        text="GESAMMTE EINSPARUNG"
        sx={{ color: "white", lineHeight: "1rem" }}
      />
      <DividerDecorator/>
      
    </>
  );
};

export default TotalSavingSection;

// Styles
const styles = {
  statsSection: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    p: "1rem",
  },
  dividerStats: {
    mx: 2,
    height: "auto",
    bgcolor: "white",
  },
};
