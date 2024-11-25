// Buildings.tsx
"use client";
import userAPIs from "@/api/user";
import Box from "@mui/material/Box";
import React, { useEffect } from "react";
import BuildingItemList from "./BuildingItemList";
import { currentUser } from "@/lib/features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import addObjSrc from "@/../public/icons/add_building.svg";
import NoContentPage from "@/components/common/NoContentPage";
import PropertyFilterPanel from "@/components/filter/PropertyFilterPanel";
import {
  getUserBuildings,
  setUserBuildingDetails,
} from "@/lib/features/buildingSlice";

const Buildings: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector(currentUser);
  const userBuildings = useSelector(getUserBuildings);

  useEffect(() => {
    fetchUserBuildings("", "", "");
  }, [user?.id]);

  const fetchUserBuildings = async (
    city: string,
    federalState: string,
    facilityType: string
  ): Promise<void> => {
    if (!user?.id) return;

    const allBuildings = await userAPIs.getBuildings(
      user?.id,
      city,
      federalState,
      facilityType
    );
    const fetchedBuildings = allBuildings.data;

    dispatch(setUserBuildingDetails(fetchedBuildings));
  };

  const onStateCityFacilityTypeChange = (
    city: string,
    federalState: string,
    facilityType: string
  ): void => {
    fetchUserBuildings(city, federalState, facilityType);
  };

  const buildingContent =
    userBuildings?.length > 0 ? (
      <BuildingItemList buildings={userBuildings} />
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
