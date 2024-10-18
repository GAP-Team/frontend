import React from "react";
import {
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  SxProps,
  Theme,
} from "@mui/material";
import { FaCircleCheck } from "react-icons/fa6";

export interface NotificationProps {
  notification: {
    message: string;
    time: string;
    status: "success" | "warning" | "danger";
  };
}

const NotificationItem: React.FC<NotificationProps> = ({ notification }) => {
  // Determine color based on status
  const iconColor =
    notification.status === "success"
      ? "#3DCAB9"
      : notification.status === "warning"
        ? "#FF9209"
        : "#EB4444";

  return (
    <ListItem sx={styles.listItem}>
      <ListItemAvatar sx={styles.listItemAvatar}>
        <FaCircleCheck color={iconColor} size={"1.5rem"} />
      </ListItemAvatar>
      <ListItemText
        primary={
          <Typography variant="body2">{notification.message}</Typography>
        }
        secondary={notification.time}
      />
    </ListItem>
  );
};

export default NotificationItem;

// Styles
const styles: Record<string, SxProps<Theme>> = {
  listItem: {
    alignItems: "flex-start",
  },
  listItemAvatar: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    mt: "8px",
  },
};
