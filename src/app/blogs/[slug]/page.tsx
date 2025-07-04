"use client";
import { Grid } from "@mui/material";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { BlogProps } from "@/typings/types";
import { articles } from "@/utils/Constants";
import BlogDetails from "@/components/common/BlogDetails/BlogDetails";
import LandingPageLayout from "@/screens/landingpage_layout/LandingPageLayout";

export default function BlogPage(): JSX.Element {
  const params = useParams();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;

  const [blog, setBlog] = useState<BlogProps>({} as BlogProps);

  useEffect(() => {
    handleSelectedBlog(slug);
  }, [slug]);

  const handleSelectedBlog = (slug: string): void => {
    const selectedBlog = articles.find((article) => article.slug === slug);
    if (selectedBlog) {
      setBlog(selectedBlog);
    } else {
      setBlog({} as BlogProps);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center bg-white justify-between">
      <LandingPageLayout>
        <Grid className="gap-20" sx={styles.pageContainer}>
          <BlogDetails article={blog} />
        </Grid>
      </LandingPageLayout>
    </main>
  );
}

const styles = {
  pageContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    minHeight: "35rem",
  },
};
