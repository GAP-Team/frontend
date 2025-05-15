import Image from "next/image";
import { ReactNode } from "react";
import { Button } from "@mui/material";
import GBadge from "@/components/badge/GBadge";
import classes from "./GStatSection.module.scss";
import GCountDown from "@/components/countdown/GCountDown";

interface GStatSectionProps {
  title?: string;
  subtitle?: string;
  badge?: ReactNode;
}

const GStatSection: React.FC<GStatSectionProps> = ({
  title = "GAP ist Ihr Partner für gesetzliche Anlagenprüfung!",
  subtitle = "Wir sind Ihre Plattform für rechtssichere Prüfungen und Wartungen. GAP vereinfacht Prozesse, spart Zeit und verbindet Sie mit erfahrenen Dienstleistern.",
  badge = <GBadge title="Darum GAP" color="#ccdfeb" />,
}) => {
  return (
    <div className="w-full mx-auto flex flex-col lg:flex-row justify-center items-center gap-6 sm:gap-8 md:gap-10 lg:gap-20 py-16 md:py-40 p-12 bg-[#e4e4e7] text-lg">
      <div className="w-full lg:max-w-2xl p-8 text-center xl:text-left">
        {badge}
        <h1 className="text-4xl font-bold my-5">{title}</h1>
        <p className="text-lg font-normal max-w-4xl mx-auto">{subtitle}</p>
        <div className="flex justify-center xl:justify-start pt-16">
          <Button
            component="a"
            href="/login"
            className="block px-5 py-2 mt-4 text-center rounded-lg text-md"
            size="small"
            style={styles.registerButton}
            sx={{
              textTransform: "none",
              whiteSpace: "pre",
            }}
          >
            Jetzt anmeldung
          </Button>
        </div>
        <div className="flex flex-row gap-5 sm:gap-7 md:gap-10 lg:gap-20 mt-14 justify-center lg:justify-start">
          <GCountDown label="Ausschreibungen" counter={12000} />
          <GCountDown label="Offene Aufträge" counter={77} />
          <GCountDown label="Immobilien" counter={100} />
        </div>
      </div>
      <div className={`hidden 2xl:block ${classes.diamond_container}`}>
        <div className={classes.diamond_grid__inner}>
          {[...Array(4)].map((_, i) => (
            <div
              className={classes.diamond_grid__item}
              style={styles.imageHolder}
              key={i}
            >
              <Image
                width={300}
                height={300}
                src="/images/hero6.jpg"
                alt="Image description"
                className={classes.diamond_grid__img}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GStatSection;

const styles = {
  registerButton: {
    background: "#005e99",
    color: "#FFFFFF",
    padding: "0.7rem",
    paddingRight: "1.7rem",
    paddingLeft: "1.7rem",
    borderRadius: 7,
    fontSize: "15px",
    "&:hover": {
      background: "#0071b8",
    },
  },
  imageHolder: {
    width: "300px",
    height: "300px",
  },
};
