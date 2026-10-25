"use client";
import React, { memo, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { markOffersSeen } from "@/lib/features/seenOffersSlice";
import {
  getTenderBuildingAddress,
  getTenderById,
} from "@/lib/features/tenderSlice";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TenderSummarySection from "./TenderSummarySection";
import TenderApplications from "./TenderApplications";
import { Facility } from "@/screens/real-estate-owner/facilities/facility-overview/types";
import DataDisplayBar from "@/components/data-display/DataDisplayBar";

interface TenderDetailsProps {
  tenderId: string;
}

const TenderDetails: React.FC<TenderDetailsProps> = ({ tenderId }) => {
  // Fetch tender details by ID
  const dispatch = useAppDispatch();
  const tender = useAppSelector(getTenderById(tenderId));
  const offerCount = tender?.applicationIds?.length ?? 0;

  // Opening the tender shows its offers, so they are no longer new.
  useEffect(() => {
    if (tender) dispatch(markOffersSeen({ tenderId, count: offerCount }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tender?.id, offerCount]);
  const buildingAddress = useAppSelector(getTenderBuildingAddress(tenderId));
  const { facilities } = useAppSelector((state) => state.facility);
  const subcategory = facilities.find(
    (facility: Facility) => facility.id === tender?.facility?.id
  )?.subcategory;

  return (
    <Grid container component="main">
      <DataDisplayBar
        title={tender?.tenderType}
        subTitle={subcategory || tender?.facility.name}
      />
      <Grid container spacing={2} mx={1} columns={18}>
        <Grid item xs={8}>
          <Paper sx={{ maxWidth: "false", width: "100%", p: "1.25rem" }}>
            <TenderSummarySection
              tender={tender}
              buildingAddress={buildingAddress}
            />
          </Paper>
        </Grid>
        <Grid item xs={8}>
          <TenderApplications
            tenderId={tenderId}
            buildingAddress={buildingAddress}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default memo(TenderDetails);
