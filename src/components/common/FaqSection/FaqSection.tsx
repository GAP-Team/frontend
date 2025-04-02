import React, { useState } from "react";
import {
  Accordion,
  Container,
  Typography,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

const faqs = [
  {
    question: "Was ist immocloud?",
    answer:
      "immocloud ist eine Plattform zur digitalen Immobilienverwaltung. Sie ist für Immobilienbesitzer und Hausverwaltungen konzipiert, die eine effiziente Verwaltung ihres Bestandes anstreben. Dabei verfolgen wir das Ziel, der Verwaltung die Komplexität zu nehmen und Immobilienbesitzern als digitaler Assistent zur Seite zu stehen.",
  },
  {
    question: "Welche Funktionen bietet mir immocloud?",
    answer:
      "immocloud bietet eine Vielzahl an Funktionen für eine effiziente Immobilienverwaltung.",
  },
  {
    question: "Wie wechsle ich zu immocloud?",
    answer:
      "Der Wechsel zu immocloud ist einfach und schnell. Sie können Ihre bestehenden Daten importieren und sofort loslegen.",
  },
  {
    question: "Gibt es technische Voraussetzungen?",
    answer:
      "Ja, immocloud erfordert einen aktuellen Webbrowser und eine Internetverbindung.",
  },
];

const FAQSection = (): JSX.Element => {
  const [expanded, setExpanded] = useState<number | null>(null);

  const handleChange =
    (panel: number) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : null);
    };

  return (
    <div className="w-full mx-auto p-5 flex flex-col">
      <div className="relative grid mb-8 pl-32">
        <div className="w-full font-medium">
          <Container maxWidth="xl">
            <Typography variant="h4" align="center" gutterBottom>
              Häufige Fragen
            </Typography>
            {faqs.map((faq, index) => (
              <Accordion
                key={index}
                expanded={expanded === index}
                onChange={handleChange(index)}
              >
                <AccordionSummary
                  expandIcon={
                    expanded === index ? (
                      <RemoveCircleIcon sx={{ color: "#36B4B2" }} />
                    ) : (
                      <AddCircleIcon />
                    )
                  }
                >
                  <Typography
                    sx={[
                      styles.question,
                      {
                        fontWeight:
                          expanded === index ? styles.open : styles.normal,
                      },
                    ]}
                  >
                    {faq.question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography sx={styles.answer}>{faq.answer}</Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Container>
        </div>
      </div>
    </div>
  );
};

export default FAQSection;

const styles = {
  question: {
    padding: "1rem",
    fontWeight: "600",
    fontSize: "1.4rem",
  },
  answer: {
    fontSize: "1.2rem",
  },
  open: {
    fontWeigt: "bold",
    color: "#36B4B2",
  },
  normal: {
    fontWeigt: "bold",
    color: "#646464",
  },
};
