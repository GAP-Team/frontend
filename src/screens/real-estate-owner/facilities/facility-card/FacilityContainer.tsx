import { Box, Divider } from "@mui/material";
import React from "react";
import FacilityItems from "./FacilityItems";
import { Building } from "../../buildings/building-card/types";
import BuildingInfoHeader from "@/screens/real-estate-owner/buildings/building-card/BuildingInfoHeader";

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
              <BuildingInfoHeader
                buildingName={building.buildingName}
                buildingAddress={building.address}
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
