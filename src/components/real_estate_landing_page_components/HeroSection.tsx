import Image from "next/image";
import { Button, Divider } from "@mui/material";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import heroBackgroundPicture from "../../../public/images/hero6.jpg";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";

const HeroSection = (): JSX.Element => {
  return (
    <>
      <section className="bg-white w-full py-5">
        <div className="relative grid grid-cols-2 mb-8 pl-32">
          {/* Hero Text Section */}
          <div
            className="w-full text-center xl:text-left "
            style={styles.heroImageHolder}
          >
            <p style={styles.heroSubtitle}>Wir sind immocloud</p>
            <h1 className="text-4xl font-bold my-5">
              Die Software fur Deine <br />
              Immobilienverwaltung
            </h1>
            <p className="text-lg font-semibold max-w-4xl mx-auto">
              Lorem ipsum dolor sit amet consectetur adipiscing elit. Eaque sed
              tenetur rem quam nihil dolorum <br />
              expedita maxime nisi recusandae sequi magni culpa fuga accusamus
              eveniet fugiat ipsum ab.
            </p>
            <div className="flex flex-col grid-cols-2 py-1 ml-20">
              <div className="flex flex-row gap-5 sm:gap-7 md:gap-10 lg:gap-20 mt-14 justify-between lg:justify-start">
                <div className="grid-cols-2 flex flex-row">
                  <div className="w-full text-center">
                    <TaskAltIcon
                      fontSize="large"
                      style={{ color: "#00d8af" }}
                    />
                  </div>
                  <div className="w-full text-center min-w-60">
                    <p
                      className="text-lg font-normal max-w-4xl mx-auto"
                      style={styles.heroFeatureText}
                    >
                      Simply Dummy Text
                    </p>
                  </div>
                </div>
                <div className="grid-cols-2 flex flex-row">
                  <div className="w-full text-center">
                    <QuestionAnswerIcon
                      fontSize="large"
                      style={{ color: "#00d8af" }}
                    />
                  </div>
                  <div className="w-full text-center min-w-60">
                    <p
                      className="text-lg font-normal max-w-4xl mx-auto"
                      style={styles.heroFeatureText}
                    >
                      Simply Dummy Text
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-row gap-5 sm:gap-7 md:gap-10 lg:gap-20 mt-14 justify-between lg:justify-start">
                <div className="grid-cols-2 flex flex-row">
                  <div className="w-full text-center">
                    <AccessTimeFilledIcon
                      fontSize="large"
                      style={{ color: "#00d8af" }}
                    />
                  </div>
                  <div className="w-full text-center min-w-60">
                    <p
                      className="text-lg font-normal max-w-4xl mx-auto"
                      style={styles.heroFeatureText}
                    >
                      Simply Dummy Text
                    </p>
                  </div>
                </div>
                <div className="grid-cols-2 flex flex-row">
                  <div className="w-full text-center">
                    <RocketLaunchIcon
                      fontSize="large"
                      style={{ color: "#00d8af" }}
                    />
                  </div>
                  <div className="w-full text-center min-w-60">
                    <p
                      className="text-lg font-normal max-w-4xl mx-auto"
                      style={styles.heroFeatureText}
                    >
                      Simply Dummy Text
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-row gap-5 sm:gap-7 md:gap-10 lg:gap-20 mt-14 justify-center lg:justify-start">
              <Button
                component="a"
                href="/login"
                className="block px-5 py-2 mt-4 text-center rounded-lg text-md"
                size="small"
                style={styles.registerButton}
                sx={{
                  textTransform: "none",
                  whiteSpace: "pre",
                  fontSize: "15px",
                }}
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
        <Divider />
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
      background: "###17ABA9",
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
    fontSize: "25px",
  },
};
