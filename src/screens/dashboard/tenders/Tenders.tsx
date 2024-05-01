// Tenders.tsx
import React, { useState, useEffect } from "react";
import TenderItemList from "./TenderItemList";
import Box from "@mui/material/Box";
import { Tender } from "./types";
import PropertyFilterPanel from "@/components/filter/PropertyFilterPanel";
import { dummyTenders } from "@/utils/Constants";

const Tenders: React.FC = () => {
  const [tenders, setTenders] = useState<Tender[]>([]);

  useEffect(() => {
    setTenders(dummyTenders); // This could be an API call
  }, []);

  return (
      <Box sx={styles.mainContainer}>
        <PropertyFilterPanel />
        <TenderItemList tenders={tenders} />
      </Box>
  );
};

export default Tenders;

// Styles
const styles = {
  mainContainer: {
    display: "flex",
    flexDirection: "column",
    height: "auto",
  },
};
