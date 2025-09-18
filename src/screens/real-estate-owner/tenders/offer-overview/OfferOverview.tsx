"use client";
import React from "react";
import { Box, Grid } from "@mui/material";
import PDFViewer from "./PdfViewer";
import OfferCard from "./OfferCard";
import BenefitSpecialServiceCard from "./BenefitSpecialServiceCard";
import ButtonCard from "./ButtonCard";
import DataDisplayBar from "../tender-overview/DataDisplayBar";

interface OfferOverviewProps {
  offerID: string;
  tenderID: string;
}

const OfferOverview: React.FC<OfferOverviewProps> = ({ offerID, tenderID }) => {
  return (
    <>
      <DataDisplayBar
        title={"Angebote 1"}
        subTitle={"Service Name"}
        companyName={"Company Name"}
        officeAddress={"Office Address"}
      />

      <Grid
        container
        spacing={3}
        sx={{ mt: 1, px: 2, width: "100%", mb: 2 }}
        id={tenderID} // Temprary assignment will remove when integrated with backend
      >
        <Grid item xs={12} md={4}>
          <Box sx={{ height: "100%" }}>
            <PDFViewer fileName="/documents/offerPdfView.pdf" />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <OfferCard offerID={offerID} />
            <BenefitSpecialServiceCard />
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          md={2}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
          }}
        >
          <Box>
            <ButtonCard />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default OfferOverview;
