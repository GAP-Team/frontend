// JobList.tsx
import React from "react";
import { List } from "@mui/material";
import { JobItemProps } from "./types";
import JobItem from "./JobItem";

interface JobListProps {
  jobs: JobItemProps[];
}

const JobList: React.FC<JobListProps> = ({ jobs }) => {
  return (
    <List sx={styles.listContainer}>
      {jobs.map((job, index) => (
        <JobItem key={index} {...job} />
      ))}
    </List>
  );
};

export default JobList;

const styles = {
  listContainer: {
    display: "flex",
    flexDirection: "column",
    paddingTop: 0,
    gap: "1rem", // Gap between rows instead of dividers
    paddingRight: "0.65rem",
    overflowY: "auto", // Add scrollbar
    maxHeight: "81vh", // Adjust height to make it scrollable
  },
};
