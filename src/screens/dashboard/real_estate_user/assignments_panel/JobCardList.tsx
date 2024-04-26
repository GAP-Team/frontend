import React from "react";
import Box from "@mui/material/Box";
import JobCard from "./JobCard";
import { jobCardsData } from "@/utils/Constants";

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
// Enhanced elegant scrollbar styles with blue color and additional border-radius
const scrollBarStyles = {
  "&::-webkit-scrollbar": {
    width: "8px",
    height: "4px",
    backgroundColor: "transparent", // Ensures scrollbar is fully transparent initially
  },
  "&:hover::-webkit-scrollbar": {
    backgroundColor: "rgba(35, 86, 255, 0.1)", // Visible on hover with a subtle blue background
  },
  "&::-webkit-scrollbar-track": {
    borderRadius: "12px",
    backgroundColor: "transparent", // Keeps track fully transparent initially
  },
  "&:hover::-webkit-scrollbar-track": {
    backgroundColor: "rgba(35, 86, 255, 0.05)", // Track becomes visible on hover with a very light blue
  },
  "&::-webkit-scrollbar-thumb": {
    borderRadius: "12px",
    backgroundColor: "transparent", // Keeps thumb fully transparent initially
  },
  "&:hover::-webkit-scrollbar-thumb": {
    backgroundImage: "linear-gradient(180deg, #2356FF 0%, #637bFF 100%)", // Gradient from custom blue to lighter blue
    backgroundColor: "rgba(35, 86, 255, 0.3)", // Thumb becomes solid on hover with a translucent blue
  },
};

const styles = {
  listContainer: {
    paddingTop: "1rem",
    px: "0.2rem",
    paddingBottom: "0.65rem", // Add padding to the bottom for the scrollbar
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    maxWidth: "80rem",
    flexShrink: "0",
    gap: "1.25rem",
    overflowX: "auto",
    ...scrollBarStyles,
  },
};
