"use client";
import Image from "next/image";
import {
  Box,
  Grid,
  Typography,
  Link,
  useTheme,
  useMediaQuery,
} from "@mui/material";

const SupportCenterSection = (): JSX.Element => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Box
      sx={{
        px: isMobile ? 2 : 10,
        py: isMobile ? 2 : 10,
      }}
    >
      <Grid container spacing={4} alignItems="center">
        <Grid item xs={12} md={6}>
          <Typography
            variant="subtitle1"
            fontWeight="bold"
            gutterBottom
            sx={[styles.textColor, { marginBottom: "3rem" }]}
          >
            Unsere Kontaktkanäle
          </Typography>
          <Typography
            variant="h4"
            component="h2"
            fontWeight="bold"
            gutterBottom
          >
            Bei Fragen zu immocloud <br />
            helfen wir Dir gerne weiter!
          </Typography>

          {/* E-Mail */}
          <Box mt={4}>
            <Typography variant="h6" fontWeight="bold">
              E-Mail
            </Typography>
            <Typography>Schreib uns eine E-Mail an:</Typography>
            <Link href="mailto:info@immocloud.de" sx={styles.textColor}>
              info@immocloud.de
            </Link>
          </Box>

          {/* Webinare */}
          <Box mt={4}>
            <Typography variant="h6" fontWeight="bold">
              Webinare
            </Typography>
            <Typography>
              Wir bieten Dir kostenfreie Webinare an. Unsere immocloud Experten
              zeigen Dir in 30 Minuten alles, was Du zu immocloud wissen musst:
            </Typography>
            <Link href="#" sx={styles.textColor}>
              Mehr zu den Webinaren
            </Link>
          </Box>

          {/* Telefon */}
          <Box mt={4}>
            <Typography variant="h6" fontWeight="bold">
              Telefon
            </Typography>
            <Typography>
              Ruf uns montags bis freitags von 9 bis 17 Uhr an:
            </Typography>
            <Link href="tel:021197537490" sx={styles.textColor}>
              0211 / 975 374 90
            </Link>
          </Box>

          {/* WhatsApp */}
          <Box mt={4}>
            <Typography variant="h6" fontWeight="bold">
              WhatsApp
            </Typography>
            <Typography>Schreib uns per WhatsApp unter:</Typography>
            <Link
              href="https://wa.me/4915792396242"
              sx={styles.textColor}
              target="_blank"
            >
              0157 92396242
            </Link>
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box sx={styles.imageHolder}>
            <Image
              priority
              width={800}
              height={600}
              style={styles.image}
              alt="Immocloud Support"
              src="/images/hero6.jpg"
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SupportCenterSection;

const styles = {
  imageHolder: {
    borderRadius: 2,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "auto",
    borderRadius: "16px",
  },
  textColor: {
    color: "#31AFAD",
  },
};
