import React from "react";
import Image from "next/image";
import { Person } from "@mui/icons-material";
import { BlogCardProps } from "@/typings/types";
import { Card, CardContent } from "@mui/material";
import { Typography, Box, Avatar, Grid, Chip } from "@mui/material";

const BlogCard: React.FC<BlogCardProps> = ({ article }): JSX.Element => {
    return (
      <Card elevation={2} sx={styles.container}>
        <Box sx={styles.imageContainer}>
          <Image src={article.image} alt="article image" style={{ ...styles.image }} />
          <Chip
            size="small"
            label={article.category}
            sx={{ position: "absolute", top: 10, left: 10, backgroundColor: "#eee" }}
          />
        </Box>
        <CardContent style={styles.cardContent}>
          <Typography variant="body2" color="text.secondary" mb={1} style={styles.cardDate} >
            {article.date}
          </Typography>
          <Typography variant="h6" fontWeight={700} gutterBottom style={styles.cardTitle}>
            {article.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" style={styles.cardExcerpt}>
            {article.excerpt}
          </Typography>
        </CardContent>
        <hr />
        <Box display="flex" sx={styles.autherContainer} alignItems="center" p={2}>
          <Person fontSize="small" sx={{ marginRight: 0.5 }} />
          <Typography variant="body2" color="text.secondary">
            {article.author}
          </Typography>
        </Box>
      </Card>
    );
};

export default BlogCard;

const styles = {
    container: {
        padding: 2,
        display: "flex", 
        minHeight: "55rem",
        borderRadius: "10px",
        flexDirection: "column",
    },
    imageContainer: {
        height: 400,
        position: "relative",
        borderTopLeftRadius: "10px",
        borderTopRightRadius: "10px",
    },
    image: {
        height: "auto", 
        borderTopLeftRadius: 16, 
        borderTopRightRadius: 16, 
    },
    cardContent: {
        padding: "5rem",
        borderBottom: "1px solid #F9F9F9",
    },
    cardDate: {
        fontSize: "1rem",        
    },
    cardTitle: {
        fontSize: "1.5rem",
    },
    cardExcerpt: {
        fontSize: "1.2rem",
    },
    autherContainer: {
        padding: "0.5rem",
    }
}