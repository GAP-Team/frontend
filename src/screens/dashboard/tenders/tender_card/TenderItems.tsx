import React from "react";
import TenderCard from "../../real_estate_user/tenders_panel/TenderCard";
import Grid from "@mui/material/Grid";
import { Tender } from "./types";

interface TenderItemsProps {
  tenders: Tender[];
}

const TenderItems: React.FC<TenderItemsProps> = ({ tenders }) => {
  return (
    <Grid container spacing={"1.25rem"} sx={{ overflow: "auto", flexGrow: 1 }}>
      {tenders.map((tender, index) => (
        <Grid item key={index}>
          <TenderCard key={index} tender={tender} />
        </Grid>
      ))}
    </Grid>
  );
};

export default TenderItems;
