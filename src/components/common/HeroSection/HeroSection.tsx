import Image from "next/image";
import { Button } from "@mui/material";
import { ROUTES } from "@/utils/routes";
import { useRouter } from "next/navigation";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import heroBackgroundPicture from "../../../../public/images/hero6.jpg";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";

const HeroSection = (): JSX.Element => {
  const router = useRouter();

  const handleOnClick = (): void => {
    router.push(ROUTES.REGISTER);
  };

  return (
    <>
      <section className="bg-white w-full py-5 pt-20">
        <div className="relative grid grid-cols-2 mb-8 pl-32">
          {/* Hero Text Section */}
          <div
            className="w-full text-center xl:text-left "
            style={styles.heroImageHolder}
          >
            <p style={styles.heroSubtitle}>Wir sind GAP</p>
            <h1 className="text-4xl font-bold my-5">
              Deine digitale Lösung für gesetzeskonforme Immobilienverwaltung
            </h1>
            <p className="text-lg font-semibold max-w-4xl mx-auto">
              Die smarte Plattform für Immobilienbetreiber: Verwalte Deine
              Objekte und prüfe alle technischen Anlagen rechtssicher und
              effizient – mit zertifizierten Dienstleistern aus unserem
              Netzwerk.
            </p>
            <div className="flex flex-row justify-between grid-cols-2 py-1">
              <div className="flex flex-col gap-5 sm:gap-7 md:gap-10 lg:gap-20 mt-14">
                <div className="grid-cols-2 flex flex-row">
                  <div className="w-2/12">
                    <TaskAltIcon
                      fontSize="large"
                      style={{ color: "#00d8af" }}
                    />
                  </div>
                  <div className="w-full min-w-60">
                    <p
                      className="text-sm font-normal max-w-4xl mx-auto"
                      style={styles.heroFeatureText}
                    >
                      Einfache Verwaltung von Objekten & Anlagen
                    </p>
                  </div>
                </div>

                <div className="grid-cols-2 flex flex-row">
                  <div className="w-2/12">
                    <AccessTimeFilledIcon
                      fontSize="large"
                      style={{ color: "#00d8af" }}
                    />
                  </div>
                  <div className="w-full min-w-60">
                    <p
                      className="text-sm font-normal max-w-4xl mx-auto"
                      style={styles.heroFeatureText}
                    >
                      Qualifizierte Handwerker & Sachverständige auf Knopfdruck
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-5 sm:gap-7 md:gap-10 lg:gap-20 mt-14">
                <div className="grid-cols-2 flex flex-row">
                  <div className="w-2/12">
                    <QuestionAnswerIcon
                      fontSize="large"
                      style={{ color: "#00d8af" }}
                    />
                  </div>
                  <div className="w-full min-w-60">
                    <p
                      className="text-sm font-normal max-w-4xl mx-auto"
                      style={styles.heroFeatureText}
                    >
                      Automatisierte Prüfplanung nach gesetzlichen Fristen
                    </p>
                  </div>
                </div>

                <div className="grid-cols-2 flex flex-row">
                  <div className="w-2/12">
                    <RocketLaunchIcon
                      fontSize="large"
                      style={{ color: "#00d8af" }}
                    />
                  </div>
                  <div className="w-full min-w-60">
                    <p
                      className="text-sm font-normal max-w-4xl mx-auto"
                      style={styles.heroFeatureText}
                    >
                      Maximale Transparenz & Dokumentation
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-row gap-5 sm:gap-7 md:gap-10 lg:gap-20 mt-14 justify-center lg:justify-start">
              <Button
                component="a"
                className="block px-5 py-2 mt-4 text-center rounded-lg text-md"
                size="small"
                style={styles.registerButton}
                sx={{
                  textTransform: "none",
                  whiteSpace: "pre",
                  fontSize: "15px",
                }}
                onClick={handleOnClick}
              >
                Kostenlos Testen
              </Button>
            </div>
          </div>
          {/* Hero Image Section */}
          <div className={` 2xl:block pb-20 `}>
            <div style={styles.heroImageHolder}>
              <Image
                src={heroBackgroundPicture}
                alt="Hero Section Image"
                width={50}
                height={10}
                style={{
                  width: "100px",
                  height: "50px",
                }}
                layout="responsive"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;

const styles = {
  heroSubtitle: {
    fontSize: "1.5rem",
    fontWeight: "600",
    color: "#00d8af",
  },
  registerButton: {
    background: "#00d8af",
    color: "#FFFFFF",
    padding: "0.7rem",
    paddingRight: "1.7rem",
    paddingLeft: "1.7rem",
    borderRadius: 7,
    fontSize: "1.5rem",
    "&:hover": {
      background: "#17ABA9",
    },
  },
  heroTextHolder: {
    marginLeft: "5rem",
  },
  heroImageHolder: {
    width: "52rem",
    height: "35rem",
    marginLeft: "1rem",
  },
  heroFeatureText: {
    fontSize: "22px",
    lineHeight: "1.6rem",
  },
};
