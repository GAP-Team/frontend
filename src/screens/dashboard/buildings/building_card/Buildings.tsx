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
import { currentUser } from "@/lib/features/userSlice";
import addObjSrc from "@/../public/icons/add_building.svg";
import NoContentPage from "@/components/common/NoContentPage";
import PropertyFilterPanel from "@/components/filter/PropertyFilterPanel";

const Buildings: React.FC = () => {

  const user = useSelector(currentUser);
  const [buildings, setBuildings] = useState<Building[]>([]);

  useEffect(() => {
    getUserBuildings("", "");
  }, []);
  
  const getUserBuildings = async (city: string, federalState: string) => {
    const allBuildings = await buildingAPIs.getBuildings(user?._id, city, federalState);
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
      title="Erstelle ein neues Objekt." 
      buttonLink="/dashboard/buildings/add_building"
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
