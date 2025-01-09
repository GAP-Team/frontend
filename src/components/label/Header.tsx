import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { buildingAdress } from "../../screens/dashboard/tenders/tender_card/types";

interface TenderHeaderProps {
  buildingName: string;
  buildingAdress: {
    city: string;
    country: string;
    houseNumber: number;
    street: string;
    zip: number;
  };
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
