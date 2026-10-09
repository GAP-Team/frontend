import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Facility } from "@/screens/real-estate-owner/facilities/facility-overview/types";
import { Tender } from "@/screens/real-estate-owner/tenders/tender-overview/types";
import { getFacilityCheckStatus } from "@/screens/real-estate-owner/facilities/utils";
import { TenderStatusEnum } from "@/utils/enums";

interface BuildingStatTilesProps {
  facilities: Facility[];
  tenders: Tender[];
}

// A check that is overdue or due soon needs attention.
const isCheckDueForAttention = (facility: Facility): boolean =>
  ["overdue", "soon"].includes(getFacilityCheckStatus(facility) ?? "");

const BuildingStatTiles: React.FC<BuildingStatTilesProps> = ({
  facilities,
  tenders,
}) => {
  const activeTendersCount = tenders.filter(
    (tender) => tender.status === TenderStatusEnum.ACTIVE
  ).length;
  const dueForAttentionCount = facilities.filter(isCheckDueForAttention).length;

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
    display: "flex",
    alignItems: "baseline",
    gap: "0.75rem",
  },
  label: {
    color: "#8D999C",
  },
};
