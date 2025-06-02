"use client";
import { useCallback, useRef } from "react";
import ContactForm from "../ContactForm/ContactForm";
import { Box, Container, Typography } from "@mui/material";
import FAQSection from "@/components/common/FaqSection/FaqSection";

const ContactSection = (): JSX.Element => {
  const contactRef = useRef<HTMLDivElement | null>(null);

  const handleScrollToContactForm = useCallback((): void => {
    contactRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

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
        {/* FAQ Section */}
        <FAQSection
          customerType="Dienstleister"
          onScrollToContact={handleScrollToContactForm}
        />
        <FAQSection
          customerType="Immobilienbetreiber"
          onScrollToContact={handleScrollToContactForm}
        />
        {/* Content Section */}
        <section ref={contactRef} id="contact-content">
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
              Als GAP (Gesetzliche Anlagen Prüfung) setzen wir neue Maßstäbe für
              die digitale Immobilienverwaltung. Unser Ziel: &quot;Best in
              Class&quot; bei Effizienz, Rechtssicherheit und Servicequalität.
              Wir arbeiten nah an unseren Kunden und vermitteln zertifizierte
              Experten für gesetzlich vorgeschriebene Prüfungen.
            </Typography>
            <Typography variant="body1" sx={styles.description}>
              Sie möchten mehr erfahren oder ein individuelles Beratungsgespräch
              vereinbaren? Schreiben Sie uns!
            </Typography>
            <ContactForm />
          </Container>
        </section>
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
    fontSize: {
      xs: "2.5rem",
      sm: "3.5rem",
      md: "4rem",
      lg: "5rem",
    },
    marginTop: {
      xs: "6rem",
      sm: "10rem",
      md: "12rem",
      lg: "15rem",
    },
    marginLeft: {
      xs: "2rem",
      sm: "8rem",
      md: "12rem",
      lg: "20rem",
    },
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
