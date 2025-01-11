import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { BuildingAddress } from "@/screens/dashboard/buildings/building_card/types";
interface HeaderProps {
  buildingName: string;
  buildingAddress: BuildingAddress;
}

const OverviewHeader: React.FC<HeaderProps> = ({
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

export default OverviewHeader;
