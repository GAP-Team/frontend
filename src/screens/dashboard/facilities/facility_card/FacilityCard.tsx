import React from "react";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon"; // or a specific icon component from @mui/icons-material
import { BsClockFill } from "react-icons/bs";
import SectionTitle from "@/components/label/SectionTitle";
import { VscDebugBreakpointLog } from "react-icons/vsc";
import { useRouter } from "next/navigation";
import { Facility } from "./types";

interface FacilityCardProps {
  facility: Facility;
}
const statusStyles: { [key: string]: { bgcolor: string; color: string } } = {
  aktiv: { bgcolor: "#96E9CB", color: "#056643" },
  ausgeschrieben: { bgcolor: "#FDFCE0", color: "#EB9700" },
  Nachprüfung: { bgcolor: "#FFE1D7", color: "#EB4444" },
};

const FacilityCard: React.FC<FacilityCardProps> = ({ facility }) => {
  const router = useRouter();

  const handleClick = () => {};

  const chipStyles = statusStyles[status] || statusStyles["aktiv"];

  return (
    <Paper
      sx={styles.card}
      elevation={4}
      onClick={handleClick}
      style={{ cursor: "pointer" }}
    >
      <Box sx={styles.header}>
        <Chip label="Aktiv" sx={{ ...chipStyles }} />
        <Icon sx={{ color: "red" }}>
          <BsClockFill />
        </Icon>
      </Box>
      <SectionTitle
        text={facility.name}
        sx={{ fontWeight: 400, py: "0.75rem" }}
      />
      <Typography variant="h6" sx={styles.title}>
        {facility.genericTerm}
      </Typography>
      <Box sx={styles.tags}></Box>
      <Divider sx={styles.divider} orientation="horizontal" />
      <Typography variant="body2" sx={styles.subText}>
        Prüfung in: {facility.nextCheckIn} Monaten
      </Typography>
      <Typography variant="body2" sx={styles.subText}>
        Wartung in: {facility.nextCheckIn} Tagen
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
};
