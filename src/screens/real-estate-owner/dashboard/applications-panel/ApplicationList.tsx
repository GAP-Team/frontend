// The list component now uses JobApplicationItem for each job application.
import React from "react";
import { List } from "@mui/material";
import { ApplicationItemProps } from "./types";
import ApplicationItem from "./ApplicationItem";
import GEmptyState from "@/components/data-display/GEmptyState";
import { styles as scrollbarStyles } from "@/components/utils/scrollbar/styles";

interface ApplicationListProps {
  applications: ApplicationItemProps[];
}

const ApplicationList: React.FC<ApplicationListProps> = ({ applications }) => {
  if (applications.length === 0) {
    return <GEmptyState text="Keine Bewerbungen vorhanden" compact />;
  }

  return (
    <List sx={styles.listContainer}>
      {applications.map((app, index) => (
        <ApplicationItem key={index} {...app} />
      ))}
    </List>
  );
};

export default ApplicationList;

// Styles
const styles = {
  listContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    paddingRight: "0.65rem",
    overflowY: "auto",
    ...scrollbarStyles,
  },
};
