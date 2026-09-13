// Buildings.tsx
"use client";
import Box from "@mui/material/Box";
import { ROUTES } from "@/utils/routes";
import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/lib/hooks";
import { currentUser } from "@/lib/features/userSlice";
import addObjSrc from "@icons/add_building.svg";
import FallbackPage from "@/components/common/pages/FallbackPage";
import BuildingContainer from "@/screens/real-estate-owner/buildings/building-overview/BuildingContainer";
import BuildingDetailWorkspace from "@/screens/real-estate-owner/buildings/building-overview/BuildingDetailWorkspace";
import PropertyFilterPanel from "@/components/common/filter/PropertyFilterPanel";
import { fetchBuildings, getUserBuildings } from "@/lib/features/buildingSlice";
import { getFacilitiesByUser } from "@/lib/features/facilitySlice";
import { fetchTenders } from "@/lib/features/tenderSlice";
import { Building } from "@/screens/real-estate-owner/buildings/building-overview/types";

const BuildingsOverview: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useSelector(currentUser);
  const userBuildings = useSelector(getUserBuildings);
  const [selectedBuildingId, setSelectedBuildingId] = useState<string | null>(
    null
  );

  useEffect(() => {
    if (!user?.id) return;
    fetchUserBuildings("", "", "");
    dispatch(getFacilitiesByUser(user.id));
    dispatch(fetchTenders(user.id));
  }, [user?.id]);

  const fetchUserBuildings = async (
    city: string,
    state: string,
    facilityType: string
  ): Promise<void> => {
    if (!user?.id) return;

    const query = {
      userId: user?.id,
      city: city,
      state: state,
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

  const selectedBuilding = useMemo(
    () =>
      userBuildings?.find(
        (building: Building) => building.id === selectedBuildingId
      ) ?? null,
    [userBuildings, selectedBuildingId]
  );

  if (selectedBuilding) {
    return (
      <BuildingDetailWorkspace
        building={selectedBuilding}
        onBack={() => setSelectedBuildingId(null)}
      />
    );
  }

  const buildingContent =
    userBuildings?.length > 0 ? (
      <BuildingContainer
        buildings={userBuildings}
        onSelect={setSelectedBuildingId}
      />
    ) : (
      <FallbackPage
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

export default BuildingsOverview;

// Styles
const styles = {
  mainContainer: {
    display: "flex",
    flexDirection: "column",
    height: "auto",
  },
};
