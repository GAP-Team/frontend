// HeroBanner.tsx
import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface HeroBannerProps {
  title: string;
  subtitle: string;
  copyright: string;
}

const InfoBanner: React.FC<HeroBannerProps> = ({ title, subtitle, copyright }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%', // Take full height of the parent component
      }}
    >
      {/* Title Typography */}
      <Typography variant="h2" color="white" sx={{
        ml: '4rem',
        mt: '6.8rem',
        fontWeight: 'bold',
        fontSize: { xs: '3rem', md: '4.5rem' }, // Responsive font size
        lineHeight: { xs: '3.3rem', md: '4.8rem' }, // Responsive line height
        maxWidth: '80%',
      }}>
        {title}
      </Typography>

      {/* Subtitle Typography */}
      <Typography variant="subtitle1" color="white" sx={{
        ml: '4rem',
        mt: '2rem',
        fontSize: '1.5rem',
        lineHeight: '2.2rem',
      }}>
        {subtitle}
      </Typography>

      {/* Spacer to push the copyright notice to the bottom */}
      <Box sx={{ flexGrow: 1 }} />

      {/* Copyright Typography - sticks to the bottom */}
      <Typography variant="subtitle1" color="white" sx={{
        ml: '4rem',
        mb: '2rem', // Add bottom margin if needed
      }}>
        {copyright}
      </Typography>
    </Box>
  );
};

export default InfoBanner;
