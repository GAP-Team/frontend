import Image from "next/image";
import { Button } from "@mui/material";
import { ROUTES } from "@/utils/routes";
import { useRouter } from "next/navigation";
import Divider from "@mui/material/Divider";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import heroBackgroundPicture from "../../../../public/images/hero6.jpg";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const HeroSection = (): JSX.Element => {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleOnClick = (): void => {
    router.push(ROUTES.REGISTRATION);
  };

  return (
    <>
      <section className="bg-white w-full py-5 pt-10 md:pt-20">
        <Box
          className="grid grid-cols-1 md:grid-cols-2 mb-4 md:mb-8"
          sx={{
            px: { xs: 2, sm: 4, md: 6, lg: 8, xl: 10 },
          }}
        >
          {/* Hero Text Section */}
          <Box className="w-full text-center md:text-left mb-8 md:mb-0">
            <p style={styles.heroSubtitle}>Wir sind GAP</p>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold my-3 md:my-5">
              Deine digitale Lösung für gesetzeskonforme Immobilienverwaltung
            </h1>
            <p className="text-base md:text-lg font-semibold max-w-4xl">
              Die smarte Plattform für Immobilienbetreiber: Verwalte Deine
              Objekte und prüfe alle technischen Anlagen rechtssicher und
              effizient – mit zertifizierten Dienstleistern aus unserem
              Netzwerk.
            </p>

            <Box className="flex flex-col md:flex-row justify-between py-1 mt-8 md:mt-10">
              <Box className="flex flex-col gap-5 md:gap-8 lg:gap-10">
                <Box className="flex flex-row items-center">
                  <Box className="mr-3">
                    <TaskAltIcon
                      fontSize={isMobile ? "medium" : "large"}
                      style={{ color: "#00d8af" }}
                    />
                  </Box>
                  <Box>
                    <p className="text-sm md:text-base lg:text-lg font-normal">
                      Einfache Verwaltung von Objekten & Anlagen
                    </p>
                  </Box>
                </Box>

                <Box className="flex flex-row items-center">
                  <Box className="mr-3">
                    <AccessTimeFilledIcon
                      fontSize={isMobile ? "medium" : "large"}
                      style={{ color: "#00d8af" }}
                    />
                  </Box>
                  <Box>
                    <p className="text-sm md:text-base lg:text-lg font-normal">
                      Qualifizierte Handwerker & Sachverständige auf Knopfdruck
                    </p>
                  </Box>
                </Box>
              </Box>

              <Box className="flex flex-col gap-5 md:gap-8 lg:gap-10 mt-5 md:mt-0">
                <Box className="flex flex-row items-center">
                  <Box className="mr-3">
                    <QuestionAnswerIcon
                      fontSize={isMobile ? "medium" : "large"}
                      style={{ color: "#00d8af" }}
                    />
                  </Box>
                  <Box>
                    <p className="text-sm md:text-base lg:text-lg font-normal">
                      Automatisierte Prüfplanung nach gesetzlichen Fristen
                    </p>
                  </Box>
                </Box>

                <Box className="flex flex-row items-center">
                  <Box className="mr-3">
                    <RocketLaunchIcon
                      fontSize={isMobile ? "medium" : "large"}
                      style={{ color: "#00d8af" }}
                    />
                  </Box>
                  <Box>
                    <p className="text-sm md:text-base lg:text-lg font-normal">
                      Maximale Transparenz & Dokumentation
                    </p>
                  </Box>
                </Box>
              </Box>
            </Box>

            <Box className="flex justify-center md:justify-start mt-10">
              <Button
                component="a"
                size="large"
                sx={{
                  ...styles.registerButton,
                  fontSize: {
                    xs: "0.9rem",
                    sm: "1rem",
                    md: "1.2rem",
                    lg: "1.5rem",
                  },
                  py: { xs: 1, sm: 1.5, md: 1.7 },
                  px: { xs: 2, sm: 3, md: 4 },
                }}
                onClick={handleOnClick}
              >
                Kostenlos Testen
              </Button>
            </Box>
          </Box>

          {/* Hero Image Section */}
          <Box
            className="hidden md:block"
            sx={{
              position: "relative",
              height: { md: "25rem", lg: "35rem" },
              width: "100%",
            }}
          >
            <Image
              src={heroBackgroundPicture}
              alt="Hero Section Image"
              fill
              style={{ objectFit: "contain" }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
            />
          </Box>
        </Box>
      </section>
      <Divider sx={styles.divider} />
    </>
  );
};

export default HeroSection;

const styles = {
  heroSubtitle: {
    fontSize: "1.2rem",
    fontWeight: "600",
    color: "#00d8af",
  },
  registerButton: {
    background: "#00d8af",
    color: "#FFFFFF",
    textTransform: "none",
    borderRadius: 7,
    "&:hover": {
      background: "#17ABA9",
    },
  },
  divider: {
    mb: 2,
  },
};
