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
import dayjs from "dayjs";
import { Facility } from "../../facilities/facility_card/types";
import { Building } from "../../buildings/building_card/types";
import { truncateLabel } from "@/utils/utils";

const OverviewPanel = (): JSX.Element => {
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

  const filterTendersByDays = (
    tenders: Tender[],
    facilities: Facility[],
    condition: (daysUntilCheck: number) => boolean
  ): Tender[] => {
    return tenders?.filter((tender: Tender) => {
      const facility = facilities.find((f) => f.id === tender.facility?.id);
      const lastCheckDate = dayjs(facility?.check?.lastCheckDate);
      const nextCheckDate = lastCheckDate.add(
        Number(facility?.check?.nextCheckInYearNumber),
        "year"
      );
      const daysUntilCheck = nextCheckDate.diff(dayjs(), "day");
      return condition(daysUntilCheck);
    });
  };

  const tendersDueSoon = filterTendersByDays(
    tenders,
    facilities,
    (daysUntilCheck) => daysUntilCheck < 183
  );
  const tendersExceedingDays = filterTendersByDays(
    tenders,
    facilities,
    (daysUntilCheck) => daysUntilCheck > 183
  );

  const renderTenderCards = (tendersList: Tender[]): React.ReactNode =>
    tendersList?.map((tender, index) => {
      const facility = facilities.find(
        (f: Facility) => f.id === tender.facility?.id
      );
      const lastCheckDate = dayjs(facility?.check?.lastCheckDate);
      const nextCheckDate = lastCheckDate.add(
        facility?.check?.nextCheckInYearNumber,
        "year"
      );
      const daysRemaining = nextCheckDate.diff(dayjs(), "days");
      const buildingAddress = buildings.find(
        (b: Building) => b.id === tender.building?.id
      )?.address;
      return (
        <ProjectCard
          key={index}
          address={
            `${buildingAddress?.houseNumber} ${buildingAddress?.street} - ${buildingAddress?.city}, ${buildingAddress?.state}` ||
            "N/A"
          }
          code={truncateLabel(tender?.tenderType, 10) || "N/A"}
          daysRemaining={daysRemaining}
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
      {renderTenderCards(tendersDueSoon)}

      <SectionTitle
        text="Frist abgelaufen"
        sx={{ color: "white", lineHeight: "1rem", mt: "2.5rem" }}
      />
      {renderTenderCards(tendersExceedingDays)}
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
