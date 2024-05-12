// Buildings.tsx
import React, { useState, useEffect } from "react";
import TenderItemList from "./BuildingItemList";
import Box from "@mui/material/Box";
import { Tender } from "./types";
import PropertyFilterPanel from "@/components/filter/PropertyFilterPanel";
import { dummyBuildings } from "@/utils/Constants";

const Buildings: React.FC = () => {
  const [tenders, setBuildings] = useState<Tender[]>([]);

  useEffect(() => {
    setBuildings(dummyBuildings); // This could be an API call
  }, []);

  return (
      <Box sx={styles.mainContainer}>
        <PropertyFilterPanel />
        <TenderItemList tenders={tenders} />
      </Box>
  );
};

export default Buildings;

// Styles
const styles = {
  mainContainer: {
    display: "flex",
    flexDirection: "column",
    height: "auto",
  },
};
