import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Facility } from "@/screens/real-estate-owner/facilities/facility-overview/types";
import { Tender } from "@/screens/real-estate-owner/tenders/tender-overview/types";
import {
  getFacilityCheckTimeRemaining,
  getFacilityMaintenanceTimeRemaining,
} from "@/screens/real-estate-owner/facilities/utils";
import {
  CHECK_DUE_SOON_DAYS,
  MAINTENANCE_DUE_SOON_DAYS,
} from "@/utils/Constants";
import { TenderStatusEnum } from "@/utils/enums";

interface BuildingStatTilesProps {
  facilities: Facility[];
  tenders: Tender[];
}

const isCheckOrMaintenanceOverdue = (facility: Facility): boolean => {
  const monthsUntilCheck = getFacilityCheckTimeRemaining(facility, "months");
  const daysUntilMaintenance = getFacilityMaintenanceTimeRemaining(
    facility,
    "days"
  );
  return monthsUntilCheck < 0 || daysUntilMaintenance < 0;
};

const isCheckDueSoon = (facility: Facility): boolean => {
  const monthsUntilCheck = getFacilityCheckTimeRemaining(facility, "months");
  return (
    monthsUntilCheck > 0 &&
    monthsUntilCheck < Math.floor(CHECK_DUE_SOON_DAYS / 30)
  );
};

const isMaintenanceDueSoon = (facility: Facility): boolean => {
  const daysUntilMaintenance = getFacilityMaintenanceTimeRemaining(
    facility,
    "days"
  );
  return (
    daysUntilMaintenance > 0 && daysUntilMaintenance < MAINTENANCE_DUE_SOON_DAYS
  );
};

const isFacilityDueForAttention = (facility: Facility): boolean =>
  isCheckOrMaintenanceOverdue(facility) ||
  isCheckDueSoon(facility) ||
  isMaintenanceDueSoon(facility);

const BuildingStatTiles: React.FC<BuildingStatTilesProps> = ({
  facilities,
  tenders,
}) => {
  const activeTendersCount = tenders.filter(
    (tender) => tender.status === TenderStatusEnum.ACTIVE
  ).length;
  const dueForAttentionCount = facilities.filter(
    isFacilityDueForAttention
  ).length;

  const tiles = [
    { label: "Anlagen", value: facilities.length },
    { label: "Aktive Ausschreibungen", value: activeTendersCount },
    { label: "Fällige Prüfungen", value: dueForAttentionCount },
  ];

  return (
    <Box sx={styles.row}>
      {tiles.map((tile) => (
        <Paper key={tile.label} sx={styles.tile}>
          <Typography variant="h4b" color="gprimary.main">
            {tile.value}
          </Typography>
          <Typography variant="bodymr" sx={styles.label}>
            {tile.label}
          </Typography>
        </Paper>
      ))}
    </Box>
  );
};

export default BuildingStatTiles;

// Styles
const styles = {
  row: {
    display: "flex",
    gap: "1rem",
    flexWrap: "wrap",
  },
  tile: {
    p: "1.25rem",
    borderRadius: "0.5rem",
    minWidth: "10rem",
    flex: "1 1 10rem",
  },
  label: {
    color: "#8D999C",
  },
};
