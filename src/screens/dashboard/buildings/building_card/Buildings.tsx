// Buildings.tsx
'use client';
import React, { useState, useEffect } from "react";
import BuildingItemList from "./BuildingItemList";
import Box from "@mui/material/Box";
import { Building } from "./types";
import PropertyFilterPanel from "@/components/filter/PropertyFilterPanel";
import { dummyBuildings } from "@/utils/Constants";
import NoContentPage from "@/components/common/NoContentPage";
import addObjSrc from "@/../public/icons/add_building.svg";

const Buildings: React.FC = () => {
  const [buildings, setBuildings] = useState<Building[]>([]);

  useEffect(() => {
    setBuildings(dummyBuildings); // This could be an API call
  }, []);

  const buildingContent = dummyBuildings.length > 0 ? <BuildingItemList buildings={buildings} /> : <NoContentPage alt="No Building/Objekt" image={addObjSrc} title="Erstelle ein neues Objekt." buttonLabel="Objekt anlegen" buttonLink="/dashboard/buildings/add_building"/>;
  return (
      <Box sx={styles.mainContainer}>
        <PropertyFilterPanel />
        {buildingContent}
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
