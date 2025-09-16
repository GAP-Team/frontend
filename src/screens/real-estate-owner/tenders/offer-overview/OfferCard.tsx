import DButton from "@/components/inputs/button/DButton";

import {
  Avatar,
  Box,
  Checkbox,
  FormControlLabel,
  Paper,
  Skeleton,
  Typography,
} from "@mui/material";
import React from "react";
import HeaderSection from "../../dashboard/HeaderSection";

interface OfferCardProps {
  loading?: boolean;
  offerID: string;
}

const OfferCard: React.FC<OfferCardProps> = ({ loading = false }) => {
  const avatarLetter = "M";
  const companyName = "Mayer Prüfungs GmbH";
  const location = "Sindelfingen";
  const distance = "15";
  const termsAndConditions = "AGBs Herunterladen";
  const position = "Bernhard Mayer";
  const workerFirstName = "Prüfer";
  const workerLastName = "Geschäftsführer";

  if (loading) {
    return (
      <Paper sx={styles.paper}>
        <Box sx={styles.headerContainer}>
          <Box sx={{ width: "80%", ml: "0.5rem" }}>
            <Box sx={styles.avatarContainer}>
              <Skeleton
                variant="circular"
                width={40}
                height={40}
                sx={{ mr: 2 }}
              />
              <Box sx={styles.companyInfo}>
                <Skeleton variant="text" width={150} />
                <Skeleton variant="text" width={100} />
              </Box>
            </Box>
            <Box sx={styles.checkBoxContainer}>
              <Skeleton variant="text" width={80} />
              <Skeleton variant="text" width={60} />
              <Skeleton variant="text" width={60} />
            </Box>
          </Box>
        </Box>
        <Box sx={styles.buttonContainer}>
          <Skeleton variant="rectangular" width={120} height={40} />
        </Box>
      </Paper>
    );
  }

  return (
    <Paper sx={styles.paper}>
      <HeaderSection titletext="DATEN ZUM ANBIETER" />
      <Box sx={styles.headerContainer}>
        <Box sx={{ width: "80%", ml: "0.5rem" }}>
          <Box sx={styles.avatarContainer}>
            <Avatar sx={styles.avatar}>{avatarLetter}</Avatar>
            <Box sx={styles.companyInfo}>
              <Typography variant="bodylsb">{companyName}</Typography>
              <Typography variant="body2" color="#22A7F1">
                {location}
              </Typography>
            </Box>
          </Box>
          <Box sx={styles.threeContainer}>
            <Box sx={styles.avatarContainer}>
              <Avatar sx={styles.avatar}>{avatarLetter}</Avatar>
              <Box sx={styles.companyInfo}>
                <Typography variant="bodylsb" sx={styles.specialServices}>
                  {position}
                </Typography>
                <Typography variant="body2" color="#22A7F1">
                  {workerFirstName + "," + workerLastName}
                </Typography>
              </Box>
            </Box>
            <Box sx={styles.companyInfo}>
              <Typography
                variant="bodylsb"
                component="a"
                href="https://your-tc-link.com"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ textDecoration: "underline", color: "grey" }}
              >
                {termsAndConditions}
              </Typography>
              <Typography variant="body2" color="#22A7F1">
                {"Terms & Conditions"}
              </Typography>
            </Box>
            <Box sx={styles.companyInfo}>
              <Typography variant="bodylsb">{"Distanz zum Objekt"}</Typography>
              <Typography variant="body2" color="#22A7F1">
                {distance + " Kilometer"}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ ...styles.checkBoxContainer, pl: 6, mt: 2 }}>
            <FormControlLabel
              disabled
              control={<Checkbox />}
              label="Documents1"
            />
          </Box>
          <Box sx={{ ...styles.checkBoxContainer, pl: 6 }}>
            <FormControlLabel
              disabled
              control={<Checkbox />}
              label="Documents2"
            />
          </Box>
          <Box sx={{ ...styles.checkBoxContainer, pl: 6 }}>
            <FormControlLabel
              disabled
              control={<Checkbox />}
              label="Documents3"
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
                alignItems: "right",
                mr: 0,
              }}
            >
              <DButton variant="contained">DownLoad</DButton>
            </Box>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default OfferCard;

// Styles

const styles = {
  threeContainer: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    maxWidth: "false",
    width: "100%",
    borderRadius: "0.8rem",
    p: "1.25rem",
  },
  headerContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    mb: 2,
  },
  avatarContainer: {
    display: "flex",
    alignItems: "center",
    mb: 2,
  },
  avatar: {
    bgcolor: "#22A7F1",
    mr: 2,
  },
  companyInfo: {
    display: "flex",
    flexDirection: "column",
  },

  checkBoxContainer: {
    display: "flex", // ✅ make it a flex container
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    mb: 1,
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    alignItems: "left",
  },
  specialServices: {
    mr: 2,
  },
};
