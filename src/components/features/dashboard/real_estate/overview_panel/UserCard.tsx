import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";

interface UserCardProps {
  name: string;
  designation: string;
  numberOfRequests: number;
}

const UserCard: React.FC<UserCardProps> = ({
  name,
  designation,
  numberOfRequests,
}) => {
  return (
    <Box sx={styles.card}>
      <Avatar sx={styles.avatar} />
      <Box sx={styles.content}>
        <Typography variant="subtitle1" sx={styles.name}>
          {name}
        </Typography>
        <Typography variant="body2" sx={styles.designation}>
          {designation}
        </Typography>
      </Box>
      <Box sx={styles.requestContainer}>
        <Typography variant="h5" component="div" sx={styles.daysNumber}>
          {numberOfRequests}
        </Typography>
        <Typography variant="body2">Requests</Typography>
      </Box>
    </Box>
  );
};

export default UserCard;

// Styles
const styles = {
  card: {
    display: "flex",
    justifyContent: "start",
    alignItems: "center",
    backgroundColor: "#1C45CC", // Adjust the color as needed
    borderRadius: "0.5rem",
    color: "white",
    gap: "1rem",
    mt: "0.75rem",
    padding: "0.75rem",
  },
  content: {
    display: "flex",
    flexDirection: "column",
  },
  avatar: {
    width: "2.5rem",
    height: "2.5rem",
  },
  name: {
    fontSize: "0.875rem",
    fontWeight: 600,
    lineHeight: "1.25rem",
  },
  designation: {
    fontSize: "0.75rem",
    fontWeight: 400,
    lineHeight: "1rem",
  },
  requestContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    ml: "auto", // Push to the right
    px: "1rem", // Horizontal padding
  },
  daysNumber: {
    fontSize: "1.5rem",
    lineHeight: "2rem",
    fontWeight: 700,
  },
};