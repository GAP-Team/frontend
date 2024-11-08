import Box from "@mui/material/Box";
import Image, { StaticImageData } from "next/image";
import Typography from "@mui/material/Typography";
import GButton from "@/components/button/GButton";
import React from "react";

interface NoContentPageProps {
  alt: string;
  title: string;
  width: number;
  height: number;
  buttonLabel: string;
  buttonLink?: string;
  description?: string;
  image: StaticImageData;
}

const NoContentPage: React.FC<NoContentPageProps> = ({
  alt,
  title,
  image,
  width,
  height,
  buttonLabel,
  buttonLink,
  description,
}) => {
  return (
    <Box sx={styles.container}>
      <Image
        alt={alt}
        src={image}
        width={width}
        height={height}
        style={{ marginBottom: "1.5rem" }}
      />
      <Typography variant="h4sb">{title}</Typography>
      <Typography
        variant="bodymr"
        style={{ maxWidth: "22rem", textAlign: "center", color: "#8D999C" }}
      >
        {description}
      </Typography>
      <GButton style={{ marginTop: "1rem" }} href={buttonLink}>
        {buttonLabel}
      </GButton>
    </Box>
  );
};

export default NoContentPage;

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    height: "calc(100vh - 9.125rem)",
    px: "1.5rem",
    pt: "1.5rem",
    pb: 0,
  },
};
