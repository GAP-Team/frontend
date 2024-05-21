import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { styled, useTheme } from '@mui/material/styles';
import SummaryCard from '@/components/summary/SummaryCard';
import { FaRegEdit } from 'react-icons/fa';
import DetailItem from '../common/DetailItem';
export interface Detail {
  label: string;
  value: string;
}

const EditIcon = styled(FaRegEdit)({
    color: 'grey',
    fontSize: '1rem',
    marginBottom: 2,
    cursor: 'pointer',
});
  
const SummarySection: React.FC<{ title: string; details: Detail[]; setActiveStep: any; }> = ({ title, details, setActiveStep }) => {
    return (
      <>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography color="grey.500" variant="gsub">
            {title}
          </Typography>
          <EditIcon onClick={setActiveStep} />
        </Box>
        <SummaryCard>
          {details.map((detail, index) => (
            <DetailItem key={index} label={detail.label} value={detail.value} />
          ))}
        </SummaryCard>
      </>
    );
};
  
export default SummarySection;