import { ListItem, Box, Typography, Chip } from "@mui/material";
import { JobItemProps } from "./types";
import { PiArrowBendDownRightBold } from "react-icons/pi";
import { getTenderStatusStyle } from "@/utils/utils";
import { VscDebugBreakpointLog } from "react-icons/vsc";
import React from "react";
import GProgressLinearBar from "@/components/stepper/GProgressLinearBar";

// JobItem component
const JobItem: React.FC<JobItemProps> = ({
  facilityType,
  tags,
  location,
  projectID,
  status,
  savingAmount,
}) => {
  const chipStyles = getTenderStatusStyle[status];

  return (
    <ListItem
      alignItems="center"
      sx={{
        display: "flex",
        justifyContent: "space-between",
        padding: "1rem",
        backgroundColor: "#FFFFFF", // White background for each item
        borderRadius: "12px", // Rounded corners
        boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.1)", // Soft shadow
        gap: "1rem",
      }}
    >
      {/* Left column: facilityType + tags */}
      <Box sx={{ display: "flex", flexDirection: "column", flex: 2 }}>
        <Typography variant="bodylsb" sx={styles.facilityType}>
          {facilityType}
        </Typography>
        <Box sx={styles.tags}>
          {tags.map((tag: string, index: number) => (
            <Chip
              key={index}
              icon={<VscDebugBreakpointLog color="black" />}
              label={tag}
              size="small"
              sx={styles.tagChip}
            />
          ))}
        </Box>
      </Box>

      {/* Middle column: location + projectID */}
      <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <Typography variant="body2" color="bodylsb" sx={styles.location}>
          {location}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", mt: 0.5 }}>
          <PiArrowBendDownRightBold color="#A0ADB1" />
          <Typography variant="body2" sx={styles.projectID}>
            {projectID}
          </Typography>
        </Box>
      </Box>

      {/* Right column: savingsContainer */}
      <Box sx={styles.savingsContainer}>
        <Typography variant="bodylsb" pb={1}>
          Einsparung {savingAmount} €
        </Typography>
        {/* Using MUI LinearProgress as progress bar */}
        <GProgressLinearBar
          maxValue={1000}
          value={savingAmount} // Cap at 100 for the progress bar
        />
      </Box>

      {/* Final column: Status Chip */}
      <Chip label={status} sx={{ ...chipStyles, ...styles.statusChip }} />
    </ListItem>
  );
};

export default JobItem;

const styles = {
  facilityType: {
    fontWeight: 600,
    fontSize: "1rem",
  },
  tags: {
    display: "flex",
    gap: "0.5rem",
    flexWrap: "wrap",
    mt: 0.5,
  },
  tagChip: {
    backgroundColor: "#E0F7FA", // Light blue background for tags
    color: "#00796B",
    fontSize: "0.75rem",
  },
  location: {
    mt: 0.5,
    fontSize: "0.875rem",
  },
  projectID: {
    ml: 0.5,
    color: "#A0ADB1",
    fontSize: "0.875rem",
  },
  savingsContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    flex: 1, // Equal width column
    mx: 2,
  },
  savingAmount: {
    fontSize: "1rem",
    fontWeight: 600,
    color: "#388E3C", // Green color for savings amount
    mb: 0.5,
  },
  progressBar: {
    width: "100px", // Set width of progress bar
    height: "8px", // Set height of progress bar
    backgroundColor: "#C8E6C9", // Light green background for progress track
    "& .MuiLinearProgress-bar": {
      backgroundColor: "#4CAF50", // Green color for the progress
    },
  },
  statusChip: {
    fontSize: "0.75rem",
    padding: "0.25rem 0.5rem",
    borderRadius: "12px",
  },
};
