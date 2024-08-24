"use client";

import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import Skeleton from "@mui/material/Skeleton";
import GButton from "@/components/button/GButton";

interface ApplicationCardProps {
  loading?: boolean;
}

const ApplicationCard: React.FC<ApplicationCardProps> = ({
  loading = false,
}) => {
  const avatarLetter = "M";
  const companyName = "Mayer Prüfungs GmbH";
  const location = "Sindelfingen";
  const tags = ["Brandschutz", "Wasserschutz", "Prüfungsleistungen"];
  const price = "4.103,00 €";
  const distance = "230 km";
  const deadline = "17.06";
  const specialServices = 4;
  const employees = 15;
  const discount = 18;

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
            <Box sx={styles.tagsContainer}>
              <Skeleton variant="text" width={60} sx={styles.tag} />
              <Skeleton variant="text" width={60} sx={styles.tag} />
              <Skeleton variant="text" width={60} sx={styles.tag} />
            </Box>
            <Box sx={styles.priceContainer}>
              <Skeleton variant="text" width={80} />
              <Skeleton variant="text" width={60} />
              <Skeleton variant="text" width={60} />
            </Box>
          </Box>
          <Box sx={styles.progressContainer}>
            <Skeleton variant="circular" width={80} height={80} />
            <Skeleton variant="text" width={60} sx={styles.discountText} />
          </Box>
        </Box>
        <Box sx={styles.buttonContainer}>
          <Skeleton variant="rectangular" width={120} height={40} />
          <Box sx={styles.additionalInfoContainer}>
            <Skeleton variant="text" width={100} sx={styles.specialServices} />
            <Skeleton variant="text" width={80} />
          </Box>
        </Box>
      </Paper>
    );
  }

  return (
    <Paper sx={styles.paper}>
      <Box sx={styles.headerContainer}>
        <Box sx={{ width: "80%", ml: "0.5rem" }}>
          <Box sx={styles.avatarContainer}>
            <Avatar sx={styles.avatar}>{avatarLetter}</Avatar>
            <Box sx={styles.companyInfo}>
              <Typography variant="bodylsb">{companyName}</Typography>
              <Typography variant="body2" color="text.secondary">
                {location}
              </Typography>
            </Box>
          </Box>
          <Box sx={styles.tagsContainer}>
            {tags.map((tag, index) => (
              <Typography
                key={index}
                variant="bodymr"
                color="blue.main"
                sx={styles.tag}
              >
                {tag}
              </Typography>
            ))}
          </Box>
          <Box sx={styles.priceContainer}>
            <Typography variant="bodylsb">{price}</Typography>
            <Typography variant="bodylsb">{distance}</Typography>
            <Typography variant="bodylsb" color="error">
              {deadline} Frist
            </Typography>
          </Box>
        </Box>
        <Box sx={styles.progressContainer}>
          <Box sx={styles.circularProgressContainer}>
            <CircularProgress
              variant="determinate"
              value={discount}
              size={80}
              thickness={5}
              sx={styles.circularProgress}
            />
            <Box sx={styles.progressTextContainer}>
              <Typography
                variant="bodylsb"
                component="div"
                color="textSecondary"
              >
                {`${discount}%`}
              </Typography>
            </Box>
          </Box>
          <Typography
            variant="bodymsb"
            color="grey.500"
            sx={styles.discountText}
          >
            Günstiger
          </Typography>
        </Box>
      </Box>

      <Box sx={styles.buttonContainer}>
        <GButton variant="outlined">zum Angebot</GButton>
        <Box sx={styles.additionalInfoContainer}>
          <Typography variant="bodylsb" sx={styles.specialServices}>
            {specialServices} Sonderleistungen
          </Typography>
          <Typography variant="bodylsb">{employees} Mitarbeiter</Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default ApplicationCard;

const styles = {
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
  progressContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  circularProgressContainer: {
    position: "relative",
    display: "inline-flex",
  },
  circularProgress: {
    borderRadius: "50%",
  },
  progressTextContainer: {
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  discountText: {
    mt: 1,
  },
  tagsContainer: {
    display: "flex",
    flexWrap: "wrap",
    mb: 1,
  },
  tag: {
    mr: 2,
  },
  priceContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    mb: 1,
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  additionalInfoContainer: {
    display: "flex",
    alignItems: "center",
  },
  specialServices: {
    mr: 2,
  },
};
