"use client";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import PropertyFilterPanel from "@/components/filter/PropertyFilterPanel";
import NoContentPage from "@/components/common/NoContentPage";
import addTenderSrc from "@/../public/icons/add_tender.svg";
import TendersContainer from "./tender_card/TendersContainer";
import { currentUser } from "@/lib/features/userSlice";
import { useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { fetchTenders, setTenders } from "@/lib/features/tenderSlice";
import userAPIs from "@/api/user";
import { Tender } from "./tender_card/types";

const TendersOverview: React.FC = () => {
  const user = useSelector(currentUser);
  const dispatch = useAppDispatch();
  const { tenders, loading, error } = useAppSelector((state) => state.tender);

  const [allTenders, setAllTenders] = useState<Tender[]>([]);

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchTenders(user.id));
    }
    getUserTenders("", "", "");
    console.log(allTenders);
  }, [user?.id, dispatch]);

  const getUserTenders = async (
    city: string,
    federalState: string,
    facilityType: string
  ): Promise<void> => {
    if (!user?.id) return;

    const allTenders = await userAPIs.getBuildings(
      user?.id,
      city,
      federalState,
      facilityType
    );
    const userTenders = allTenders.data;

    setAllTenders(userTenders);
    dispatch(setTenders(userTenders));
  };

  const onStateCityFacilityTypeChange = (
    city: string,
    federalState: string,
    facilityType: string
  ): void => {
    getUserTenders(city, federalState, facilityType);
  };

  const tenderContent = (() => {
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    return tenders?.length > 0 ? (
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
        handleOnChange={onStateCityFacilityTypeChange}
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
