import React from 'react'
import SectionTitle from '@/components/label/SectionTitle'
import Box from "@mui/material/Box";
import DividerDecorator from '@/components/divider/DividerDecorator';
import JobCardList from './JobCardList';

const AssignmentsPanel = () => {
  return (
    <>
      <Box sx={styles.headerSection}>
        <Box>
          <SectionTitle
            text="Aufträge (20)"
          />
          <DividerDecorator sx={{bgcolor:'#2356FF'}} />
        </Box>
        <SectionTitle
            text="zur Übersicht"
            sx={{ color: "#22A7F1", lineHeight: "1.25rem", fontSize:'0.875rem' }}
          />
      </Box>
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