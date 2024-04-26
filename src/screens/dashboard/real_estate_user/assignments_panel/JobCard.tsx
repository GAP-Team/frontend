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

interface JobCardProps {
  status: string;
  offers: number;
  title: string;
  tags: string[];
  location: string;
  projectId: string;
  sectionId: string;
}

const JobCard: React.FC<JobCardProps> = ({
  status,
  offers,
  title,
  tags,
  location,
  projectId,
  sectionId,
}) => {
  return (
    <Paper sx={styles.card} elevation={4}>
      <Box sx={styles.header}>
        <Chip label={status} sx={styles.chip} />
        <Icon sx={{ color: "orange" }}>
          <BsClockFill />
        </Icon>
      </Box>
      <SectionTitle
        text={`Angebote: ${offers}`}
        sx={{ fontWeight: 400, py: "0.75rem" }}
      />
      <Typography
        variant="h6"
        sx={styles.title}
      >
        {title}
      </Typography>
      <Box sx={styles.tags}>
        {tags.map((tag, index) => (
          <React.Fragment key={tag}>
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
        {projectId}
      </Typography>
      <Typography variant="body2" sx={{ pl: 4 }}>
        {sectionId}
      </Typography>
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
    maxHeight: "21rem",
    flexShrink: 0,
    overflow: "auto",
    mb: "0.35rem",
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
  title:{
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
