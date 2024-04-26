import React from 'react';
import { Box, Divider } from '@mui/material';
import SectionTitle from '@/components/label/SectionTitle'; // Ensure this import path is correct
import DividerDecorator from '@/components/divider/DividerDecorator'; // Ensure this import path is correct

interface HeaderSectionProps {
  count: number;
  titletext: string;  
  overviewText: string;
}

const HeaderSection: React.FC<HeaderSectionProps> = ({
  count,
  titletext,
  overviewText,
}) => {
  return (
    <>
      <Box sx={styles.headerSection}>
        <Box>
          <SectionTitle
            text={`${titletext} (${count})`}
          />
          <DividerDecorator sx={{bgcolor:'#2356FF'}} />
        </Box>
        <SectionTitle
            text={overviewText}
            sx={{ color: "#22A7F1", lineHeight: "1.25rem", fontSize:'0.875rem' }}
          />
      </Box>
    </>
  );
}

export default HeaderSection;

// Ensure to define or import these styles as needed
const styles = {
  headerSection: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    // Additional styling as needed
  }
};
