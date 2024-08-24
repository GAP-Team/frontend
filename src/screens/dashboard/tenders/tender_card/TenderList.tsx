import React from "react";
import JobCard from "../../real_estate_user/assignments_panel/JobCard";
import Box from "@mui/material/Box";
import { TenderProps } from "./types";
import Divider from "@mui/material/Divider";
import TenderItems from "./TenderItems";
import TenderHeader from "./TenderHeader";

interface TenderListProps {
  tenders: TenderProps[];
}

const TenderList: React.FC<TenderListProps> = ({ tenders }) => {
  return (
    <Box sx={styles.listContainer}>
      <TenderHeader code="F004" address="Mittelstraße 401, 37292 Essen" />
      <TenderItems tenders={tenders} />
      <Divider variant="middle" orientation="horizontal" flexItem />

      <TenderHeader code="F003" address="Mittelstraße 401, 66125 Saarbrucken" />
      <TenderItems tenders={tenders} />
      <Divider variant="middle" orientation="horizontal" flexItem />
    </Box>
  );
};

export default TenderList;
// Styles
const styles = {
  listContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "1.25rem",
    paddingBottom: "0.65rem",
    px: "1.5rem",
    pt: "1.5rem",
    overflowX: "auto",
  },
};
