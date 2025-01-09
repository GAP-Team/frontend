"use client";
import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import PropertyFilterPanel from "@/components/filter/PropertyFilterPanel";
import NoContentPage from "@/components/common/NoContentPage";
import addTenderSrc from "@/../public/icons/add_tender.svg";
import TendersContainer from "./tender_card/TendersContainer";
import { currentUser } from "@/lib/features/userSlice";
import { useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { fetchTenders, setTendersByBuilding } from "@/lib/features/tenderSlice";
import userAPIs from "@/api/user";
import { BuildingTenders } from "./tender_card/types";

const TendersOverview: React.FC = () => {
  const user = useSelector(currentUser);
  const dispatch = useAppDispatch();
  const { tenders, loading, error } = useAppSelector((state) => state.tender);

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchTenders(user.id));
    }
  }, [user?.id, dispatch]);

  const onFilterCriteriaChange = (
    city: string,
    federalState: string,
    facilityType: string
  ): void => {
    dispatch(fetchTenders(user?.id, city, federalState, facilityType));
  };
  
  const hasTenders = tenders?.some(
    (building: BuildingTenders) => building?.tenders?.length > 0
  );

  const tenderContent = (() => {
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    return hasTenders ? (
      <TendersContainer buildings={tenders} />
    ) : (
      <NoContentPage
        alt="No Tenders"
        image={addTenderSrc}
        title="Erstelle eine neue Ausschreibung."
        buttonLabel="Ausschreibung erstellen"
        buttonLink="/real_estate/tenders/add"
      />
    );
  })();

  return (
    <Box sx={styles.mainContainer}>
      <PropertyFilterPanel
        handleOnChange={onFilterCriteriaChange}
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
