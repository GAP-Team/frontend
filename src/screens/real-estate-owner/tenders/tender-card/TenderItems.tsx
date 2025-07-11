import React from "react";
import TenderCard from "../../dashboard/tenders-panel/TenderCard";
import Grid from "@mui/material/Grid";
import { BuildingTenders } from "./types";

interface TenderItemsProps {
  building: BuildingTenders;
}

const TenderItems: React.FC<TenderItemsProps> = ({ building }) => {
  return (
    <Grid container spacing={"1.25rem"} sx={{ overflow: "auto", flexGrow: 1 }}>
      {building.tenders.map((tender, index) => (
        <Grid item key={index}>
          <TenderCard
            key={index}
            tender={tender}
            buildingName={building.buildingName}
            buildingAddress={building.buildingAddress}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default TenderItems;
