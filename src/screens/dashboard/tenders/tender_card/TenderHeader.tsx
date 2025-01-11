import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { buildingAddress } from "./types";

interface TenderHeaderProps {
  buildingName: string;
  buildingAddress: buildingAddress;
}

const TenderHeader: React.FC<TenderHeaderProps> = ({
  buildingName,
  buildingAddress,
}) => {
  return (
    <Box sx={{ display: "flex", pb: "0.5rem" }}>
      <Typography variant="bodylsb">{buildingName} - &nbsp;</Typography>
      <Typography variant="bodylr">
        {buildingAddress?.street} {buildingAddress?.houseNumber},{" "}
        {buildingAddress?.zip} {buildingAddress?.city}
      </Typography>
    </Box>
  );
};

export default TenderHeader;
