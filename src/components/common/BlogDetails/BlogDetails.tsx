import Image from "next/image";
import { BlogProps } from "@/typings/types";
import { Box, Typography, Container, Divider } from "@mui/material";

const BlogDetail: React.FC<{ article: BlogProps }> = ({
  article,
}): JSX.Element => {
  return (
    <Box sx={{ width: "100%", backgroundColor: "#f5f5f5" }}>
      {/* Header Image with Title Overlay */}
      <Box
        sx={{
          position: "relative",
          height: { xs: 300, md: 450 },
          width: "100%",
        }}
      >
        <Image
          fill
          alt="Blog Cover"
          src={article.image}
          style={{ objectFit: "cover" }}
        />
        <Box sx={styles.headingBox}>
          <Typography variant="h4" fontWeight={700}>
            {article.title}
          </Typography>
        </Box>
      </Box>

      {/* Content Section */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography
          variant="body1"
          paragraph
          sx={{ fontSize: "1.2rem", lineHeight: 1.5 }}
        >
          {article.excerpt}
        </Typography>

        <Divider sx={{ my: 4 }} />

        <Typography
          variant="h6"
          fontWeight={600}
          gutterBottom
          sx={{ fontSize: "1.3rem", lineHeight: 1.5 }}
        >
          Was ist § 6b EStG?
        </Typography>
        <Typography
          variant="body1"
          paragraph
          sx={{ fontSize: "1.2rem", lineHeight: 1.5 }}
        >
          Der § 6b EStG erlaubt es Steuerpflichtigen, Gewinne aus dem Verkauf
          von Grundstücken und Gebäuden steuerlich zu begünstigen. Konkret
          können die Veräußerungsgewinne aus der Veräußerung von Grundbesitz
          unter bestimmten Voraussetzungen steuerfrei auf spezielle Rücklagen
          übertragen werden. Diese Rücklagen können später für Reinvestitionen
          genutzt werden.
        </Typography>

        {/* You can continue more sections here if needed */}
      </Container>
    </Box>
  );
};

export default BlogDetail;

const styles = {
  headingBox: {
    px: 2,
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    textAlign: "center",
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
};
