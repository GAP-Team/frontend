"use client";
import React from "react";
import { useState } from "react";
import { Box } from "@mui/system";

import { Facility } from "./types";
import FacilityList from "./FacilityList";
import { dummyFacilities } from "@/utils/Constants";
import addObjSrc from "@/../public/icons/add_building.svg";
import NoContentPage from "@/components/common/NoContentPage";
import PropertyFilterPanel from "@/components/filter/PropertyFilterPanel";

const Facilities = () => {
  const [facilities, setFacilities] = useState<Facility[]>(dummyFacilities);

  const facilityContent =
    facilities?.length > 0 ? (
      <FacilityList facilities={facilities} />
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
