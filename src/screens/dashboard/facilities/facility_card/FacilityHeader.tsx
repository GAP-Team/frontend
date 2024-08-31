import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

interface FacilityHeaderProps {
  code: string;
  address: string;
}

const FacilityHeader: React.FC<FacilityHeaderProps> = ({ code, address }) => {
  return (
    <Box sx={{ display: "flex", pb: "0.5rem" }}>
      <Typography variant="bodylsb">{code} - &nbsp;</Typography>
      <Typography variant="bodylr">{address}</Typography>
    </Box>
  );
};

export default FacilityHeader;
