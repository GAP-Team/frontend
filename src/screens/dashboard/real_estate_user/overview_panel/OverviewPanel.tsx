import React, { useEffect } from "react";
import SectionTitle from "@/components/label/SectionTitle";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import StatisticsItem from "@/components/label/StatisticsItem";
import ProjectCard from "./ProjectCard";
import DividerDecorator from "@/components/divider/DividerDecorator";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Tender } from "../../tenders/tender_card/types";
import { TenderStatusEnum } from "@/utils/enums";
import { getFacilitiesByUser } from "@/lib/features/facilitySlice";
import { Facility } from "../../facilities/facility_card/types";
import { Building } from "../../buildings/building_card/types";
import { truncateLabel } from "@/utils/utils";
import { DashboardComponentsProps } from "@/utils/Constants";
import {
  getFacilityCheckTimeRemaining,
  getFacilityMaintenanceTimeRemaining,
} from "../../facilities/utils";

const OverviewPanel: React.FC<DashboardComponentsProps> = (): JSX.Element => {
  const tenders = useAppSelector((state) => state.tender.tenderList);
  const facilities = useAppSelector((state) => state.facility.facilities);
  const buildings = useAppSelector((state) => state.building.buildings);
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

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
      getFacilityCheckTimeRemaining(facility, "days") < 183 &&
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
        getFacilityMaintenanceTimeRemaining(facility, "days") < 15 &&
        getFacilityMaintenanceTimeRemaining(facility, "days") > 0
      );
    }
  );

  const facilitiesMaintenanceExceedingDays = facilities?.filter(
    (facility: Facility) => {
      return getFacilityMaintenanceTimeRemaining(facility, "days") <= 0;
    }
  );

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
          address={`${buildingAddress?.street} - ${buildingAddress?.city}, ${buildingAddress?.state}`}
          code={truncateLabel(facility?.subcategory, 10)}
          daysRemaining={daysRemaining}
          text={daysRemaining >= 0 ? "Tage" : "Tage übrig"}
          warning={warning}
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
        <StatisticsItem
          number={openTenders}
          color="#FECB00"
          text="offene Ausschreibungen"
        />
        <Divider orientation="vertical" flexItem sx={styles.dividerStats} />
        <StatisticsItem number={activeTender} text="laufende Ausschreibungen" />
      </Box>
      <SectionTitle
        text="Bald fällig"
        sx={{ color: "white", lineHeight: "1rem", mt: "2.5rem" }}
      />
      {renderFacilityCards(facilitiesCheckDueSoon, true, false)}
      {renderFacilityCards(facilitiesMaintenanceDueSoon, true, true)}
      <SectionTitle
        text="Frist abgelaufen"
        sx={{ color: "white", lineHeight: "1rem", mt: "2.5rem" }}
      />
      {renderFacilityCards(facilitiesCheckExceedingDays, false, false)}
      {renderFacilityCards(facilitiesMaintenanceExceedingDays, false, true)}
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
