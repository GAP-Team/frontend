import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { buildingAdress } from "./types";

interface TenderHeaderProps {
  buildingName: string;
  buildingAdress: buildingAdress;
}

const TenderHeader: React.FC<TenderHeaderProps> = ({
  buildingName,
  buildingAdress,
}) => {
  return (
    <Box sx={{ display: "flex", pb: "0.5rem" }}>
      <Typography variant="bodylsb">{buildingName} - &nbsp;</Typography>
      <Typography variant="bodylr">
        {buildingAdress?.street} {buildingAdress?.houseNumber},{" "}
        {buildingAdress?.zip} {buildingAdress?.city}
      </Typography>
    </Box>
  );
};

export default TenderHeader;
