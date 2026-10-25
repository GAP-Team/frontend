"use client";

import React, { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import contractAPI from "@/api/contract";
import { useAppDispatch } from "@/lib/hooks";
import { markOffersSeen } from "@/lib/features/seenOffersSlice";
import logger from "@/utils/Logger";
import ApplicationCard from "./ApplicationCard";
import { SuggestionWorkDate, Tender, TenderApplication } from "./types";
import { BuildingAddress } from "@/screens/real-estate-owner/buildings/building-overview/types";
import { formatDistance, getDistanceKm, PostalAddress } from "@/utils/distance";

interface TenderApplicationsProps {
  tenderId: string;
  buildingAddress?: BuildingAddress;
  tender?: Tender | null;
}

const formatDate = (date: string): string =>
  new Date(date).toLocaleDateString("de-DE");

// A suggestion is either a single day or a period (date - endDate).
const formatWorkDates = (workDates: SuggestionWorkDate[] = []): string =>
  workDates
    .filter(({ date }) => date)
    .map(({ date, endDate }) =>
      endDate
        ? `${formatDate(date as string)} - ${formatDate(endDate)}`
        : formatDate(date as string)
    )
    .join(", ");

// Dates the owner asked for in the tender; shown when a provider gave none.
const getOwnerDates = (tender?: Tender | null): string =>
  tender?.fromDate
    ? formatWorkDates([
        {
          date: String(tender.fromDate),
          endDate: tender.toDate && String(tender.toDate),
        },
      ])
    : "";

// The departure point submitted with the application wins over the registered
// company address, because it is also the location shown on the card.
const getOrigin = (
  application: TenderApplication,
  country: string
): PostalAddress | null => {
  const { zip, city, companyAddress } = application;
  if (city) {
    return { zip, city, country };
  }
  return companyAddress
    ? { ...companyAddress, houseNumber: companyAddress.houseNo }
    : null;
};

const TenderApplications: React.FC<TenderApplicationsProps> = ({
  tenderId,
  buildingAddress,
  tender,
}) => {
  const [applications, setApplications] = useState<TenderApplication[]>([]);
  const [distances, setDistances] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Leaving the page before the offers arrived means they were not shown.
    let isActive = true;
    const fetchApplications = async (): Promise<void> => {
      try {
        const response = await contractAPI.getApplicationsForContract(tenderId);
        if (!isActive) return;
        setApplications(response.data);
        // Only offers that were loaded and are displayed count as seen.
        dispatch(
          markOffersSeen({ tenderId, count: response.data?.length ?? 0 })
        );
      } catch (error) {
        logger.error("Failed to fetch tender applications", error);
      } finally {
        if (isActive) setLoading(false);
      }
    };
    fetchApplications();
    return () => {
      isActive = false;
    };
  }, [tenderId, dispatch]);

  useEffect(() => {
    if (!buildingAddress) {
      return;
    }
    const fetchDistances = async (): Promise<void> => {
      const entries = await Promise.all(
        applications.map(async (application) => {
          const origin = getOrigin(application, buildingAddress.country);
          if (!origin) {
            return null;
          }
          try {
            const km = await getDistanceKm(origin, buildingAddress);
            return [application.id, formatDistance(km)] as const;
          } catch (error) {
            logger.error("Failed to calculate distance", error);
            return null;
          }
        })
      );
      setDistances(
        Object.fromEntries(entries.filter((entry) => entry !== null))
      );
    };
    fetchDistances();
  }, [applications, buildingAddress]);

  if (loading) {
    return (
      <ApplicationCard
        loading
        offerID=""
        tenderID={tenderId}
        companyName=""
        location=""
        price=""
        specialServices={0}
      />
    );
  }

  if (applications.length === 0) {
    return (
      <Typography variant="bodylr" color="text.secondary">
        Noch keine Bewerbungen vorhanden
      </Typography>
    );
  }

  return (
    <Stack spacing={2}>
      {applications.map((application) => (
        <ApplicationCard
          key={application.id}
          offerID={application.id}
          tenderID={tenderId}
          companyName={application.companyName ?? ""}
          location={application.city || application.companyAddress?.city || ""}
          price={`${application.serviceTotalPrice} €`}
          distance={distances[application.id]}
          workDates={formatWorkDates(application.suggestionWorkDates)}
          ownerDates={getOwnerDates(tender)}
          specialServices={application.benefitsSpecialServices.length}
          employees={application.numberOfEmployees}
        />
      ))}
    </Stack>
  );
};

export default TenderApplications;
