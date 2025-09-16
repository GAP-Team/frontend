"use client";
import { Box } from "@mui/system";
import PropertyFilterPanel from "@/components/common/filter/PropertyFilterPanel";
import React, { useEffect, useMemo, useCallback } from "react";
import addObjSrc from "@icons/add_building.svg";
import FallbackPage from "@/components/common/pages/FallbackPage";
import FacilityContainer from "@/screens/real-estate-owner/facilities/facility-overview/FacilityContainer";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { currentUser } from "@/lib/features/userSlice";
import { useSelector } from "react-redux";
import { fetchBuildings } from "@/lib/features/buildingSlice";
import { Building } from "@/screens/real-estate-owner/buildings/building-overview/types";
import { ROUTES } from "@/utils/routes";
import { getFacilitiesByUser } from "@/lib/features/facilitySlice";
import { Facility } from "@/screens/real-estate-owner/facilities/facility-overview/types";
import { useSearchParams } from "next/navigation";

const FacilityOverview: React.FC = (): JSX.Element => {
  const user = useSelector(currentUser);
  const dispatch = useAppDispatch();
  const { buildings } = useAppSelector((state) => state.building);
  const facilities = useAppSelector((state) => state.facility.facilities);
  const searchParams = useSearchParams();

  const city = searchParams.get("city");
  const state = searchParams.get("state");
  const facilityType = searchParams.get("facilityType");
  const facilityId = searchParams.get("facilityId");

  useEffect(() => {
    if (user?.id) {
      dispatch(
        fetchBuildings({
          userId: user.id,
          city: "",
          state: "",
          facilityType: "",
        })
      );
      dispatch(getFacilitiesByUser(user.id));
    }
  }, [user?.id, dispatch]);

  useEffect(() => {
    if (user?.id && buildings.length > 0 && city && state && facilityType) {
      dispatch(getFacilitiesByUser(user.id, city, state, facilityType));
    }
  }, [user?.id, buildings, city, state, facilityType, dispatch]);

  const onFilterCriteriaChange = useCallback(
    async (
      city: string,
      state: string,
      facilityType: string
    ): Promise<void> => {
      await dispatch(
        getFacilitiesByUser(user?.id, city, state, facilityType)
      ).unwrap();
    },
    [dispatch, user?.id]
  );

  const filteredFacilities = useMemo(() => {
    if (facilityId) {
      return facilities.filter((f: Facility) => f.id === facilityId);
    }
    return facilities;
  }, [facilities, facilityId]);

  const filteredBuildings = useMemo(
    () =>
      buildings.filter((building: Building) =>
        filteredFacilities.some(
          (facility: Facility) => facility.buildingId === building.id
        )
      ),
    [buildings, filteredFacilities]
  );

  const hasFacilities = useMemo(
    () =>
      filteredBuildings?.some(
        (building: Building) => building?.facilityIds?.length > 0
      ),
    [filteredBuildings]
  );

  const facilityContent = hasFacilities ? (
    <FacilityContainer buildings={filteredBuildings} />
  ) : (
    <FallbackPage
      image={addObjSrc}
      alt="No Facility"
      buttonLabel="Anlage anlegen"
      title="Noch keine Anlagen angelegt"
      buttonLink={ROUTES.REAL_ESTATE.FACILITY.ADD_FACILITY}
      description="Du hast noch keine Anlagen angelegt, wenn Du Deine Anlagen erstellt hast findest Du sie hier."
    />
  );

  return (
    <Box sx={styles.mainContainer}>
      <PropertyFilterPanel
        handleOnChange={onFilterCriteriaChange}
        title="Alle Anlagen"
      />
      {facilityContent}
    </Box>
  );
};

// Styles
const styles = {
  mainContainer: {
    display: "flex",
    flexDirection: "column",
    height: "auto",
  },
};

export default FacilityOverview;
