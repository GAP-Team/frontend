import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import DiscountIcon from "@mui/icons-material/Discount";
import SocialDistanceIcon from "@mui/icons-material/SocialDistance";

import {
  Box,
  List,
  ListItem,
  Paper,
  Skeleton,
  Typography,
} from "@mui/material";
import React from "react";
import HeaderSection from "../../dashboard/HeaderSection";

interface BenefitSpecialServiceCardProps {
  loading?: boolean;
}

const BenefitSpecialServiceCard: React.FC<BenefitSpecialServiceCardProps> = ({
  loading = false,
}) => {
  const possibleStartDate = "Sofort";
  const discount = "18";
  const distance = "15";

  if (loading) {
    return (
      <Paper sx={styles.paper}>
        <Box sx={styles.headerContainer}>
          <Box sx={{ width: "80%", ml: "0.5rem" }}>
            <Box sx={styles.iconContainer}>
              <Skeleton variant="text" width={80} />
              <Skeleton variant="text" width={60} />
              <Skeleton variant="text" width={60} />
            </Box>
          </Box>
        </Box>
      </Paper>
    );
  }

  return (
    <Paper sx={styles.paper}>
      <HeaderSection titletext="SONDERLEISTUNGEN" />
      <List sx={{ p: 0 }}>
        <ListItem sx={{ ...styles.iconContainer, px: 0 }}>
          <CalendarTodayIcon sx={{ color: "gold", fontSize: "2rem", mt: 3 }} />
          <Typography sx={{ mt: 3, ml: 3, color: "lightgrey" }}>
            {"Mögliches Startdatum"}
          </Typography>
          <Typography sx={{ fontWeight: "bold", mt: 3, mr: 3, ml: "auto" }}>
            {possibleStartDate}
          </Typography>
        </ListItem>
        <ListItem sx={{ ...styles.iconContainer, px: 0 }}>
          <DiscountIcon sx={{ color: "gold", fontSize: "2rem", mt: 0 }} />
          <Typography sx={{ color: "lightgrey", mt: 0, ml: 3 }}>
            {"Skonto bei direkter Zusage"}
          </Typography>
          <Typography sx={{ fontWeight: "bold", mt: 3, mr: 3, ml: "auto" }}>
            {discount === "18" ? "18" : discount}
          </Typography>
        </ListItem>
        <ListItem sx={{ ...styles.iconContainer, px: 0 }}>
          <SocialDistanceIcon sx={{ color: "gold", fontSize: "2rem", mt: 0 }} />
          <Typography sx={{ color: "lightgrey", mt: 0, ml: 3 }}>
            {"Entfernung zum Objekt "}
          </Typography>
          <Typography sx={{ fontWeight: "bold", mt: 3, mr: 3, ml: "auto" }}>
            {`${distance} km`}
          </Typography>
        </ListItem>
      </List>
    </Paper>
  );
};

export default BenefitSpecialServiceCard;

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
  headerContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    mb: 2,
  },
  iconContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    mb: 2,
  },
  icon: {
    mr: 2,
  },
};
