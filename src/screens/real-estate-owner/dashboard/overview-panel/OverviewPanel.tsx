"use client";
import React, { useEffect } from "react";
import SectionTitle from "@/components/data-display/label/SectionTitle";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import StatisticDisplay from "@/components/data-display/StatisticDisplay";
import ProjectCard from "./ProjectCard";
import DividerDecorator from "@/components/data-display/divider/DividerDecorator";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Tender } from "@/screens/real-estate-owner/tenders/tender-card/types";
import { TenderStatusEnum } from "@/utils/enums";
import { getFacilitiesByUser } from "@/lib/features/facilitySlice";
import { Facility } from "@/screens/real-estate-owner/facilities/facility-overview/types";
import {
  Building,
  BuildingAddress,
} from "@/screens/real-estate-owner/buildings/building-overview/types";
import { truncateLabel } from "@/utils/utils";
import {
  DashboardComponentsProps,
  CHECK_DUE_SOON_DAYS,
  MAINTENANCE_DUE_SOON_DAYS,
} from "@/utils/Constants";
import {
  getFacilityCheckTimeRemaining,
  getFacilityMaintenanceTimeRemaining,
} from "../../facilities/utils";
import GButton from "@/components/inputs/button/GButton";
import { ROUTES } from "@/utils/routes";
import { useRouter } from "next/navigation";

const OverviewPanel: React.FC<DashboardComponentsProps> = (): JSX.Element => {
  const tenders = useAppSelector((state) => state.tender.tenderList);
  const facilities = useAppSelector((state) => state.facility.facilities);
  const buildings = useAppSelector((state) => state.building.buildings);
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [activeFilter, setActiveFilter] = React.useState<
    "check" | "maintenance"
  >("check");
  const router = useRouter();

  const openTenders = tenders?.filter(
    (tender: Tender) => tender.status === TenderStatusEnum.OPEN
  ).length;
  const activeTender = tenders?.filter(
    (tender: Tender) => tender.status === TenderStatusEnum.ACTIVE
  ).length;

  useEffect(() => {
    if (user?.id) {
      dispatch(getFacilitiesByUser(user.id));
    }
  }, [user?.id, dispatch]);

  const facilitiesCheckDueSoon = facilities?.filter((facility: Facility) => {
    return (
      getFacilityCheckTimeRemaining(facility, "days") < CHECK_DUE_SOON_DAYS &&
      getFacilityCheckTimeRemaining(facility, "days") > 0
    );
  });

  const facilitiesCheckExceedingDays = facilities?.filter(
    (facility: Facility) => {
      return getFacilityCheckTimeRemaining(facility, "days") <= 0;
    }
  );

  const facilitiesMaintenanceDueSoon = facilities?.filter(
    (facility: Facility) => {
      return (
        getFacilityMaintenanceTimeRemaining(facility, "days") <
          MAINTENANCE_DUE_SOON_DAYS &&
        getFacilityMaintenanceTimeRemaining(facility, "days") > 0
      );
    }
  );

  const facilitiesMaintenanceExceedingDays = facilities?.filter(
    (facility: Facility) => {
      return getFacilityMaintenanceTimeRemaining(facility, "days") <= 0;
    }
  );

  const handleCardClick = (
    facility: Facility,
    address: BuildingAddress
  ): void => {
    const queryParams = new URLSearchParams({
      facilityId: facility.id,
      city: address.city,
      state: address.state,
      facilityType: facility.facilityType,
    });

    router.push(
      `${ROUTES.REAL_ESTATE.FACILITY.FACILITIES}?${queryParams.toString()}`
    );
  };

  const renderFacilityCards = (
    facilityList: Facility[],
    warning: boolean = false,
    isMaintenanceCheck: boolean = false
  ): React.ReactNode =>
    facilityList?.map((facility, index) => {
      const daysRemaining = isMaintenanceCheck
        ? getFacilityMaintenanceTimeRemaining(facility, "days")
        : getFacilityCheckTimeRemaining(facility, "days");

      const buildingAddress = buildings.find(
        (building: Building) => building.id === facility.buildingId
      )?.address;

      return (
        <ProjectCard
          key={index}
          address={`${buildingAddress?.street} - ${buildingAddress?.city}`}
          code={truncateLabel(facility?.subcategory, 10)}
          daysRemaining={daysRemaining}
          text={
            daysRemaining > 1 && warning
              ? "Tag(e) übrig"
              : warning
                ? "Tag(e) übrig"
                : "Tag(e) abgelaufen"
          }
          warning={warning}
          onClick={() => handleCardClick(facility, buildingAddress)}
        />
      );
    });

  return (
    <>
      <SectionTitle
        text="Deine Übersicht"
        sx={{ color: "white", lineHeight: "1rem" }}
      />
      <DividerDecorator />
      <Box sx={styles.statsSection}>
        <StatisticDisplay
          number={openTenders}
          color="#FECB00"
          text="offene Ausschreibungen"
        />
        <Divider orientation="vertical" flexItem sx={styles.dividerStats} />
        <StatisticDisplay
          number={activeTender}
          text="laufende Ausschreibungen"
        />
      </Box>
      <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
        <GButton
          variant={activeFilter === "check" ? "contained" : "outlined"}
          onClick={() => setActiveFilter("check")}
        >
          Prüfung
        </GButton>
        <GButton
          variant={activeFilter === "maintenance" ? "contained" : "outlined"}
          onClick={() => setActiveFilter("maintenance")}
        >
          Wartung
        </GButton>
      </Box>
      <SectionTitle
        text="Bald fällig"
        sx={{ color: "white", lineHeight: "1rem", mt: "2.5rem" }}
      />
      {activeFilter === "check" &&
        renderFacilityCards(facilitiesCheckDueSoon, true, false)}
      {activeFilter === "maintenance" &&
        renderFacilityCards(facilitiesMaintenanceDueSoon, true, true)}
      <SectionTitle
        text="Frist abgelaufen"
        sx={{ color: "white", lineHeight: "1rem", mt: "2.5rem" }}
      />
      {activeFilter === "check" &&
        renderFacilityCards(facilitiesCheckExceedingDays, false, false)}
      {activeFilter === "maintenance" &&
        renderFacilityCards(facilitiesMaintenanceExceedingDays, false, true)}
    </>
  );
};

export default OverviewPanel;

// Styles
const styles = {
  statsSection: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    p: "1rem",
  },
  dividerStats: {
    mx: 2,
    height: "auto",
    bgcolor: "white",
  },
};
