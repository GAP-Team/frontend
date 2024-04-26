import React from 'react'
import SectionTitle from '@/components/label/SectionTitle'
import Box from "@mui/material/Box";
import DividerDecorator from '@/components/divider/DividerDecorator';
import HeaderSection from '../HeaderSection';
import ApplicationList from './ApplicationList';
import { applications } from '@/utils/Constants';

const ApplicationsPanel = () => {
  return (
    <>
      <HeaderSection titletext='NEUE BEWERBUNGEN' count={7} overviewText='Alle anzeigen' />
      <ApplicationList applications={applications}/>
    </>
  );
}

export default ApplicationsPanel;

// Styles