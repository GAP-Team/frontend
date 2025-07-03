import GBadge from "../../data_display/badge/GBadge";
import { Box, Grid } from "@mui/material";
import { articles } from "@/utils/Constants";
import BlogCard from "@/components/surfaces/card/BlogCard";

const BlogsOverview = (): JSX.Element => {
  return (
    <>
      <Box sx={styles.box}>
        <Grid sx={styles.batchHolder}>
          <GBadge color="#d0ede8" title="Unsere Blogs" />
        </Grid>
        <Grid container spacing={4}>
          {articles.map((article, index) => (
            <Grid item xs={12} sm={12} md={6} lg={4} key={index}>
              <BlogCard article={article} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default BlogsOverview;

const styles = {
  box: {
    paddingTop: "5rem",
    paddingLeft: "10rem",
    paddingRight: "10rem",
    paddingBottom: "10rem",
  },
  batchHolder: {
    display: "flex",
    alignItems: "center",
    marginBottom: "2rem",
    justifyContent: "center",
  },
};
