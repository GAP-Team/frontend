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
    display: 'flex',
    flexDirection: 'row',
    gap: '1.25rem',
    overflow: 'auto',
    paddingBottom: "0.65rem",
    paddingTop: "1rem",
    px: "0.2rem",
    ...scrollBarStyles,
  },
};
