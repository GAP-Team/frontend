import React from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import TenderHeader from "./TenderHeader";
import { BuildingTenders } from "./types";
import TenderItems from "./TenderItems";

interface TendersContainerProps {
  buildings: BuildingTenders[];
}

const TendersContainer: React.FC<TendersContainerProps> = ({ buildings }) => {
  return (
    <Box sx={styles.listContainer}>
      {buildings.map(
        (building) =>
          building?.tenders?.length > 0 && (
            <>
              <TenderHeader
                buildingName={building.buildingName}
                buildingAdress={building.buildingAdress}
              />
              <TenderItems building={building} />
              <Divider variant="middle" orientation="horizontal" flexItem />
            </>
          )
      )}
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
