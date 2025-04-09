import Image from "next/image";
import { BlogProps } from "@/typings/types";
import { Person } from "@mui/icons-material";
import { Typography, Box, Chip, Card, CardContent } from "@mui/material";

const BlogCard: React.FC<{ article: BlogProps }> = ({
  article,
}): JSX.Element => {
  const handleClick = (slug: string): void => {
    window.location.href = `/blogs/${slug}`;
  };

  return (
    <Card
      elevation={2}
      sx={styles.container}
      onClick={() => handleClick(article.slug)}
    >
      <Box sx={styles.imageContainer}>
        <Image
          src={article.image}
          alt="article image"
          style={{ ...styles.image }}
        />
        <Chip size="small" sx={styles.chip} label={article.category} />
      </Box>
      <CardContent style={styles.cardContent}>
        <Typography
          variant="body2"
          color="text.secondary"
          mb={1}
          style={styles.cardDate}
        >
          {article.date}
        </Typography>
        <Typography
          variant="h6"
          fontWeight={700}
          gutterBottom
          style={styles.cardTitle}
        >
          {article.title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={styles.cardExcerpt}
        >
          {article.excerpt}
        </Typography>
      </CardContent>

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
    cursor: "pointer",
    minHeight: "35rem",
    borderRadius: "10px",
    flexDirection: "column",
  },
  imageContainer: {
    position: "relative",
    borderTopLeftRadius: "10px",
    borderTopRightRadius: "10px",
  },
  image: {
    height: "auto",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  chip: {
    top: 10,
    left: 10,
    position: "absolute",
    backgroundColor: "#eee",
  },
  cardContent: {
    borderBottom: "1px solid rgb(232 211 211)",
    minHeight: "16rem",
  },
  cardDate: {
    fontSize: "1rem",
  },
  cardTitle: {
    fontSize: "1.5rem",
  },
  cardExcerpt: {
    fontSize: "1.2rem",
    display: "-webkit-box",
    WebkitLineClamp: 3,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  autherContainer: {
    padding: "0.5rem",
    paddingTop: "1rem",
  },
};
