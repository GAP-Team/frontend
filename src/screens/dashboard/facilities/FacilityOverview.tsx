"use client";
import { Box } from "@mui/system";
import PropertyFilterPanel from "@/components/filter/PropertyFilterPanel";
import React, { useEffect } from "react";
import addObjSrc from "@/../public/icons/add_building.svg";
import NoContentPage from "@/components/common/NoContentPage";
import FacilityContainer from "./facility_card/FacilityContainer";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { currentUser } from "@/lib/features/userSlice";
import { useSelector } from "react-redux";
import { fetchBuildings } from "@/lib/features/buildingSlice";
import { Building } from "../buildings/building_card/types";
import { getFacilitiesByUser } from "@/lib/features/facilitySlice";
import { Facility } from "./facility_card/types";

const Facilities = (): JSX.Element => {
  const user = useSelector(currentUser);
  const dispatch = useAppDispatch();
  const { buildings } = useAppSelector((state) => state.building);
  const facilities = useAppSelector((state) => state.facility.facilities);
  const filteredBuildings = buildings.filter((building: Building) =>
    facilities.some((facility: Facility) => facility.buildingId === building.id)
  );

  useEffect(() => {
    if (user?.id) {
      dispatch(
        fetchBuildings({
          userId: user?.id,
          city: "",
          federalState: "",
          facilityType: "",
        })
      );
      dispatch(getFacilitiesByUser(user?.id));
    }
  }, [user?.id, dispatch]);

  const onFilterCriteriaChange = async (
    city: string,
    federalState: string,
    facilityType: string
  ): Promise<void> => {
    await dispatch(
      getFacilitiesByUser(user?.id, city, federalState, facilityType)
    ).unwrap();
  };

  const hasFacilities = filteredBuildings?.some(
    (building: Building) => building?.facilityIds?.length > 0
  );

  const facilityContent = hasFacilities ? (
    <FacilityContainer buildings={filteredBuildings} />
  ) : (
    <NoContentPage
      image={addObjSrc}
      alt="No Facility"
      buttonLabel="Anlage anlegen"
      title="Noch keine Anlagen angelegt"
      buttonLink="/real_estate/facilities/add"
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

export default Facilities;
