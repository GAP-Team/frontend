// Tenders.tsx
'use client';
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import PropertyFilterPanel from "@/components/filter/PropertyFilterPanel";
import NoContentPage from "@/components/common/NoContentPage";
import addTenderSrc from "@/../public/icons/add_tender.svg";
import { jobCardsData } from "@/utils/Constants";
import TenderList from "./tender_card/TenderList";
import { TenderProps } from "./tender_card/types";

const Tenders: React.FC = () => {
  const [tenders, setTenders] = useState<TenderProps[]>([]);

  useEffect(() => {
    setTenders(jobCardsData); // This could be an API call
  }, []);

  const tenderContent = tenders.length > 0 ? <TenderList tenders={tenders} /> : <NoContentPage alt="No Tenders" image={addTenderSrc} title="Erstelle eine neue Ausschreibung." buttonLabel="Ausschreibung erstellen"  buttonLink="/dashboard/tenders/add_tender"/>;
  return (
      <Box sx={styles.mainContainer}>
        <PropertyFilterPanel />
        {tenderContent}
      </Box>
  );
};

export default Tenders;

// Styles
const styles = {
  mainContainer: {
    display: "flex",
    flexDirection: "column",
    height: "auto",
  },
};
