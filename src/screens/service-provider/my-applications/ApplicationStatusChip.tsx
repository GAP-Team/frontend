import React from "react";
import Chip from "@mui/material/Chip";
import { ApplicationStatus } from "./types";
import { STATUS_COLORS, STATUS_LABELS } from "./constants";

interface ApplicationStatusChipProps {
  status: ApplicationStatus;
}

const ApplicationStatusChip: React.FC<ApplicationStatusChipProps> = ({
  status,
}) => (
  <Chip
    size="small"
    label={STATUS_LABELS[status]}
    sx={{ ...chipStyles, ...STATUS_COLORS[status] }}
  />
);

export default ApplicationStatusChip;

const chipStyles = {
  fontWeight: 600,
  fontSize: "0.75rem",
};
