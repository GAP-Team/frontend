import { Avatar, Box, Paper, Typography } from "@mui/material";
import React from "react";
import HeaderSection from "@/screens/real-estate-owner/dashboard/HeaderSection";
import { Document } from "@/typings/types";
import { downloadDocument } from "./utils";

interface OfferCardProps {
  companyName: string;
  location: string;
  documents: Document[];
}

const OfferCard: React.FC<OfferCardProps> = ({
  companyName,
  location,
  documents,
}) => {
  const avatarLetter = companyName.charAt(0).toUpperCase();

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
          {documents.map((doc) => (
            <Box
              key={doc.key}
              sx={{ ...styles.checkBoxContainer, pl: 6, mt: 2 }}
            >
              <Typography
                variant="body1"
                color="#22A7F1"
                onClick={() => downloadDocument(doc)}
                sx={{ cursor: "pointer", textDecoration: "underline" }}
              >
                {doc.name}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Paper>
  );
};

export default OfferCard;

// Styles

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

  checkBoxContainer: {
    display: "flex",
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
