import React from "react";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import SectionTitle from "../label/SectionTitle";
import { DashboardComponentsProps } from "@/utils/Constants";
import GButton from "../button/GButton";

const DetailedTenderCard: React.FC<DashboardComponentsProps> = () => {
  return (
    <Paper sx={styles.card} elevation={4} style={{ cursor: "pointer" }}>
      <Box sx={styles.header}>
        <Chip label={"Reparatur"} sx={styles.cardTypeTitle} />
      </Box>
      <Box sx={styles.location}>
        <SectionTitle
          text={`Angebote: 0 (bis 10.03.2025)`}
          sx={styles.timeSection}
        />
      </Box>
      <Box>
        <Typography variant="h6" sx={styles.address}>
          HE, Frankfurt am Main
        </Typography>
        {/* <Divider sx={styles.divider} orientation="horizontal" /> */}
        <Typography variant="body2" sx={styles.title}>
          Feuerlöschanlagen
        </Typography>
        <Typography variant="body2" sx={{ pl: 2, marginBottom: "1.5rem" }}>
          {`--> Sprinkleranlage`}
        </Typography>
        <Typography variant="body2" sx={styles.bottomTitle}>
          Eröffnungstermin
        </Typography>

        <GButton style={styles.button} href="#">
          Mehr anzeigen
        </GButton>
      </Box>
    </Paper>
  );
};

export default DetailedTenderCard;

const styles = {
  card: {
    p: "1.25rem",
    borderRadius: "0.5rem",
    maxWidth: "20rem",
    minWidth: "10rem",
    height: "25rem",
    flexShrink: 0,
    overflow: "auto",
    mb: "0.35rem",
    cursor: "pointer",
  },
  cardTypeTitle: {
    background: "#96E9CB",
    marginBottom: "0.8rem",
  },
  timeSection: {
    py: "0.75rem",
    fontWeight: 400,
    marginBottom: "0.6rem",
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
  urgentIcon: {
    marginLeft: "5rem",
    color: "orange",
  },
  chip: {
    bgcolor: "purple",
    color: "white",
  },
  address: {
    pb: "0.5rem",
    color: "#22A7F1",
    fontWeight: "600",
    fontSize: "1.2rem",
    lineHeight: "1.5rem",
    marginBottom: "1.7rem",
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
  title: {
    display: "flex",
    alignItems: "center",
    fontSize: "1.2rem",
    fontWeight: "600",
    lineHeight: "1rem",
    marginBottom: "0.8rem",
    mt: 0.5,
    "& > svg": {
      mr: 0.5,
    },
  },
  bottomTitle: {
    pb: "0.5rem",
    color: "#7a7575",
    fontSize: "1.1rem",
    lineHeight: "1.5rem",
    marginBottom: "1rem",
  },
  button: {
    marginLeft: 0,
    width: "100%",
    marginTop: "0.5rem",
  },
};
