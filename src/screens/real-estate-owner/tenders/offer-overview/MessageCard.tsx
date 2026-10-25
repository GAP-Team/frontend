import React, { useState } from "react";
import { Paper, Typography } from "@mui/material";
import HeaderSection from "@/screens/real-estate-owner/dashboard/HeaderSection";

interface MessageCardProps {
  message: string;
}

const COLLAPSED_LINES = 3;

// Long messages are clamped so they cannot blow up the layout; a click on the
// text toggles the full message.
const MessageCard: React.FC<MessageCardProps> = ({ message }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Paper sx={styles.paper}>
      <HeaderSection titletext="NACHRICHT DES ANBIETERS" />
      <Typography
        variant="body1"
        onClick={() => setExpanded((value) => !value)}
        title={expanded ? "Einklappen" : "Gesamte Nachricht anzeigen"}
        sx={{
          ...styles.message,
          ...(!expanded && {
            display: "-webkit-box",
            WebkitLineClamp: COLLAPSED_LINES,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }),
        }}
      >
        {message}
      </Typography>
    </Paper>
  );
};

export default MessageCard;

const styles = {
  paper: {
    display: "flex",
    flexDirection: "column",
    maxWidth: "false",
    width: "100%",
    borderRadius: "0.8rem",
    p: "1.25rem",
  },
  message: {
    cursor: "pointer",
    whiteSpace: "pre-wrap",
    overflowWrap: "anywhere",
  },
};
