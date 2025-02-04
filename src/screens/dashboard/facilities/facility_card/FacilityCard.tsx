import React from "react";
import { Facility } from "./types";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Icon from "@mui/material/Icon";
import List from "@mui/material/List";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import { useRouter } from "next/navigation";
import { BsClockFill } from "react-icons/bs";
import { useAppSelector } from "@/lib/hooks";
import Typography from "@mui/material/Typography";
import ActionMenu from "@/components/common/ActionMenu";
import SectionTitle from "@/components/label/SectionTitle";
import { scrollBarStyles } from "@/components/scrollbar/Scrollbar";
import DocumentList from "../../buildings/building_card/DocumentList ";
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
      <Divider sx={styles.divider} orientation="horizontal" />
      <List sx={{ ...styles.listContainer }}>
        {facility?.documents?.length > 0 && (
          <>
            <DocumentList
              title={"Berichte"}
              documentType={"BERICHTE PRÜFEN"}
              documents={facility?.documents}
            />
            <DocumentList
              title={"Grundrisse"}
              documentType={"GRUNDRISSE"}
              documents={facility?.documents}
            />
            <DocumentList
              title={"Sonstige Dokumente"}
              documentType={"SONSTIGE"}
              documents={facility?.documents}
            />
          </>
        )}
      </List>
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
  actionMenu: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
  },
  listContainer: {
    flexGrow: 1,
    paddingTop: "0.5rem",
    overflow: "auto",
    paddingRight: "0.65rem",
    ...scrollBarStyles,
  },
};
