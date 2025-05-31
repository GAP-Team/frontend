"use client";
import Image from "next/image";
import StatisticsCard from "@/components/card/StatisticsCard";
import { Box, Container, Typography, Grid } from "@mui/material";
import heroBackgroundPicture from "../../../../public/images/hero6.jpg";

const AboutUsSection = (): JSX.Element => {
  const stats = [
    { value: "+350.000", label: "Einheiten in der Verwaltung" },
    { value: "+5.200.000", label: "Automatisch zugeordnete Mieten" },
    { value: "+60.000", label: "Betriebskostenabrechnungen erstellt" },
    { value: "+10.000", label: "Zufriedene Kunden" },
    { value: "+7", label: "Jahre am Markt" },
    { value: "+25", label: "Motivierte Mitarbeiter" },
  ];

  return (
    <>
      <section className="bg-white w-full mb-4 ">
        <div className="relative">
          <Image
            alt=""
            src={heroBackgroundPicture}
            className="absolute inset-0 object-cover w-full h-60"
          />
          <div className="relative bg-gray-900 bg-opacity-0 h-[300px]">
            <div className="ml-0 pt-1 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl ">
              <div className="flex flex-col items-start">
                <div className="w-full xl:mb-0 xl:px-80">
                  <div className="bg-white bg-opacity-90 rounded-xl shadow-2xl p-4">
                    <div className="flex justify-center flex-col">
                      <Typography
                        variant="h6"
                        color="primary"
                        style={styles.headingText}
                      >
                        Einfach, Sicher, Digital
                      </Typography>
                      <Typography variant="h3" style={styles.subHeadingText}>
                        Wir sind GAP
                      </Typography>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <Container maxWidth="xl" sx={styles.innerContainer}>
            {/* Statistics Section */}
            <Box textAlign="center" my={4}>
              <Typography
                variant="subtitle2"
                color="primary"
                style={styles.statHeadingTest}
              >
                Fakten
              </Typography>
              <Typography
                variant="h4"
                gutterBottom
                style={styles.statSubHeadingText}
              >
                GAP in Zahlen
              </Typography>
            </Box>

            <div style={styles.divider} />

            <Grid
              container
              spacing={3}
              justifyContent="center"
              style={styles.statsHolder}
            >
              {stats.map((stat, index) => (
                <StatisticsCard stat={stat} index={index} key={index} />
              ))}
            </Grid>
          </Container>
        </div>
      </section>
    </>
  );
};

export default AboutUsSection;

const styles = {
  innerContainer: {
    marginTop: "5rem",
    maxWidth: "100rem",
    textAlign: "center",
    marginBottom: "5rem",
  },
  headingText: {
    color: "#47b6b5",
    fontWeight: 600,
    fontSize: "1.2rem",
  },
  subHeadingText: {
    color: "#333",
    fontWeight: 800,
    fontSize: "2.5rem",
  },
  statHeadingTest: {
    color: "#47b6b5",
    fontWeight: 500,
    fontSize: "1.5rem",
  },
  statSubHeadingText: {
    color: "#333",
    fontWeight: 600,
    fontSize: "2.5rem",
  },
  divider: {
    width: "10%",
    height: "4px",
    backgroundColor: "#47b6b5",
    marginLeft: "45%",
  },
  statsHolder: {
    marginTop: "2rem",
    marginBottom: "2rem",
  },
};
