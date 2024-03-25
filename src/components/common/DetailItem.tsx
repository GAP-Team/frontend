import React from 'react';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

interface DetailItemProps {
    label: string;
    value: string;
  }
  
 const DetailItem: React.FC<DetailItemProps> = ({ label, value }) => {
    const theme = useTheme();
    return (
      <Typography variant="gsub1">
        {label}:{' '}
        <span style={{ color: theme.palette.gprimary.main, fontWeight: '600' }}>
          {value}
        </span>
      </Typography>
    );
  };

export default DetailItem;