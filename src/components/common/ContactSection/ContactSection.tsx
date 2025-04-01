"use client";
import ContactForm from "../ContactForm/ContactForm";
import { Box, Container, Typography } from "@mui/material";

const ContactSection = (): JSX.Element => {
  return (
    <section className="bg-white w-full mb-4 ">
      <Box>
        {/* Gradient Background */}
        <Box sx={styles.gradientBox}>
          <Typography
            sx={styles.title}
            variant="h3"
            fontWeight="bold"
            color="white"
          >
            Kontakt
          </Typography>
        </Box>

        {/* Content Section */}
        <Container maxWidth="md" sx={styles.innerContainer}>
          <Typography
            variant="h5"
            fontWeight="bold"
            color="primary"
            sx={styles.heading}
          >
            Vielen Dank für Ihr Interesse an GAP!
          </Typography>
          <Typography variant="body1" sx={styles.description}>
          Als GAP (Gesetzliche Anlagen Prüfung) setzen wir neue Maßstäbe für die digitale Immobilienverwaltung. Unser Ziel: "Best in Class" bei Effizienz, Rechtssicherheit und Servicequalität.
          Wir arbeiten nah an unseren Kunden und vermitteln zertifizierte Experten für gesetzlich vorgeschriebene Prüfungen.
          </Typography>
          <Typography variant="body1" sx={styles.description}>
          Sie möchten mehr erfahren oder ein individuelles Beratungsgespräch vereinbaren? Schreiben Sie uns!
          </Typography>
          <ContactForm />
        </Container>
      </Box>
    </section>
  );
};

export default ContactSection;

const styles = {
  gradientBox: {
    background: "linear-gradient(to right, #008000, #00A2B5, #D8DB1E)",
    padding: "50px 0",
    textAlign: "left",
    minHeight: "25rem",
  },
  title: {
    fontSize: "5rem",
    marginTop: "15rem",
    marginLeft: "20rem",
  },
  innerContainer: {
    marginTop: "5rem",
    maxWidth: "70rem",
    textAlign: "center",
    marginBottom: "5rem",
  },
  heading: {
    color: "#000",
    fontSize: "2.5rem",
  },
  description: {
    color: "#333",
    fontSize: "1.2rem",
    marginTop: "3.5rem",
    textAlign: "justify",
    marginBottom: "3.5rem",
  },
};
