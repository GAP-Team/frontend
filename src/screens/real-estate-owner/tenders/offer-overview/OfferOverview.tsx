"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import PDFViewer from "./PdfViewer";
import OfferCard from "./OfferCard";
import BenefitSpecialServiceCard from "./BenefitSpecialServiceCard";
import MessageCard from "./MessageCard";
import ButtonCard, { OfferDecision } from "./ButtonCard";
import GButton from "@/components/inputs/button/GButton";
import DataDisplayBar from "@/components/data-display/DataDisplayBar";
import contractAPI from "@/api/contract";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { showSnackbar } from "@/lib/features/snackbarSlice";
import {
  getTenderBuildingAddress,
  getTenderById,
  setTenderStatus,
} from "@/lib/features/tenderSlice";
import { Facility } from "@/screens/real-estate-owner/facilities/facility-overview/types";
import { TenderApplication } from "@/screens/real-estate-owner/tenders/tender-overview/types";
import {
  formatWorkDates,
  getOrigin,
} from "@/screens/real-estate-owner/tenders/tender-overview/utils";
import { ROUTES } from "@/utils/routes";
import { DOCUMENT_TYPE, TenderStatusEnum } from "@/utils/enums";
import { formatDistance, getDistanceKm } from "@/utils/distance";
import logger from "@/utils/Logger";

interface OfferOverviewProps {
  offerID: string;
  tenderID: string;
}

const OfferOverview: React.FC<OfferOverviewProps> = ({ offerID, tenderID }) => {
  const [application, setApplication] = useState<TenderApplication | null>(
    null
  );
  const [distance, setDistance] = useState<string>();
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const tender = useAppSelector(getTenderById(tenderID));
  const buildingAddress = useAppSelector(getTenderBuildingAddress(tenderID));
  const { facilities } = useAppSelector((state) => state.facility);
  const subcategory = facilities.find(
    (facility: Facility) => facility.id === tender?.facility?.id
  )?.subcategory;

  useEffect(() => {
    // Leaving the page before the offer arrived must not set state.
    let isActive = true;
    const fetchApplication = async (): Promise<void> => {
      try {
        const response = await contractAPI.getApplicationsForContract(tenderID);
        if (!isActive) return;
        setApplication(response.data.find(({ id }) => id === offerID) ?? null);
      } catch (error) {
        logger.error("Failed to fetch offer", error);
      } finally {
        if (isActive) setLoading(false);
      }
    };
    fetchApplication();
    return () => {
      isActive = false;
    };
  }, [tenderID, offerID]);

  useEffect(() => {
    const origin =
      application && buildingAddress
        ? getOrigin(application, buildingAddress.country)
        : null;
    if (!origin || !buildingAddress) return;
    let isActive = true;
    getDistanceKm(origin, buildingAddress)
      .then((km) => isActive && setDistance(formatDistance(km)))
      .catch((error) => logger.error("Failed to calculate distance", error));
    return () => {
      isActive = false;
    };
  }, [application, buildingAddress]);

  const handleDecision = async (decision: OfferDecision): Promise<void> => {
    const isAccepted = decision === "accept";
    try {
      await (isAccepted
        ? contractAPI.acceptApplication(tenderID, offerID)
        : contractAPI.declineApplication(tenderID, offerID));
      setApplication((current) =>
        current ? { ...current, status: isAccepted } : current
      );
      if (isAccepted) {
        // The backend declines the other offers and activates the tender.
        dispatch(
          setTenderStatus({
            tenderId: tenderID,
            status: TenderStatusEnum.ACTIVE,
          })
        );
      }
      dispatch(
        showSnackbar({
          type: "success",
          message: isAccepted ? "Auftrag erteilt." : "Angebot abgelehnt.",
        })
      );
    } catch (error) {
      logger.error("Failed to update offer status", error);
      dispatch(
        showSnackbar({
          type: "error",
          message: "Die Entscheidung konnte nicht gespeichert werden.",
        })
      );
    }
  };

  if (loading) {
    return (
      <Box sx={{ p: 4, textAlign: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!application) {
    return (
      <Typography variant="bodylr" color="text.secondary" sx={{ p: 2 }}>
        Angebot nicht gefunden
      </Typography>
    );
  }

  const documents = application.documents ?? [];
  const offerDocument = documents.find(
    ({ documentType }) => documentType === DOCUMENT_TYPE.OFFER_DOCUMENTS
  );
  const location = application.city || application.companyAddress?.city;

  return (
    <>
      <DataDisplayBar
        title={tender?.tenderType}
        subTitle={subcategory || tender?.facility?.name}
        companyName={application.companyName}
        officeAddress={location}
      />

      <Box sx={{ px: 2, mt: 2 }}>
        <GButton
          color="gprimary"
          variant="outlined"
          onClick={() =>
            router.push(ROUTES.REAL_ESTATE.TENDER.TENDER_DETAILS(tenderID))
          }
        >
          Zurück
        </GButton>
      </Box>
      <Grid container spacing={3} sx={{ mt: 1, px: 2, width: "100%", mb: 2 }}>
        <Grid item xs={12} md={5}>
          <Box sx={{ height: "100%" }}>
            <PDFViewer documentKey={offerDocument?.key} />
          </Box>
        </Grid>
        <Grid item xs={12} md={5}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <OfferCard
              companyName={application.companyName ?? ""}
              location={location ?? ""}
              documents={documents}
            />
            {application.message && (
              <MessageCard message={application.message} />
            )}
            <BenefitSpecialServiceCard
              price={application.serviceTotalPrice}
              workDates={formatWorkDates(application.suggestionWorkDates)}
              distance={distance}
              specialServices={application.benefitsSpecialServices}
            />
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
            <ButtonCard status={application.status} onDecide={handleDecision} />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default OfferOverview;
