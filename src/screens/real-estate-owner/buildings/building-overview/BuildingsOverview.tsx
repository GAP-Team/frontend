// Buildings.tsx
"use client";
import Box from "@mui/material/Box";
import { ROUTES } from "@/utils/routes";
import React, { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { useRouter, useSearchParams } from "next/navigation";
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
  const router = useRouter();
  const searchParams = useSearchParams();
  const user = useSelector(currentUser);
  const userBuildings = useSelector(getUserBuildings);
  // The selected building lives in the URL (?building=<id>&tab=<n>), so the
  // sidebar's "Alle Gebäude" link (no query) always returns to the list.
  const selectedBuildingId = searchParams.get("building");
  const requestedTab = Number(searchParams.get("tab"));
  const selectedTab = [0, 1, 2].includes(requestedTab) ? requestedTab : 0;

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

  const handleSelectBuilding = (buildingId: string, tab = 0): void => {
    router.push(
      `${ROUTES.REAL_ESTATE.BUILDING.BUILDINGS}?building=${buildingId}&tab=${tab}`
    );
  };

  if (selectedBuilding) {
    return (
      <BuildingDetailWorkspace
        key={selectedBuilding.id}
        building={selectedBuilding}
        initialTab={selectedTab}
        onBack={() => router.push(ROUTES.REAL_ESTATE.BUILDING.BUILDINGS)}
      />
    );
  }

  const buildingContent =
    userBuildings?.length > 0 ? (
      <BuildingContainer
        buildings={userBuildings}
        onSelect={handleSelectBuilding}
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
