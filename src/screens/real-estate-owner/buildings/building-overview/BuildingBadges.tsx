import React, { useMemo } from "react";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import { useAppSelector } from "@/lib/hooks";
import { Facility } from "@/screens/real-estate-owner/facilities/facility-overview/types";
import { Tender } from "@/screens/real-estate-owner/tenders/tender-overview/types";
import { getBuildingBadgeCounts } from "./buildingBadgeCounts";

interface BuildingBadgesProps {
  buildingId: string;
}

const BADGES = [
  { key: "overdue", label: "Überfällig", bgcolor: "#FFE1D7", color: "#EB4444" },
  {
    key: "dueSoon",
    label: "Bald fällig",
    bgcolor: "#FDFCE0",
    color: "#EB9700",
  },
  {
    key: "openTenders",
    label: "Offene Ausschreibungen",
    bgcolor: "#D6EEFC",
    color: "#0E6BA8",
  },
  {
    key: "newOffers",
    label: "Neue Angebote",
    bgcolor: "#96E9CB",
    color: "#056643",
  },
] as const;

const BuildingBadges: React.FC<BuildingBadgesProps> = ({ buildingId }) => {
  const facilities = useAppSelector((state) => state.facility.facilities);
  const tenders = useAppSelector((state) => state.tender.tenderList);
  const seenCounts = useAppSelector((state) => state.seenOffers.seenCounts);
  const counts = useMemo(
    () =>
      getBuildingBadgeCounts(
        facilities?.filter(
          (facility: Facility) => facility.buildingId === buildingId
        ) ?? [],
        tenders?.filter(
          (tender: Tender) => tender.building?.id === buildingId
        ) ?? [],
        seenCounts
      ),
    [facilities, tenders, seenCounts, buildingId]
  );

  const visibleBadges = BADGES.filter(({ key }) => counts[key] > 0);
  if (visibleBadges.length === 0) return <></>;

  return (
    <Box sx={styles.container}>
      {visibleBadges.map(({ key, label, bgcolor, color }) => (
        <Chip
          key={key}
          size="small"
          label={`${label}: ${counts[key]}`}
          sx={{ bgcolor, color }}
        />
      ))}
    </Box>
  );
};

export default BuildingBadges;

// Styles
const styles = {
  container: {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.375rem",
    mt: "0.75rem",
  },
};
