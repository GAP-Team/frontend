import React from "react";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";
import { BsClockFill } from "react-icons/bs";
import SectionTitle from "@/components/label/SectionTitle";
import { Facility } from "./types";
import { useAppSelector } from "@/lib/hooks";
import ActionMenu from "@/components/common/ActionMenu";
import { useRouter } from "next/navigation";
import { checkActiveTenderForFacility } from "@/lib/features/tenderSlice";

interface FacilityCardProps {
  facility: Facility;
}
const statusStyles: { [key: string]: { bgcolor: string; color: string } } = {
  aktiv: { bgcolor: "#96E9CB", color: "#056643" },
  ausgeschrieben: { bgcolor: "#FDFCE0", color: "#EB9700" },
  Nachprüfung: { bgcolor: "#FFE1D7", color: "#EB4444" },
};

const FacilityCard: React.FC<FacilityCardProps> = ({ facility }) => {
  const handleClick = (): void => {};
  const router = useRouter();
  const isFacilityActive = useAppSelector(
    checkActiveTenderForFacility(facility?.id)
  );
  const chipStyles = statusStyles[status] || statusStyles["aktiv"];

  const checkUrgency = (): string => {
    const monthsUntilCheck = facility.check.nextCheckInYearNumber * 12;

    if (monthsUntilCheck > 6 && monthsUntilCheck < 12) {
      return "orange";
    } else if (monthsUntilCheck < 2) {
      return "red";
    }
    return "";
  };

  const deleteFacility = (id: string): void => {
    throw new Error("Function not implemented." + id);
  };

  return (
    <Paper
      sx={styles.card}
      elevation={4}
      onClick={handleClick}
      style={{ cursor: "pointer" }}
    >
      <Box sx={styles.header}>
        {isFacilityActive && <Chip label={"aktiv"} sx={{ ...chipStyles }} />}
        {checkUrgency() && (
          <Icon sx={{ color: checkUrgency() }}>
            <BsClockFill />
          </Icon>
        )}
      </Box>
      <Box sx={styles.actionMenu}>
        <ActionMenu
          itemId={facility?.id}
          onEdit={(id) => router.push(`/real_estate/facility/edit/${id}`)}
          onDelete={(id) => deleteFacility(id)}
          messege={"dummy delete message"}
        />
      </Box>
      <SectionTitle
        text={facility.name}
        sx={{ fontWeight: 400, py: "0.75rem" }}
      />
      <Typography variant="h6" sx={styles.title}>
        {facility.facilityType}
      </Typography>
      <Box sx={styles.tags}></Box>
      <Divider sx={styles.divider} orientation="horizontal" />
      <Typography variant="body2" sx={styles.subText}>
        Prüfung in: {facility.check.nextCheckInYearNumber * 12} Monaten
      </Typography>
      <Typography variant="body2" sx={styles.subText}>
        Wartung in: {facility.maintenance.nextMaintenanceInMonth * 30} Tagen
      </Typography>
    </Paper>
  );
};

export default FacilityCard;

// Styles
const styles = {
  card: {
    p: "1.25rem",
    borderRadius: "0.5rem",
    maxWidth: "15rem", // Adjust the width as needed
    height: "21rem",
    flexShrink: 0,
    overflow: "auto",
    mb: "0.35rem",
    cursor: "pointer",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  chip: {
    bgcolor: "purple",
    color: "white",
  },
  title: {
    fontWeight: "600",
    fontSize: "1rem",
    lineHeight: "1.5rem",
    pb: "0.5rem",
  },
  tags: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
  },
  tagChip: {
    mr: 0.5,
    mb: 0.5,
  },
  divider: {
    my: "0.75rem",
  },
  subText: {
    display: "flex",
    alignItems: "center",
    fontSize: "0.75rem",
    fontWeight: "600",
    lineHeight: "1rem",
    mt: 0.5,
    "& > svg": {
      mr: 0.5,
    },
  },
  actionMenu: { display: "flex", justifyContent: "flex-end", width: "100%" },
};
