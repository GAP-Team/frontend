// Buildings.tsx
"use client";
import userAPIs from "@/api/user";
import { Building } from "./types";
import Box from "@mui/material/Box";
import facilityAPIs from "@/api/facility";
import BuildingItemList from "./BuildingItemList";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import addObjSrc from "@/../public/icons/add_building.svg";
import NoContentPage from "@/components/common/NoContentPage";
import PropertyFilterPanel from "@/components/filter/PropertyFilterPanel";
import { currentUser, setAllBuildingDetails } from "@/lib/features/userSlice";

const Buildings: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector(currentUser);
  const [buildings, setBuildings] = useState<Building[]>([]);

  useEffect(() => {
    getUserBuildings("", "", "");
  }, [user?._id]);

  const getUserBuildings = async (
    city: string,
    federalState: string,
    facilityType: string
  ): Promise<void> => {
    if (!user?._id) return;

    const allBuildings = await userAPIs.getBuildings(
      user?._id,
      city,
      federalState,
      facilityType
    );

    const userBuildings = allBuildings.data;
    
    const allTenders: any[] | ((prevState: Building[]) => Building[]) = [];
    userBuildings?.map( async (building: Building) => {
      const buildingObj = Object.seal(building)
      building?.facilities?.map( async(facility: string) => {
        let tenders = await getFacilityTendersCount(facility);
        const updatedBuildingObj = { ...buildingObj, tendersCount: tenders.length }
        // building.tendersCount = tenders.length;
        console.log("Ttemp ----> ", updatedBuildingObj);
      });
    });
    console.log("T ----> ", userBuildings);
    
    setBuildings(userBuildings);
    dispatch(setAllBuildingDetails(userBuildings));
  };
  
  const getFacilityTendersCount = async(facilityId: string): Promise<any> => {
    const tender = await facilityAPIs.getFacilityTenders(facilityId);
    return tender?.data;
  }

  const onStateCityFacilityTypeChange = (
    city: string,
    federalState: string,
    facilityType: string
  ): void => {
    getUserBuildings(city, federalState, facilityType);
  };

  const buildingContent =
    buildings?.length > 0 ? (
      <BuildingItemList buildings={buildings} />
    ) : (
      <NoContentPage
        image={addObjSrc}
        alt="No Building/Objekt"
        buttonLabel="Objekt anlegen"
        title="Noch keine Objekte angelegt"
        buttonLink="/real_estate/buildings/add"
        description="Du hast noch keine Objekte angelegt, wenn Du Deine Objekte erstellt hast findest Du sie hier."
      />
    );
  return (
    <Box sx={styles.mainContainer}>
      <PropertyFilterPanel
        handleOnChange={onStateCityFacilityTypeChange}
        title="Alle Objekte"
      />
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
