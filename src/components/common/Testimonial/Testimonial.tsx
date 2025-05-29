import Image from "next/image";
import UserImage from "../../../../public/images/user.jpg";
import { Box, Typography, Button, Stack } from "@mui/material";

const Testimonial = (): JSX.Element => {
  return (
    <Box sx={styles.testimonialContainer}>
      <Image
        width={200}
        height={200}
        alt="User Image"
        src={UserImage.src}
        style={{ borderRadius: 4 }}
      />

      <Box maxWidth={600}>
        <Typography color="#128e8c" fontWeight={500}>
          Hey, ich bin Sudipto
        </Typography>

        <Typography variant="h5" fontWeight="bold" mt={1} gutterBottom>
          Buche Dein kostenfreies Webinar
        </Typography>

        <Typography variant="body1" mb={4}>
          In 30 Minuten zeige Ich Dir alles, was Du zu immocloud und den
          unterschiedlichen Funktionen der Software wissen musst. Anschließend
          beantworte Ich Deine individuellen Fragen – alles online und flexibel.
        </Typography>

        <Stack direction="row" spacing={2}>
          <Button variant="contained" sx={styles.bookingButton}>
            Jetzt Webinar buchen
          </Button>
          <Button variant="outlined" sx={styles.tryButton}>
            Kostenlos testen
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default Testimonial;

const styles = {
  testimonialContainer: {
    py: 6,
    gap: 4,
    display: "flex",
    bgcolor: "#f7f8fb",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: { xs: "wrap", md: "nowrap" },
  },
  avatar: {
    width: 200,
    height: 200,
    borderRadius: 4,
  },
  bookingButton: {
    bgcolor: "#17ABA9",
    "&:hover": {
      bgcolor: "#128e8c",
    },
  },
  tryButton: {
    color: "#17ABA9",
    borderColor: "#17ABA9",
    "&:hover": {
      bgcolor: "#caf7f6",
      borderColor: "#2befec",
    },
  },
};
