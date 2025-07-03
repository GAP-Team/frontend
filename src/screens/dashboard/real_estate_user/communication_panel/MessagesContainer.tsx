// The list component now uses JobApplicationItem for each job application.
import React from "react";
import { List } from "@mui/material";
import {MessageItemProps } from "./types";
import Message from "./Message";
import { scrollBarStyles } from "@/components/scrollbar/Scrollbar";

interface MessagesProps {
  messages: MessageItemProps[];
}

const MessagesContainer: React.FC<MessagesProps> = ({ messages: messages }) => {
  return (
    <List sx={styles.listContainer}>
      {messages.map((app, index) => (
        <Message key={index} {...app} />
      ))}
    </List>
  );
};

export default MessagesContainer;

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
