import React from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import TenderItems from "./TenderItems";
import TenderHeader from "./TenderHeader";
import { Building } from "./types";


interface TendersContainerProps {
  buildings: Building[]
}

const TendersContainer: React.FC<TendersContainerProps> = ({ buildings }) => {
  return (
    <Box sx={styles.listContainer}>
      {buildings.map((building, index) => (
        <>
    <TenderHeader buildingName={building.buidingName} buildingAdress={building.buildingAdress} />
    <TenderItems tenders={building.tenders} />
    <Divider variant="middle" orientation="horizontal" flexItem />
    </>
      ))}
    </Box>
  );
};

export default TendersContainer;
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
