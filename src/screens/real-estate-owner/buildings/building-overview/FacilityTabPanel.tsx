import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import GButton from "@/components/inputs/button/GButton";
import { ROUTES } from "@/utils/routes";
import { Facility } from "@/screens/real-estate-owner/facilities/facility-overview/types";
import FacilityRow from "./FacilityRow";

interface FacilityTabPanelProps {
  facilities: Facility[];
}

const FacilityTabPanel: React.FC<FacilityTabPanelProps> = ({ facilities }) => {
  return (
    <Box sx={styles.container}>
      <Box sx={styles.header}>
        <Typography variant="bodylsb">Anlagen dieses Gebäudes</Typography>
        <GButton href={ROUTES.REAL_ESTATE.FACILITY.ADD_FACILITY}>
          Anlage hinzufügen
        </GButton>
      </Box>
      {facilities.length > 0 ? (
        facilities.map((facility) => (
          <FacilityRow key={facility.id} facility={facility} />
        ))
      ) : (
        <Typography variant="bodymr" sx={styles.empty}>
          Für dieses Gebäude wurden noch keine Anlagen angelegt.
        </Typography>
      )}
    </Box>
  );
};

export default FacilityTabPanel;

// Styles
const styles = {
  container: {
    pt: "1rem",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    mb: "1rem",
  },
  empty: {
    color: "#8D999C",
  },
};
