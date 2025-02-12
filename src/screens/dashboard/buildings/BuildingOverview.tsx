// Buildings.tsx
"use client";
import Box from "@mui/material/Box";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/lib/hooks";
import BuildingContainer from "./building_card/BuildingContainer";
import { currentUser } from "@/lib/features/userSlice";
import addObjSrc from "@/../public/icons/add_building.svg";
import NoContentPage from "@/components/common/NoContentPage";
import PropertyFilterPanel from "@/components/filter/PropertyFilterPanel";
import { fetchBuildings, getUserBuildings } from "@/lib/features/buildingSlice";

const BuildingOverview: React.FC = () => {
  const dispatch = useAppDispatch();
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

    const query = {
      userId: user?.id,
      city: city,
      federalState: federalState,
      facilityType: facilityType,
    };
    dispatch(fetchBuildings(query));
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
      <BuildingContainer buildings={userBuildings} />
    ) : (
      <NoContentPage
        image={addObjSrc}
        alt="No Building/Objekt"
        buttonLabel="Objekt anlegen"
        title="Noch keine Objekte angelegt"
        buttonLink="/real-estate/buildings/add"
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

export default BuildingOverview;

// Styles
const styles = {
  mainContainer: {
    display: "flex",
    flexDirection: "column",
    height: "auto",
  },
};
