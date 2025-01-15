import React, { useEffect, useState } from "react";
import SectionTitle from "@/components/label/SectionTitle";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import StatisticsItem from "@/components/label/StatisticsItem";
import ProjectCard from "./ProjectCard";
import UserCard from "./UserCard";
import DividerDecorator from "@/components/divider/DividerDecorator";
import { useAppSelector } from "@/lib/hooks";
import { Tender, BuildingTenders } from "../../tenders/tender_card/types";
import { TenderStatusEnum } from "@/utils/enums";

const OverviewPanel = (): JSX.Element => {
  const tenders = useAppSelector((state) => state.tender.tenders);
  const [totalOpenTenders, setTotalOpenTenders] = useState<number>(0);
  const [totalActiveTenders, setTotalActiveTenders] = useState<number>(0);

  useEffect(() => {
    getDashboardTenderNumbers();
  }, []);

  const getDashboardTenderNumbers = (): void => {
    let openTenders = 0;
    let activeTenders = 0;

    tenders?.map((building: BuildingTenders) => {
      building?.tenders?.map((tender: Tender) => {
        if (tender?.status === TenderStatusEnum.OPEN) {
          openTenders = openTenders + 1;
        }

        if (tender?.status === TenderStatusEnum.ACTIVE) {
          activeTenders = activeTenders + 1;
        }
      });
    });

    setTotalOpenTenders(openTenders);
    setTotalActiveTenders(activeTenders);
  };

  return (
    <>
      <SectionTitle
        text="Deine Übersicht"
        sx={{ color: "white", lineHeight: "1rem" }}
      />
      <DividerDecorator />
      <Box sx={styles.statsSection}>
        <StatisticsItem
          number={totalOpenTenders}
          color="#FECB00"
          text="offene Ausschreibungen"
        />
        <Divider orientation="vertical" flexItem sx={styles.dividerStats} />
        <StatisticsItem
          number={totalActiveTenders}
          text="laufende Ausschreibungen"
        />
      </Box>
      <SectionTitle
        text="Bald fällig"
        sx={{ color: "white", lineHeight: "1rem", mt: "2.5rem" }}
      />
      <ProjectCard
        address="Mittelstraße 129"
        code="BMA - 000237D"
        daysRemaining={14}
      />
      <ProjectCard
        address="Mittelstraße 129"
        code="BMA - 000237D"
        daysRemaining={14}
      />
      <ProjectCard
        address="Mittelstraße 129"
        code="BMA - 000237D"
        daysRemaining={14}
      />
      <SectionTitle
        text="Abgeschlossen"
        sx={{ color: "white", lineHeight: "1rem", mt: "2.5rem" }}
      />
      <UserCard
        name="Allan Jackson"
        designation="IT Specialist"
        numberOfRequests={11}
      />
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
