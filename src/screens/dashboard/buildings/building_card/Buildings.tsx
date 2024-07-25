// Buildings.tsx
'use client';
import React, 
{ 
  useState, 
  useEffect 
} from "react";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";

import { Building } from "./types";
import buildingAPIs from "@/api/building";
import BuildingItemList from "./BuildingItemList";
import { dummyBuildings } from "@/utils/Constants";
import { currentUserId } from "@/lib/features/userSlice";
import addObjSrc from "@/../public/icons/add_building.svg";
import NoContentPage from "@/components/common/NoContentPage";
import PropertyFilterPanel from "@/components/filter/PropertyFilterPanel";

const Buildings: React.FC = () => {

  const userId = useSelector(currentUserId);
  const [buildings, setBuildings] = useState<Building[]>([]);

  useEffect(() => {
    getUserBuildings();
  }, []);
  
  const getUserBuildings = async () => {
    // const buildings = await buildingAPIs.getBuildings(userId);
    const buildings = await buildingAPIs.getBuildings("668251aed64e28e273e30803");

    // setBuildings(dummyBuildings);
    setBuildings(buildings.data);
    console.log("Buildings: ===---> ", buildings.data);
  }

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
