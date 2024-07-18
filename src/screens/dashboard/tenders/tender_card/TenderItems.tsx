import React from "react";
import JobCard from "../../real_estate_user/assignments_panel/JobCard";
import Grid from "@mui/material/Grid";
import { TenderProps } from "./types";

interface TenderItemsProps {
  tenders: TenderProps[];
}

const TenderItems: React.FC<TenderItemsProps> = ({ tenders }) => {
  return (
    <Grid
      container
      spacing={"1.25rem"}
      sx={{ overflow: "auto", flexGrow: 1 }}
    >
      {tenders.map((data, index) => (
        <Grid item key={index} >
          <JobCard key={index} {...data} />
        </Grid>
      ))}
    </Grid>
  );
};

export default TenderItems;
