import React from 'react'
import SectionTitle from '@/components/label/SectionTitle'
import Box from "@mui/material/Box";
import Typography from '@mui/material/Typography';
import Divider from "@mui/material/Divider";
import StatisticsItem from "@/components/label/StatisticsItem";
import ProjectCard from './ProjectCard';
import UserCard from './UserCard';
import DividerDecorator from '@/components/divider/DividerDecorator';

const OverviewPanel = () => {
  return (
    <>
      <SectionTitle
        text="Deine Übersicht"
        sx={{ color: "white", lineHeight: "1rem" }}
      />
      <DividerDecorator />
      <Box sx={styles.statsSection}>
        <StatisticsItem number="3" text="aktive Ausschreibung" />
        <Divider orientation="vertical" flexItem sx={styles.dividerStats} />
        <StatisticsItem number="11" text="laufende Projekte" />
      </Box>
      <SectionTitle
        text="Bald fällig"
        sx={{ color: "white", lineHeight: "1rem", mt: '2.5rem' }}
      />
      <ProjectCard address='Mittelstraße 129' code='BMA - 000237D' daysRemaining={14} />
      <ProjectCard address='Mittelstraße 129' code='BMA - 000237D' daysRemaining={14} />
      <ProjectCard address='Mittelstraße 129' code='BMA - 000237D' daysRemaining={14} />
      <SectionTitle
        text="Abgeschlossen"
        sx={{ color: "white", lineHeight: "1rem", mt: '2.5rem' }}
      />
      <UserCard name="Allan Jackson" designation='IT Specialist' numberOfRequests={11}/>
    </>
  );
}

export default OverviewPanel;

// Styles
const styles = {
  statsSection: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    p: '1rem'
  },
  dividerStats: {
    mx: 2,
    height: "auto",
    bgcolor: 'white'
  },
};