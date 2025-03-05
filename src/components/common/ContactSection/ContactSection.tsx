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
            Vielen Dank für Ihr Interesse an SPIE!
          </Typography>
          <Typography variant="body1" sx={styles.description}>
            Wir als SPIE Germany Switzerland Austria streben danach, &apos; best
            in class &apos; zu sein – bei unseren Ergebnissen und bei den
            Dienstleistungen für unsere Kunden. Wir sind nah am operativen
            Geschäft, nah an unseren Kunden, nah an unseren Teams. Sie suchen
            einen starken Partner an Ihrer Seite oder haben Fragen? Wir freuen
            uns auf Ihre Nachricht!
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
