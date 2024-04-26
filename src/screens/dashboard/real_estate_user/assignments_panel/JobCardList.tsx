import React from "react";
import Box from "@mui/material/Box";
import JobCard from "./JobCard";
import { jobCardsData } from "@/utils/Constants";
import { scrollBarStyles } from "@/components/scrollbar/Scrollbar";

const JobCardList: React.FC = () => {
  return (
    <Box sx={styles.listContainer}>
      {jobCardsData.map((data, index) => (
        <JobCard key={index} {...data} />
      ))}
    </Box>
  );
};

export default JobCardList;
// Styles
const styles = {
  listContainer: {
    paddingTop: "1rem",
    px: "0.2rem",
    paddingBottom: "0.65rem", // Add padding to the bottom for the scrollbar
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    maxWidth: "none",
    flexShrink: "0",
    gap: "1.25rem",
    overflowX: "auto",
    ...scrollBarStyles,
  },
};
