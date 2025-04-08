import { Box, Grid } from "@mui/material";
import { articles } from "@/utils/Constants";
import BlogCard from "@/components/card/BlogCard";

const BolgsOverview = ():JSX.Element => {
    return (
        <>
            <Box sx={styles.box}>
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
}

export default BolgsOverview;

const styles = {
    box: {
        paddingTop: "5rem",
        paddingLeft: "10rem",
        paddingRight: "10rem",
        paddingBottom: "10rem",
    }
}