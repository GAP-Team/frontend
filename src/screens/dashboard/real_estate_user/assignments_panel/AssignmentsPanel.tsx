import React from 'react'
import SectionTitle from '@/components/label/SectionTitle'
import Box from "@mui/material/Box";
import DividerDecorator from '@/components/divider/DividerDecorator';
import JobCardList from './JobCardList';
import HeaderSection from '../HeaderSection';

const AssignmentsPanel = () => {
  return (
    <>
     <HeaderSection titletext='Aufträge' count={20} overviewText='zur Übersicht' />
     <JobCardList/>
    </>
  );
}

export default AssignmentsPanel;

// Styles
const styles = {
  headerSection: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
};