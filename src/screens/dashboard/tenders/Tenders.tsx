// Tenders.tsx
'use client';
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import PropertyFilterPanel from "@/components/filter/PropertyFilterPanel";
import NoContentPage from "@/components/common/NoContentPage";
import addTenderSrc from "@/../public/icons/add_tender.svg";

const Tenders: React.FC = () => {


  const tenderContent = <NoContentPage alt="No Tenders" image={addTenderSrc} title="Erstelle eine neue Ausschreibung." buttonLabel="Ausschreibung erstellen"  buttonLink="/dashboard/tenders/add_tender"/>;
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
