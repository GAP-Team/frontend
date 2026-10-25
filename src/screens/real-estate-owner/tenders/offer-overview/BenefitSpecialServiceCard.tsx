import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import EuroIcon from "@mui/icons-material/Euro";
import SocialDistanceIcon from "@mui/icons-material/SocialDistance";
import StarBorderIcon from "@mui/icons-material/StarBorder";

import { List, ListItem, Paper, Typography } from "@mui/material";
import React, { useState } from "react";

import HeaderSection from "@/screens/real-estate-owner/dashboard/HeaderSection";

interface BenefitSpecialServiceCardProps {
  price: string;
  workDates?: string;
  distance?: string;
  specialServices: string[];
}

const MAX_VISIBLE_SERVICES = 3;

const BenefitSpecialServiceCard: React.FC<BenefitSpecialServiceCardProps> = ({
  price,
  workDates,
  distance,
  specialServices,
}) => {
  const [showAll, setShowAll] = useState(false);
  const visibleServices = showAll
    ? specialServices
    : specialServices.slice(0, MAX_VISIBLE_SERVICES);
  const hiddenCount = specialServices.length - visibleServices.length;
  const rows = [
    {
      Icon: EuroIcon,
      label: "Gesamtpreis",
      value: `${price} €`,
    },
    {
      Icon: CalendarTodayIcon,
      label: "Mögliches Startdatum",
      value: workDates || "Nach Absprache",
    },
    ...(distance
      ? [
          {
            Icon: SocialDistanceIcon,
            label: "Entfernung zum Objekt",
            value: distance,
          },
        ]
      : []),
  ];

  return (
    <Paper sx={styles.paper}>
      <HeaderSection titletext="SONDERLEISTUNGEN" />
      <List sx={{ p: 0 }}>
        {rows.map(({ Icon, label, value }) => (
          <ListItem key={label} sx={{ ...styles.iconContainer, px: 0 }}>
            <Icon sx={{ color: "gold", fontSize: "2rem" }} />
            <Typography sx={{ ml: 3, color: "lightgrey" }}>{label}</Typography>
            <Typography sx={{ fontWeight: "bold", mr: 3, ml: "auto" }}>
              {value}
            </Typography>
          </ListItem>
        ))}
        {visibleServices.map((service) => (
          <ListItem key={service} sx={{ ...styles.iconContainer, px: 0 }}>
            <StarBorderIcon sx={{ color: "gold", fontSize: "2rem" }} />
            <Typography sx={{ ml: 3 }}>{service}</Typography>
          </ListItem>
        ))}
        {hiddenCount > 0 && (
          <ListItem sx={{ px: 0 }}>
            <Typography
              color="#22A7F1"
              onClick={() => setShowAll(true)}
              sx={{ cursor: "pointer", textDecoration: "underline" }}
            >
              {`+ ${hiddenCount} weitere`}
            </Typography>
          </ListItem>
        )}
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
