// The list component now uses JobApplicationItem for each job application.
import React from "react";
import { List } from "@mui/material";
import { NewsItemProps as MessageItemProps } from "./types";
import Message from "./NewsItem";
import { scrollBarStyles } from "@/components/scrollbar/Scrollbar";

interface MessagesProps {
  messages: MessageItemProps[];
}

const MessageContainer: React.FC<MessagesProps> = ({ messages: messages }) => {
  return (
    <List sx={styles.listContainer}>
      {messages.map((app, index) => (
        <Message key={index} {...app} />
      ))}
    </List>
  );
};

export default MessageContainer;

// Styles
const styles = {
  listContainer: {
    display: "flex",
    flexDirection: "column",
    paddingRight: "0.65rem", // Add padding to the bottom for the scrollbar
    gap: "1.25rem",
    overflowY: "auto",
    ...scrollBarStyles,
  },
};
