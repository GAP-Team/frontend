// Buildings.tsx
"use client";
import Box from "@mui/material/Box";
import { ROUTES } from "@/utils/routes";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/lib/hooks";
import { currentUser } from "@/lib/features/userSlice";
import addObjSrc from "@/../public/icons/add_building.svg";
import NoContentSection from "@/components/layout/NoContentSection";
import BuildingContainer from "./building/BuildingContainer";
import PropertyFilterPanel from "@/components/ui/filter/PropertyFilterPanel";
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
      <NoContentSection
        image={addObjSrc}
        alt="No Building/Objekt"
        buttonLabel="Objekt anlegen"
        title="Noch keine Objekte angelegt"
        buttonLink={ROUTES.REAL_ESTATE.BUILDING.ADD_BUILDING}
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
