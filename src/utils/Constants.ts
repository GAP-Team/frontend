import { USER_ROLE } from "./enums";
import { BlogProps, Notification } from "@/typings/types";
import { MessageItemProps } from "@/screens/real-estate-owner/dashboard/communication-panel/types";
import { ApplicationItemProps } from "@/screens/real-estate-owner/dashboard/applications-panel/types";
import { JobItemProps } from "@/screens/real-estate-owner/cost-saving/types";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import DescriptionIcon from "@mui/icons-material/Description";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import { FilterOptionType } from "@/screens/service-provider/contracts/types";
import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";

export const listOfFacilitySubcategories: FilterOptionType[] = [
  {
    category: "Brandwache",
    items: ["Brandwache"],
  },
  {
    category: "Beratung/Planprüfung",
    items: [
      "Brandmeldeanlage - und Alarmierungsanlage",
      "Druckbehälter/Tankanlagen",
      "Elektrotechnik",
      "Feuerlöschtechnik",
      "Fördertechnik",
      "Lüftungsanlage",
      "Wassergefährdende Stoffe",
    ],
  },
  {
    category: "Brandmelde- und Alarmierungsanlagen",
    items: [
      "Brandmeldeanlage (BMA)",
      "Elektroakustische Anlage (ELA)",
      "Gebäudefunkanlage (BOS)",
      "Einbruchmeldeanlage",
    ],
  },
  {
    category: "Druckbehälter/Tankanlagen",
    items: [
      "Anlagen in explosionsgefährdeten Bereichen",
      "Druckanlagen",
      "Dampfkessel",
      "Füllanlagen",
      "Rohrleitungsprüfung",
    ],
  },
  {
    category: "Elektrotechnik",
    items: [
      "Ortsfeste elektrische Anlagen",
      "Ortsbewegliche elektrische Anlagen",
      "Netzersatzanlage (Notstromdiesel)",
      "Sicherheitsbeleuchtung",
      "Sicherheitsstromversorgung",
      "Blitzschutz",
    ],
  },
  {
    category: "Feuerlöschanlage",
    items: ["Gaslöschanlagen", "Sprinkleranlage", "Hydrantenanlage"],
  },
  {
    category: "Fördertechnik",
    items: [
      "Aufzugsanlage – Personen und Lastaufzüge",
      "Aufzugsanlage – Gütertransport",
      "Aufzugsanlage – Fassadenaufzüge",
      "Aufzugsanlage – Feuerwehraufzug",
      "Bauaufzug",
      "Fahrtreppen/Rolltreppe",
      "Fahrsteige",
    ],
  },
  {
    category: "Hebezeuge und Förderanlagen",
    items: [
      "Bagger",
      "Flurförderfahrzeuge",
      "Fassadenbefahranlagen/Dachbefahranlagen",
      "Krane",
      "Güteraufzüge",
      "Hebebühnen",
      "Hebebühnen für Autos",
      "Winden, Hub- und Zuggeräte",
    ],
  },
  {
    category: "Hygieneprüfung",
    items: [
      "Hygieneprüfung an Lüftungsanlagen",
      "Hygieneprüfung an Rückkühlwerken",
      "Hygieneprüfung am Trinkwasser",
    ],
  },
  {
    category: "Konzepterstellung",
    items: [
      "Brandschutzkonzept",
      "Gefährdungsbeurteilung",
      "Löschanlagenkonzept",
    ],
  },
  {
    category: "Lüftungsanlagen",
    items: [
      "Raumlufttechnische Anlagen RLT",
      "CO-Warnanlage",
      "Rauch und Wärmeabzugsanlage",
      "Druckbelüftungsanlage",
    ],
  },
  {
    category: "Rauchmelder in Mietwohnungen/Wohnungen",
    items: ["Rauchmelder in Mietwohnungen/Wohnungen"],
  },
  {
    category: "Tore, Türen",
    items: [
      "Automatische Schiebetüren",
      "Brandschutztüren und -tore (Kraftbetätige Fenster)",
    ],
  },
  {
    category: "Tragbare Feuerlöscher",
    items: ["Feuerlöscher"],
  },
  {
    category: "Wassergefährdende Stoffe",
    items: [
      "Anlagen zum Lagern, Abfüllen und Umschlagen (LAU)",
      "Anlagen zum Herstellen, Behandeln und Verwenden (HBV)",
      "Lagerbehälter (Diesel, Altöl, Heizöltanks, etc.)",
      "Leichtflüssigkeitsabscheider",
    ],
  },
];

export const listOfTenderTypes: FilterOptionType[] = [
  {
    category: "Unterteilung Auftragstypen (Ingenieurdienstleistungen)",
    items: [
      "Beratung/Planprüfung",
      "Brandschutzkonzept - Konzepterstellung",
      "Gefährdungsbeurteilung - Konzepterstellung",
      "Löschanlagenkonzept - Konzepterstellung",
      "Hygieneprüfung",
      "Sachverständigen-Prüfung",
    ],
  },
  {
    category:
      "Unterteilung Auftragstypen (Handwerks- und Sachkundigenleistung)",
    items: [
      "Brandwache",
      "Sachverständigen-Begleitung",
      "Sachkundigenprüfung",
      "Instandsetzung/Reparatur",
      "Wartung",
      "Errichtung/Neubau",
    ],
  },
];

export const listOfGermanStates: FilterOptionType[] = [
  {
    category: "Staaten",
    items: [
      "Baden-Württemberg",
      "Bayern",
      "Berlin",
      "Brandenburg",
      "Bremen",
      "Hamburg",
      "Hessen",
      "Niedersachsen",
      "Mecklenburg-Vorpommern",
      "Nordrhein-Westfalen",
      "Rheinland-Pfalz",
      "Saarland",
      "Sachsen",
      "Sachsen-Anhalt",
      "Schleswig-Holstein",
      "Thüringen",
    ],
  },
];

export interface Item {
  label: string;
  value: string;
}

export interface DashboardComponentsProps {
  slot?: string;
}

export interface Documents {
  documentChoice: string;
  constructionDocs: File[];
  floorplanDocs: File[];
  checkReports: File[];
  otherDocs: File[];
  serverLink: string;
}

export const germanStates: Item[] = [
  { label: "Baden-Württemberg", value: "Baden-Württemberg" },
  { label: "Bayern", value: "Bayern" }, // Bavaria
  { label: "Berlin", value: "Berlin" },
  { label: "Brandenburg", value: "Brandenburg" },
  { label: "Bremen", value: "Bremen" },
  { label: "Hamburg", value: "Hamburg" },
  { label: "Hessen", value: "Hessen" }, // Hesse
  { label: "Niedersachsen", value: "Niedersachsen" }, // Lower Saxony
  { label: "Mecklenburg-Vorpommern", value: "Mecklenburg-Vorpommern" }, // Mecklenburg-Western Pomerania
  { label: "Nordrhein-Westfalen", value: "Nordrhein-Westfalen" }, // North Rhine-Westphalia
  { label: "Rheinland-Pfalz", value: "Rheinland-Pfalz" }, // Rhineland-Palatinate
  { label: "Saarland", value: "Saarland" },
  { label: "Sachsen", value: "Sachsen" }, // Saxony
  { label: "Sachsen-Anhalt", value: "Sachsen-Anhalt" }, // Saxony-Anhalt
  { label: "Schleswig-Holstein", value: "Schleswig-Holstein" },
  { label: "Thüringen", value: "Thüringen" }, // Thuringia
];

export const applications: ApplicationItemProps[] = [];

export const messages: MessageItemProps[] = [];

export const buildingTypesList = [
  { label: "Bürogebäude", value: "Bürogebäude" }, // Office building
  { label: "Bahnhof", value: "Bahnhof" }, // Train station
  {
    label: "Einkaufscenter/Verkaufsstätte",
    value: "Einkaufscenter/Verkaufsstätte",
  }, // Shopping center/retail
  { label: "Flughafen", value: "Flughafen" }, // Airport
  { label: "Garage", value: "Garage" }, // Garage
  { label: "Pflegeheim", value: "Pflegeheim" }, // Nursing home
  {
    label: "Logisitkhalle/Produktionshalle",
    value: "Logisitkhalle/Produktionshalle",
  }, // Logistics/production hall
  { label: "Hochhaus", value: "Hochhaus" }, // Skyscraper
  { label: "Hotel", value: "Hotel" }, // Hotel
  { label: "Krankenhaus", value: "Krankenhaus" }, // Hospital
  { label: "Wohnhaus", value: "Wohnhaus" }, // Residential building
];

const mapTenderTypeItems = (items: string[]): Item[] =>
  items.map((item) => ({ label: item, value: item }));

export const tenderTypesListSV = mapTenderTypeItems(listOfTenderTypes[0].items);
export const tenderTypesListHW = mapTenderTypeItems(listOfTenderTypes[1].items);

export const jobItemListInCostPage: JobItemProps[] = [];

export const NextMaintenanceOptions = Array.from({ length: 12 }, (_, i) => ({
  label: `${i + 1} Monat${i + 1 > 1 ? "e" : ""}`,
  value: i + 1,
}));

export const NextCheckOptions = [
  {
    label: "1 Jahr",
    value: 1,
  },
  {
    label: "2 Jahr",
    value: 2,
  },
  {
    label: "3 Jahr",
    value: 3,
  },
  {
    label: "4 Jahr",
    value: 4,
  },
  {
    label: "5 Jahr",
    value: 5,
  },
  {
    label: "6 Jahr",
    value: 6,
  },
];

export const reminderOptions = [
  {
    label: "Keine",
    value: 0,
  },
  {
    label: "3 Monate",
    value: 3,
  },
  {
    label: "6 Monate",
    value: 6,
  },
  {
    label: "9 Monate",
    value: 9,
  },
  {
    label: "12 Monate",
    value: 12,
  },
];

export const autoPublishMonthsOptions = [
  {
    label: "12 Monate",
    value: 12,
  },
  {
    label: "9 Monate",
    value: 9,
  },
  {
    label: "6 Monate",
    value: 6,
  },
  {
    label: "3 Monate",
    value: 3,
  },
];

export const notifications: Notification[] = [
  {
    message: "You were chosen as a main provider for object G-302.",
    time: "25m ago",
    status: "warning",
  },
  {
    message: "You are in stop list as provider for object G-302.",
    time: "45m ago",
    status: "success",
  },
  {
    message: "You were not chosen as a main provider for object G-302.",
    time: "58m ago",
    status: "danger",
  },
  {
    message: "You were chosen as a main provider for object G-302.",
    time: "25m ago",
    status: "warning",
  },
  {
    message: "You are in stop list as provider for object G-302.",
    time: "45m ago",
    status: "success",
  },
  {
    message: "You were not chosen as a main provider for object G-302.",
    time: "58m ago",
    status: "danger",
  },
  {
    message: "You were chosen as a main provider for object G-302.",
    time: "25m ago",
    status: "warning",
  },
  {
    message: "You are in stop list as provider for object G-302.",
    time: "45m ago",
    status: "success",
  },
  {
    message: "You were not chosen as a main provider for object G-302.",
    time: "58m ago",
    status: "danger",
  },
  {
    message: "You were chosen as a main provider for object G-302.",
    time: "25m ago",
    status: "warning",
  },
  {
    message: "You are in stop list as provider for object G-302.",
    time: "45m ago",
    status: "success",
  },
  {
    message: "You were not chosen as a main provider for object G-302.",
    time: "58m ago",
    status: "danger",
  },
  {
    message: "You were chosen as a main provider for object G-302.",
    time: "25m ago",
    status: "warning",
  },
  {
    message: "You are in stop list as provider for object G-302.",
    time: "45m ago",
    status: "success",
  },
  {
    message: "You were not chosen as a main provider for object G-302.",
    time: "58m ago",
    status: "danger",
  },
];

export const numberOfEmployeesOptions = [
  {
    label: "1-5",
    value: "1-5",
  },
  {
    label: "5-10",
    value: "5-10",
  },
  {
    label: "10-50",
    value: "10-50",
  },
  {
    label: "50-100",
    value: "50-100",
  },
  {
    label: "100-500",
    value: "100-500",
  },
  {
    label: "1000",
    value: "1000",
  },
];

export interface TabsTypes {
  label: string;
  index: string;
}

export const RealEstateLandingPageTabs = [
  { label: "Dashboard", index: "0" },
  { label: "Kosteneinsparung", index: "1" },
  { label: "Ausschreibungsübersicht", index: "2" },
  { label: "Objektübersicht", index: "3" },
];

export const CHECK_DUE_SOON_DAYS = 183;
export const MAINTENANCE_DUE_SOON_DAYS = 15;

export const articles: BlogProps[] = [];

export const FAQs = [
  {
    question: "Was ist GAP?",
    answer:
      "GAP ist eine Plattform zur digitalen Immobilienverwaltung. Sie ist für Immobilienbesitzer und Hausverwaltungen konzipiert, die eine effiziente Verwaltung ihres Bestandes anstreben. Dabei verfolgen wir das Ziel, der Verwaltung die Komplexität zu nehmen und Immobilienbesitzern als digitaler Assistent zur Seite zu stehen.",
  },
  {
    question: "Welche Funktionen bietet mir GAP?",
    answer:
      "GAP bietet eine Vielzahl an Funktionen für eine effiziente Immobilienverwaltung.",
  },
  {
    question: "Wie wechsle ich zu GAP?",
    answer:
      "Der Wechsel zu GAP ist einfach und schnell. Sie können Ihre bestehenden Daten importieren und sofort loslegen.",
  },
  {
    question: "Gibt es technische Voraussetzungen?",
    answer:
      "Ja, GAP erfordert einen aktuellen Webbrowser und eine Internetverbindung.",
  },
];

export const DEFAULT_PUBLISH_MONTHS = 3;

export function getRegistrationSteps(role?: string): string[] {
  if (role === USER_ROLE.SERVICE_PROVIDER) {
    return [
      "Grundinformation",
      "Adresse der Firma",
      "Gewerbeanmeldung",
      "Fachkenntnisse",
      "Zusammenfassung",
    ];
  }
  return [
    "Grundinformation",
    "Adresse der Firma",
    "Gewerbeanmeldung",
    "Zusammenfassung",
  ];
}
export const HELP_ICON_BUTTON_COLOR = {
  GREY: "#A0ADB1",
};
export interface FeatureType {
  icon: React.ElementType;
  title: string;
  subtitle: string;
  description: string;
}

export const featuresDammy: FeatureType[] = [
  {
    icon: HomeWorkIcon,
    title: "Immobilienmanagement",
    subtitle: "Behalte den Überblick über Deine Objekte.",
    description:
      "Erhalte schnell einen Überblick über Dein Objektportfolio. Egal, ob Du Deine Mieteingänge prüfen, den Ist-Zustand erfassen oder die Betriebskostenabrechnung erstellen möchtest. Der Objektbereich ist der perfekte Ort für Dich.",
  },
  {
    icon: ConnectWithoutContactIcon,
    title: "Kommunikation & Interaktion",
    subtitle: "Digitalisiere Deine Mieterkommunikation.",
    description:
      "Versende Schreiben digital, egal ob per E-Mail, SMS oder Post. Oder lade Deine Mieter in das Mieterportal ein. Dort gibt es die Möglichkeit, Dokumente und wichtige Ansprechpartner zu teilen, Nachrichten auszutauschen oder Ankündigungen zu hinterlegen.",
  },
  {
    icon: AccountBalanceIcon,
    title: "Finanzmanagement",
    subtitle: "Erhalte die volle Kontrolle über Deine Finanzen.",
    description:
      "Erfasse neben Deinen Mieten wichtige Einnahmen und Ausgaben zu Deinen Objekten und erhalte so einen schnellen Überblick über Deinen gesamten Cashflow. Auf Basis Deiner Buchungen ist die Betriebskostenabrechnung nur noch einen Klick entfernt.",
  },
  {
    icon: DescriptionIcon,
    title: "Dokumentenmanagement",
    subtitle: "Perfekt organisiert ohne Papierkram.",
    description:
      "Digitalisiere Deine Dokumente wie z.B. Rechnungen und Verträge und verwalte sie bequem in immocloud. So stehen sie von überall und zu jederzeit zum Abruf bereit. Bei Bedarf kannst Du sie auch über das Mieterportal mit Deinen Mietern teilen.",
  },
];

export const NUMBER_OF_STATE_OPTIONS = 4;
export const NUMBER_OF_OTHER_OPTIONS = 6;

export const USER_ACTIVITY_EMAIL_TEMPLATES = {
  PASSWORD_CHANGE: "ChangePasswordTemplate",
  EMAIL_CHANGE: "ChangeEmailTemplate",
};

export const previousAdvantages = [
  "Bericht 1-7 Tage",
  "Bericht 1-7 Tage (-10%)",
  "Gewünschter Prüfzeitraum",
  "Skonto (1-3%) 7-10 Tage",
  "Kostenlose Anpassung",
  "Kostenpflichtige Anpassung",
  "Sofortiger Bericht",
  "Fristverlängerung Gratis",
  "Benutzerangebot Nummer 1",
];

export const UsersTableColumns = [
  { id: "firstName", label: "Vorname" },
  { id: "lastName", label: "Name" },
  { id: "email", label: "Email" },
  {
    id: "companyName",
    label: "Unternehmensname",
  },
  {
    id: "companyPhoneNumber",
    label: "Geschäftsnummer",
  },
  {
    id: "companyAddress",
    label: "Geschäftsadresse",
  },
  {
    id: "companyBusinessType",
    label: "Unternehmenstyp",
  },
  {
    id: "role",
    label: "Rolle",
  },
  {
    id: "companyRegistrationNumber",
    label: "Registrierungsnummer",
  },
  {
    id: "companyDocuments",
    label: "Dokumente des Unternehmens",
  },
  {
    id: "qualificationDocuments",
    label: "Qualifikations Dokumente",
  },
  {
    id: "activation",
    label: "Aktiv Status",
  },
];

// Commission GAP keeps from the total price of an accepted offer
export const GAP_COMMISSION_RATE = 0.15;
