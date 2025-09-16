import { Box, Paper, Skeleton, Button } from "@mui/material";
import React from "react";

interface ButtonCardProps {
  loading?: boolean;
}

const ButtonCard: React.FC<ButtonCardProps> = ({ loading = false }) => {
  if (loading) {
    return (
      <Paper sx={styles.paper}>
        <Box sx={{ width: "80%", ml: "0.5rem" }}>
          <Box sx={styles.buttonContainer}>
            <Skeleton variant="text" width={80} />
            <Skeleton variant="text" width={60} />
            <Skeleton variant="text" width={60} />
          </Box>
          <Box sx={styles.buttonContainer}>
            <Skeleton variant="rectangular" width={130} height={40} />
            <Skeleton variant="rectangular" width={120} height={40} />
          </Box>
        </Box>
      </Paper>
    );
  }

  return (
    <Paper sx={styles.paper}>
      <Box sx={styles.mainContainer}>
        <Box sx={styles.buttonContainer}>
          <Button variant="contained" color="success" fullWidth>
            Auftrag erteilen
          </Button>
        </Box>
        <Box sx={styles.buttonContainer} mt={2}>
          <Button variant="contained" color="primary" fullWidth>
            Angebot herunterladen
          </Button>
        </Box>
        <Box sx={styles.buttonContainer} mt={2}>
          <Button variant="contained" color="error" fullWidth>
            Angebote ablehnen
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default ButtonCard;

// Styles

const styles = {
  mainContainer: {
    display: "flex",
    flexDirection: "column",
    height: "auto",
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    maxWidth: "false",
    width: "100%",
    borderRadius: "0.8rem",
    p: "1.25rem",
  },
  buttonContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
};
