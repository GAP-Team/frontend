// The list component now uses JobApplicationItem for each job application.
import React from 'react';
import { List } from '@mui/material';
import { ApplicationItemProps } from './types';
import ApplicationItem from './ApplicationItem';
import { scrollBarStyles } from '@/components/scrollbar/Scrollbar';

interface ApplicationListProps {
  applications: ApplicationItemProps[];
}

const ApplicationList: React.FC<ApplicationListProps> = ({ applications }) => {
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
    display: 'flex',
    flexDirection:'column',
    // py: "0.2rem",
    paddingRight: "0.65rem", // Add padding to the bottom for the scrollbar
    flexWrap: "nowrap",
    maxHeight: "18rem",
    flexShrink: "0",
    gap: "1rem",
    overflowY: "auto",
    ...scrollBarStyles,
  },
};
