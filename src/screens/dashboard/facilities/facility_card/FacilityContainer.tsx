import { Box, Divider } from "@mui/material";
import React from "react";
import FacilityItems from "./FacilityItems";
import { Building } from "../../buildings/building_card/types";
import Header from "@/components/label/Header";

interface FacilityListProps {
  buildings: Building[];
}

const FacilityContainer: React.FC<FacilityListProps> = ({ buildings }) => {
 
  return (
    <Box sx={styles.listContainer}>
      {buildings.map(
        (building) =>
          building?.facilityIds?.length > 0 && (
            <>
              <Header
                buildingName={building.buildingName}
                buildingAdress={building.address}
              />
              <FacilityItems buildingId={building.id} />
              <Divider variant="middle" orientation="horizontal" flexItem />
            </>
          )
      )}
    </Box>
  );
};

export default FacilityContainer;

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
