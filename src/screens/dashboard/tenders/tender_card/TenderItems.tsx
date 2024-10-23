import React from "react";
import TenderCard from "../../real_estate_user/tenders_panel/TenderCard";
import Grid from "@mui/material/Grid";
import { Buildings } from "./types";

interface TenderItemsProps {
  buildings: Buildings[];
}

const TenderItems: React.FC<TenderItemsProps> = ({ tenders }) => {
  return (
    <Grid container spacing={"1.25rem"} sx={{ overflow: "auto", flexGrow: 1 }}>
      {tenders.map((data, index) => (
        <Grid item key={index}>
          <TenderCard key={index} {...data} />
        </Grid>
      ))}
    </Grid>
  );
};

export default TenderItems;
