import React from "react";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Icon from "@mui/material/Icon";
import Paper from "@mui/material/Paper";
import { useRouter } from "next/navigation";
import Divider from "@mui/material/Divider";
import { BsClockFill } from "react-icons/bs";
import Typography from "@mui/material/Typography";
import { VscDebugBreakpointLog } from "react-icons/vsc";

import JobMenu from "./JobMenu";
import SectionTitle from "@/components/label/SectionTitle";

interface JobCardProps {
  id: string;
  status: string;
  offers: number;
  title: string;
  tags: string[];
  location: string;
  projectId: string;
  sectionId: string;
}
const statusStyles: { [key: string]: { bgcolor: string; color: string } } = {
  offen: { bgcolor: "#E7E0FF", color: "#582EFF" },
  abgeschlossen: { bgcolor: "#96E9CB", color: "#056643" },
  "in Bearbeitung": { bgcolor: "#FDFCE0", color: "#EB9700" },
  "Freigabe ausstehend": { bgcolor: "#E5F5FA", color: "#22A7F1" },
  Nachprüfung: { bgcolor: "#FFE1D7", color: "#EB4444" },
};

const JobCard: React.FC<JobCardProps> = ({
  id,
  status,
  offers,
  title,
  tags,
  location,
  projectId,
  sectionId,
}) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/real-estate/tenders/${id}`);
  };

  const chipStyles = statusStyles[status] || statusStyles["offen"];

  return (
    <Paper sx={styles.card} elevation={4} style={{ cursor: "pointer" }}>
      <Box sx={styles.header}>
        <Chip label={status} sx={{ ...chipStyles }} />
        <Icon sx={{ color: "orange" }}>
          <BsClockFill />
        </Icon>
        <JobMenu />
      </Box>
      <Box sx={styles.location}>
        <SectionTitle
          text={`Angebote: ${offers}`}
          sx={{ fontWeight: 400, py: "0.75rem" }}
        />
      </Box>
      <Box onClick={handleClick}>
        <Typography variant="h6" sx={styles.title}>
          {title}
        </Typography>
        <Box sx={styles.tags}>
          {tags.map((tag, index) => (
            <React.Fragment key={index}>
              <Chip
                icon={<VscDebugBreakpointLog color="white" />}
                color="gprimary"
                label={tag}
                size="small"
                sx={styles.tagChip}
              />
            </React.Fragment>
          ))}
        </Box>
        <Divider sx={styles.divider} orientation="horizontal" />
        <Typography variant="body2" sx={styles.subText}>
          {location}
        </Typography>
        <Typography variant="body2" sx={{ pl: 2 }}>
          {`--> ${projectId}`}
        </Typography>
        <Typography variant="body2" sx={{ pl: 4 }}>
          {`--> ${sectionId}`}
        </Typography>
      </Box>
    </Paper>
  );
};

export default JobCard;

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
  location: {
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
