import React from "react";
import JobCard from "./JobCard";
import { jobCardsData } from "@/utils/Constants";
import Box from "@mui/material/Box";
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
    display: "flex",
    flexDirection: "row",
    gap: "1.25rem",
    paddingBottom: "0.65rem",
    paddingTop: "1rem",
    px: "0.2rem",
    overflowX: "auto",
    ...scrollBarStyles,
  },
};
