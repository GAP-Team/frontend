import Box from "@mui/material/Box";
import Image, { StaticImageData } from "next/image";
import Typography from "@mui/material/Typography";
import GButton from "@/components/ui/button/GButton";
import React from "react";

interface NoContentSectionProps {
  image: StaticImageData;
  alt: string;
  title: string;
  buttonLabel?: string;
  buttonLink?: string;
  description?: string;
}

const NoContentSection: React.FC<NoContentSectionProps> = ({
  image,
  alt,
  title,
  buttonLabel,
  buttonLink,
  description,
}) => {
  return (
    <Box sx={styles.container}>
      <Image
        width={400}
        height={400}
        alt={alt}
        style={{ marginBottom: "1.5rem" }}
        src={image}
      />
      <Typography variant="h4sb">{title}</Typography>
      <Typography
        variant="bodymr"
        style={{ maxWidth: "22rem", textAlign: "center", color: "#8D999C" }}
      >
        {description}
      </Typography>
      {buttonLabel && (
        <GButton style={{ marginTop: "1rem" }} href={buttonLink}>
          {buttonLabel}
        </GButton>
      )}
    </Box>
  );
};

export default NoContentSection;

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
