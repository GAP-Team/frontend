"use client";
import React from "react";
import OfferTitleBar from "./OfferTitleBar";
import { Box, Grid } from "@mui/material";
import PDFViewer from "./PdfViewer";
import OfferCard from "./OfferCard";
import BenefitSpecialServiceCard from "./BenefitSpecialServiceCard";
import ButtonCard from "./ButtonCard";

interface OfferOverviewProps {
  offerID: string;
}

const OfferOverview: React.FC<OfferOverviewProps> = ({ offerID }) => {
  return (
    <>
      <OfferTitleBar
        offerTitle={offerID}
        offerSubTitle="Details"
        zipCode="12345"
        officeAddress="123 Main St"
      />
      <Grid container spacing={3} sx={{ mt: 1, px: 2, width: "100%", mb: 2 }}>
        <Grid item xs={12} md={4}>
          <Box sx={{ height: "100%" }}>
            <PDFViewer
              fileName="/documents/offerPdfView.pdf"
              width="100%"
              height="655px"
              className="my-pdf-viewer"
            />
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
