import React from 'react'
import SectionTitle from '@/components/label/SectionTitle'
import Box from "@mui/material/Box";
import DividerDecorator from '@/components/divider/DividerDecorator';
import HeaderSection from '../HeaderSection';
// import JobCardList from './JobCardList';

const ApplicationsPanel = () => {
  return (
    <>
      <HeaderSection titletext='NEUE BEWERBUNGEN' count={7} overviewText='Alle anzeigen'/>
    </>
  );
}

export default ApplicationsPanel;

// Styles