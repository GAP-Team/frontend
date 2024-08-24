import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

interface ProjectCardProps {
  code: string;
  address: string;
  daysRemaining: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  code,
  address,
  daysRemaining,
}) => {
  return (
    <Box sx={styles.card}>
      <Box sx={styles.content}>
        <Typography variant="subtitle1" sx={styles.nameAndAddress}>
          {code}
        </Typography>
        <Typography variant="body2" sx={styles.nameAndAddress}>
          {address}
        </Typography>
      </Box>
      <Box sx={styles.daysRemaining}>
        <Typography variant="h5" component="div" sx={styles.daysNumber}>
          {daysRemaining}
        </Typography>
        <Typography variant="body2">Tage übrig</Typography>
      </Box>
    </Box>
  );
};

export default ProjectCard;

// Styles
const styles = {
  card: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#1C45CC", // Adjust the color as needed
    borderRadius: "0.5rem",
    color: "white",
    mt: "0.75rem",
    padding: "0.75rem",
  },
  content: {
    display: "flex",
    flexDirection: "column",
  },
  nameAndAddress: {
    fontSize: "0.875rem",
    fontWeight: 600,
    lineHeight: "1.25rem",
  },

  daysRemaining: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "16px",
    padding: "8px",
    minWidth: "64px",
  },
  daysNumber: {
    fontSize: "1.5rem",
    lineHeight: "2rem",
    fontWeight: 700,
  },
};
