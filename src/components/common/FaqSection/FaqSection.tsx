import React, { useState } from "react";
import {
  Grid,
  Accordion,
  Container,
  Typography,
  AccordionSummary,
  AccordionDetails,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RoundButton from "@/components/button/RoundButton";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { FAQs } from "@/utils/Constants";

interface FAQSectionProps {
  customerType: string;
  onScrollToContact: () => void;
}

const FAQSection = ({
  customerType,
  onScrollToContact,
}: FAQSectionProps): JSX.Element => {
  const [expanded, setExpanded] = useState<number | null>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const handleChange =
    (panel: number) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : null);
    };

  return (
    <div className="w-full mx-auto p-5 flex flex-col">
      <div
        className={`relative grid mb-8 ${
          isMobile ? "pl-4" : isTablet ? "pl-16" : "pl-32"
        }`}
      >
        <div className="w-full font-medium">
          <Container maxWidth="xl" sx={{ px: isMobile ? 1 : 3 }}>
            <Typography
              variant="h4"
              align="center"
              gutterBottom
              sx={{
                fontSize: {
                  xs: "1.5rem",
                  sm: "1.75rem",
                  md: "2rem",
                },
              }}
            >
              Häufige Fragen von {customerType}
            </Typography>
            {FAQs.map((faq, index) => (
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
                  <Typography
                    sx={{
                      ...styles.answer,
                      fontSize: {
                        xs: "0.9rem",
                        sm: "1rem",
                        md: "1.2rem",
                      },
                    }}
                  >
                    {faq.answer}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Container>
          <Grid sx={styles.buttonHolder}>
            <Typography
              style={{
                ...styles.buttonLable,
                fontSize: isMobile ? "1rem" : isTablet ? "1.1rem" : "1.2rem",
                marginTop: isMobile ? "1rem" : "2rem",
                marginBottom: isMobile ? "1rem" : "2rem",
              }}
            >
              Deine Frage ist nicht dabei?
            </Typography>
            <RoundButton
              text="Jetzt kontakt anufnehmen"
              color="#FFFFFF"
              hoverColor="rgb(86 78 78)"
              borderColor="rgb(86 78 78)"
              handleOnClick={onScrollToContact}
            />
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default FAQSection;

const styles = {
  question: {
    fontWeight: "600",
    fontSize: {
      xs: "1rem",
      sm: "1.2rem",
      md: "1.4rem",
    },
    padding: {
      xs: "0.5rem",
      sm: "0.75rem",
      md: "1rem",
    },
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
  buttonLable: {
    marginTop: "2rem",
    fontSize: "1.2rem",
    fontWeight: "bold",
    marginBottom: "2rem",
  },
  buttonHolder: {
    display: "flex",
    marginTop: "2rem",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
  },
};
