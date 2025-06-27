// The list component now uses JobApplicationItem for each job application.
import React from "react";
import { List } from "@mui/material";
import { NewsItemProps } from "./types";
import NewsItem from "./NewsItem";
// FIXME: if it is style why it is defined as tsx and there are two styles what are the difference between them?
import { scrollBarStyles } from "@/components/ui/scrollbar/Scrollbar";

interface NewsListProps {
  news: NewsItemProps[];
}

const NewsList: React.FC<NewsListProps> = ({ news }) => {
  return (
    <List sx={styles.listContainer}>
      {news.map((app, index) => (
        <NewsItem key={index} {...app} />
      ))}
    </List>
  );
};

export default NewsList;

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