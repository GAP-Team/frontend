import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

interface StatisticsItemProps {
  number: number | string;
  text: string;
  color?: string;
}

const StatisticDisplay: React.FC<StatisticsItemProps> = ({
  number,
  text,
  color,
}) => {
  return (
    <Box sx={styles.statisticsItem}>
      <Typography
        variant="h4"
        component="span"
        sx={{ ...styles.number, color: color || "inherit" }}
      >
        {number}
      </Typography>
      <Typography variant="subtitle2" sx={styles.text}>
        {text}
      </Typography>
    </Box>
  );
};

export default StatisticDisplay;

const styles = {
  statisticsItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    color: "white",
    px: "1rem",
  },
  number: {
    fontSize: "2.75rem",
    fontWeight: 700,
    lineHeight: "3.25rem",
    marginBottom: "0.75rem",
  },
  text: {
    textAlign: "center",
    fontSize: "0.875rem",
    fontWeight: 400,
    lineHeight: "1.25rem",
    maxWidth: "6.5rem",
  },
};
