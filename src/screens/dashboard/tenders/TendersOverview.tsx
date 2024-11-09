"use client";
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import PropertyFilterPanel from "@/components/filter/PropertyFilterPanel";
import NoContentPage from "@/components/common/NoContentPage";
import addTenderSrc from "@/../public/icons/add_tender.svg";
import TendersContainer from "./tender_card/TendersContainer";
import { Building } from "./tender_card/types";
import { currentUser } from "@/lib/features/userSlice";
import { useSelector } from "react-redux";
import tenderAPIs from "@/api/tender";

const TendersOverview: React.FC = () => {
  const [buildings, setBuildings] = useState<Building[]>([]);

  const user = useSelector(currentUser);

  useEffect(() => {
    getTenders();
  }, [user?._id]);

  const getTenders = async (): Promise<void> => {
    const buildings = await tenderAPIs.getTenders(user?._id);
    setBuildings(buildings.data);
  };

  const tenderContent =
    buildings.length > 0 ? (
      <TendersContainer buildings={buildings} />
    ) : (
      <NoContentPage
        alt="No Tenders"
        image={addTenderSrc}
        title="Erstelle eine neue Ausschreibung."
        buttonLabel="Ausschreibung erstellen"
        buttonLink="/real_estate/tenders/add"
      />
    );
  return (
    <Box sx={styles.mainContainer}>
      <PropertyFilterPanel
        handleOnChange={() => {}}
        title="Alle Ausschreibungen"
      />
      {tenderContent}
    </Box>
  );
};

export default TendersOverview;

// Styles
const styles = {
  mainContainer: {
    display: "flex",
    flexDirection: "column",
    height: "auto",
  },
};
