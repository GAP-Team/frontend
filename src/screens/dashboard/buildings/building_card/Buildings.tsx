// Buildings.tsx
import React, { useState, useEffect } from "react";
import BuildingItemList from "./BuildingItemList";
import Box from "@mui/material/Box";
import { Building } from "./types";
import PropertyFilterPanel from "@/components/filter/PropertyFilterPanel";
import { dummyBuildings } from "@/utils/Constants";

const Buildings: React.FC = () => {
  const [buildings, setBuildings] = useState<Building[]>([]);

  useEffect(() => {
    setBuildings(dummyBuildings); // This could be an API call
  }, []);

  return (
      <Box sx={styles.mainContainer}>
        <PropertyFilterPanel />
        <BuildingItemList buildings={buildings} />
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
