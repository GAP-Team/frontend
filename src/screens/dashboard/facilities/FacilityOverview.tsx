"use client";
import { Box } from "@mui/system";
import PropertyFilterPanel from "@/components/filter/PropertyFilterPanel";
import React, { useEffect, useMemo, useCallback } from "react";
import addObjSrc from "@/../public/icons/add_building.svg";
import NoContentPage from "@/components/common/NoContentPage";
import FacilityContainer from "./facility_card/FacilityContainer";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { currentUser } from "@/lib/features/userSlice";
import { useSelector } from "react-redux";
import { fetchBuildings } from "@/lib/features/buildingSlice";
import { Building } from "../buildings/building_card/types";
import { ROUTES } from "@/utils/routes";
import { getFacilitiesByUser } from "@/lib/features/facilitySlice";
import { Facility } from "./facility_card/types";

interface FacilitiesProps {
  facilityId?: string;
}

const FacilityOverview: React.FC<FacilitiesProps> = ({
  facilityId,
}): JSX.Element => {
  const user = useSelector(currentUser);
  const dispatch = useAppDispatch();
  const { buildings } = useAppSelector((state) => state.building);
  const facilities = useAppSelector((state) => state.facility.facilities);

  const filteredBuildings = useMemo(
    () =>
      buildings.filter((building: Building) =>
        facilities.some(
          (facility: Facility) => facility.buildingId === building.id
        )
      ),
    [buildings, facilities]
  );

  const facility = useMemo(
    () => facilities.find((facility: Facility) => facility.id === facilityId),
    [facilities, facilityId]
  );

  const building = useMemo(
    () =>
      buildings.find(
        (building: Building) => building.id === facility?.buildingId
      ),
    [buildings, facility]
  );

  useEffect(() => {
    if (user?.id) {
      dispatch(
        fetchBuildings({
          userId: user.id,
          city: "",
          federalState: "",
          facilityType: "",
        })
      );
      if (building && facility) {
        dispatch(
          getFacilitiesByUser(
            user.id,
            building.city,
            building.federalState,
            facility.facilityType
          )
        );
      }
    }
  }, [user?.id, dispatch, building?.city, building?.federalState, facility?.facilityType]);

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
    <NoContentPage
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
