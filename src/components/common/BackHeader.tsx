// BackHeader.tsx
import React from 'react';
import { Button, Typography, SxProps, Theme } from '@mui/material';
import { MdArrowBackIos } from 'react-icons/md';


interface BackHeaderStyles {
    button?: SxProps<Theme>;  // Optional styles for the button
    header?: SxProps<Theme>;  // Optional styles for the header
  }
  
  interface BackHeaderProps {
    onBackClick: () => void;
    title: string;
    sx?: BackHeaderStyles;
  }

const BackHeader: React.FC<BackHeaderProps> = ({ onBackClick, title, sx }) => {
  return (
    <>
      <Button
        variant="text"
        sx={{
          display: "flex",
          fontSize: "0.875rem",
          fontWeight: "600",
          alignItems: "center",
          marginLeft: "3.75rem",
          marginTop: "2.5rem",
          color: "#8D999C",
          ...sx?.button
        }}
        onClick={onBackClick}
      >
        <MdArrowBackIos />
        Zurück
      </Button>
      <Typography
        variant="h3"
        sx={{
          fontSize: "2rem",
          lineHeight: "2.5rem",
          fontWeight: "700",
          marginLeft: "3.75rem",
          my: "2rem",
          ...sx?.header
        }}
      >
        {title}
      </Typography>
    </>
  );
};

export default BackHeader;
