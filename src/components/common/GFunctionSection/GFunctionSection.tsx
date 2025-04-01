import React from "react";
import Link from "next/link";

import Badge from "../../badge/GBadge";
import classes from "./GFunctionSection.module.scss";
import TitleSection from "../../label/title-section";
import { ContractSvgIcon } from "../../../../public/svg/ContractSvgIcon";
import { SolutionSvgIcon } from "../../../../public/svg/SolutionSvgIcon";
import { RegisterSvgIcon } from "../../../../public/svg/RegisterSvgIcon";


const GFunctionSection = (): JSX.Element => {
  return (
    <div className="mx-auto p-5 flex flex-col justify-center items-center">
      <TitleSection
        title="So funktioniert GAP für Dienstleister"
        subtitle="Mit GAP finden Sie gezielt passende Aufträge von Immobilienbetreibern – digital, einfach und ohne Umwege."
        badge={<Badge title="In 3 Schritten zum Erfolg" color="#ffeecc" />}
      />
      <div className="flex flex-wrap justify-center md:justify-between items-center max-w-screen-xl">
        <ServiceStep
          title="Profil anlegen & Qualifikationen angeben"
          subtitle="Erstellen Sie Ihr Unternehmensprofil in wenigen Minuten und hinterlegen Sie Ihre Gewerke und Leistungen."
          icon={<RegisterSvgIcon className="inline-block  w-10 h-10 stroke-2" />}
        />
        <IconSeparator />
        <ServiceStep
          title="Passende Aufträge erhalten"
          subtitle="Sobald ein Immobilienbetreiber einen Auftrag in Ihrem Bereich ausschreibt, werden Sie automatisch informiert."
          icon={<ContractSvgIcon className="inline-block  w-10 h-10 stroke-2" />}
        />
        <IconSeparator />
        <ServiceStep
          title="Angebote abgeben & Kunden gewinnen"
          subtitle="Geben Sie direkt ein Angebot ab – ganz ohne Vermittler. Sie entscheiden, welche Aufträge Sie annehmen möchten."
          icon={<SolutionSvgIcon className="inline-block  w-10 h-10 stroke-2" />}
        />
      </div>
      <Link
        className="mb-8 bg-[#ffb41f] hover:bg-yellow-400 font-bold text-white px-6 py-3 mt-12 rounded-lg shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        href="/login"
      >
        Jetzt loslegen und Auftrag sichern
        <span className="ml-2 text-lg font-bold text-white ">{"->"}</span>
      </Link>
    </div>
  );
};
const IconSeparator = (): JSX.Element => {
  return (
    // Adjust width or padding as needed to fit the icons between the cards
    <div className="md:flex justify-center items-center w-auto mx-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        className="hidden md:block w-14 h-14"
      >
        <path
          d="M22 12C22 6.48 17.52 2 12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12ZM12 14.79V13H9C8.45 13 8 12.55 8 12C8 11.45 8.45 11 9 11H12V9.21C12 8.76 12.54 8.54 12.85 8.86L15.64 11.65C15.84 11.85 15.84 12.16 15.64 12.36L12.85 15.15C12.54 15.46 12 15.24 12 14.79Z"
          fill="#ffbe3d"
        />
      </svg>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        className="md:hidden w-14 h-14"
      >
        <path
          d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM15.79 11.71L12.71 14.79C12.32 15.18 11.69 15.18 11.29 14.79L8.21 11.71C7.82 11.32 7.82 10.68 8.21 10.29C8.6 9.9 9.23 9.9 9.62 10.29L12 12.67L14.38 10.29C14.77 9.9 15.4 9.9 15.79 10.29C16.18 10.68 16.18 11.32 15.79 11.71Z"
          fill="#ffbe3d"
        />
      </svg>
    </div>
  );
};
const ServiceStep = ({
  title,
  subtitle,
  icon,
}: {
  icon: any;
  subtitle: string;
  title: string;
}): JSX.Element => {
  return (
    <div className="w-full md:w-auto md:flex-1 p-4 max-w-screen-xl">
      <div
        className={`"bg-base-100 border border-black shadow-xl hover:shadow-2xl transition-shadow duration-300" ${classes.card}`}
      >
        <figure className="px-10 pt-10">
          <div style={styles.iconHolder}>{icon}</div>
        </figure>
        <div className={`${classes.card_body}`}>
          <h2 className={`${classes.card_title}`}>{title}</h2>
          <p className={`${classes.card_subtitle}`}>{subtitle}</p>
        </div>
      </div>
    </div>
  );
};
export default GFunctionSection;

const styles = {
  iconHolder: {
    maxWidth: "3.5rem",
  },
};
