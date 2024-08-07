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
    getUserBuildings("", "");
  }, []);
  
  const getUserBuildings = async (city: string, federalState: string) => {
    const allBuildings = await buildingAPIs.getBuildings(userId, city, federalState);
    setBuildings(allBuildings.data);
  }

  const onStateCityChange = (city: string, federalState: string) => {    
    getUserBuildings(city, federalState);
  }

  const buildingContent = buildings?.length > 0 ? 
    <BuildingItemList buildings={buildings} /> 
  : 
    <NoContentPage 
    image={addObjSrc} 
      alt="No Building/Objekt" 
      buttonLabel="Objekt anlegen" 
      title="Noch keine Objekte angelegt" 
      buttonLink="/dashboard/buildings/add_building"
      description="Du hast noch keine Objekte angelegt, wenn Du Deine Objekte erstellt hast findest Du sie hier."
    />;
  return (
      <Box sx={styles.mainContainer}>
        <PropertyFilterPanel handleOnChange={onStateCityChange} />
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
