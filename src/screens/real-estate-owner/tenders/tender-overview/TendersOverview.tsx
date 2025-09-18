"use client";
import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import PropertyFilterPanel from "@/components/common/filter/PropertyFilterPanel";

import addTenderSrc from "@icons/add_tender.svg";
import TendersContainer from "@/screens/real-estate-owner/tenders/tender-overview/TendersContainer";
import { currentUser } from "@/lib/features/userSlice";
import { useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { fetchTenders } from "@/lib/features/tenderSlice";
import { BuildingTenders } from "@/screens/real-estate-owner/tenders/tender-overview/types";
import { ROUTES } from "@/utils/routes";
import FallbackPage from "@/components/common/pages/FallbackPage";
import { useAuth } from "@/hooks/useAuth";

const TendersOverview: React.FC = () => {
  const user = useSelector(currentUser);
  const dispatch = useAppDispatch();
  const { tenders } = useAppSelector((state) => state.tender);
  const { hasAccess } = useAuth();

  useEffect(() => {
    // Only fetch tenders if user is authenticated and has access
    if (user?.id && hasAccess) {
      dispatch(fetchTenders(user.id));
    }
  }, [user?.id, dispatch, hasAccess]);

  const onFilterCriteriaChange = (
    city: string,
    federalState: string,
    facilityType: string
  ): void => {
    // Only trigger filter if user is authenticated
    if (user?.id && hasAccess) {
      dispatch(fetchTenders(user?.id, city, federalState, facilityType));
    }
  };

  const hasTenders = tenders?.some(
    (building: BuildingTenders) => building?.tenders?.length > 0
  );

  const tenderContent = (() => {
    return hasTenders ? (
      <TendersContainer buildings={tenders} />
    ) : (
      <FallbackPage
        alt="No Tenders"
        image={addTenderSrc}
        title="Erstelle eine neue Ausschreibung."
        buttonLabel="Ausschreibung erstellen"
        buttonLink={ROUTES.REAL_ESTATE.TENDER.ADD_TENDER}
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
