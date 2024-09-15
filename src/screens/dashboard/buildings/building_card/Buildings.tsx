// Buildings.tsx
"use client";
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";

import { Building } from "./types";
import buildingAPIs from "@/api/building";
import BuildingItemList from "./BuildingItemList";
import { dummyBuildings } from "@/utils/Constants";
import { currentUser } from "@/lib/features/userSlice";
import addObjSrc from "@/../public/icons/add_building.svg";
import NoContentPage from "@/components/common/NoContentPage";
import { setAllBuildingDetails } from "@/lib/features/userSlice";
import PropertyFilterPanel from "@/components/filter/PropertyFilterPanel";

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
  ) => {
    if (!user?._id) return;
    const allBuildings = await buildingAPIs.getBuildings(
      user?._id,
      city,
      federalState,
      facilityType
    );
    setBuildings(allBuildings.data);

    dispatch(setAllBuildingDetails(allBuildings.data));
  };

  const onStateCityFacilityTypeChange = (
    city: string,
    federalState: string,
    facilityType: string
  ) => {
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
