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

const Facilities = (): JSX.Element => {
  const user = useSelector(currentUser);
  const dispatch = useAppDispatch();
  const { buildings } = useAppSelector((state) => state.building);

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
    }
  }, [user?.id, dispatch]);

  const hasFacilities = buildings?.some(
    (building: Building) => building?.facilityIds?.length > 0
  );

  const facilityContent = hasFacilities ? (
    <FacilityContainer buildings={buildings} />
  ) : (
    <NoContentPage
      image={addObjSrc}
      alt="No Facility"
      buttonLabel="Anlage anlegen"
      title="Noch keine Anlagen angelegt"
      buttonLink="/real-estate/facilities/add"
      description="Du hast noch keine Anlagen angelegt, wenn Du Deine Anlagen erstellt hast findest Du sie hier."
    />
  );

  return (
    <Box sx={styles.mainContainer}>
      <PropertyFilterPanel handleOnChange={() => {}} title="Alle Anlagen" />
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
