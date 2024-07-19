import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

interface TenderHeaderProps {
  code: string;
  address: string;
}

const TenderHeader: React.FC<TenderHeaderProps> = ({ code, address }) => {
  return (
    <Box sx={{ display: "flex", pb:'0.5rem' }}>
      <Typography variant="bodylsb">{code} - &nbsp;</Typography>
      <Typography variant="bodylr">{address}</Typography>
    </Box>
  );
};

export default TenderHeader;
