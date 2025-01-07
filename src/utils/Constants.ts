import { Notification } from "@/components/navigation/GAppbar/types";

export const listOfTrades = [
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

export const listOfOrderTypes = [
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
    ],
  },
];

export interface Item {
  label: string;
  value: string;
}

export interface Documentation {
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

export const applications = [
  {
    companyName: "Mayer Prüfungs GmbH",
    timeAgo: "vor 30 Minuten",
    location: "G003 Mittelstraße 121",
    projectID: "A0382",
    price: "4.036,00",
    statusColor: "#3498db",
    avatarLetter: "M",
  },
  {
    companyName: "Mayer Prüfungs GmbH",
    timeAgo: "vor 30 Minuten",
    location: "G003 Mittelstraße 121",
    projectID: "A0382",
    price: "4.036,00",
    statusColor: "#3498db",
    avatarLetter: "M",
  },
  {
    companyName: "Mayer Prüfungs GmbH",
    timeAgo: "vor 30 Minuten",
    location: "G003 Mittelstraße 121",
    projectID: "A0382",
    price: "4.036,00",
    statusColor: "#3498db",
    avatarLetter: "M",
  },
  {
    companyName: "Mayer Prüfungs GmbH",
    timeAgo: "vor 30 Minuten",
    location: "G003 Mittelstraße 121",
    projectID: "A0382",
    price: "4.036,00",
    statusColor: "#3498db",
    avatarLetter: "M",
  },
  {
    companyName: "Mayer Prüfungs GmbH",
    timeAgo: "vor 30 Minuten",
    location: "G003 Mittelstraße 121",
    projectID: "A0382",
    price: "4.036,00",
    statusColor: "#3498db",
    avatarLetter: "M",
  },
  {
    companyName: "Mayer Prüfungs GmbH",
    timeAgo: "vor 30 Minuten",
    location: "G003 Mittelstraße 121",
    projectID: "A0382",
    price: "4.036,00",
    statusColor: "#3498db",
    avatarLetter: "M",
  },
  // ...other applications
];

export const news = [
  {
    companyName: "Mayer Prüfungs GmbH",
    numberOfMessages: 3,
    location: "G003 Mittelstraße",
    minLeft: 30,
    statusNew: true,
    avatarLetter: "MX",
  },
  {
    companyName: "Bauer Bauunternehmen",
    numberOfMessages: 5,
    location: "G202 Hauptstraße",
    minLeft: 45,
    statusNew: false,
    avatarLetter: "BB",
  },
  {
    companyName: "Schmidt Sanierung GmbH",
    numberOfMessages: 2,
    location: "A113 Am Wald",
    minLeft: 10,
    statusNew: true,
    avatarLetter: "SS",
  },
  {
    companyName: "Fischer Finanzen KG",
    numberOfMessages: 6,
    location: "C410 Clara-Zetkin-Weg",
    minLeft: 20,
    statusNew: true,
    avatarLetter: "FF",
  },
  {
    companyName: "Klein Konditorei AG",
    numberOfMessages: 4,
    location: "P224 Parkallee",
    minLeft: 25,
    statusNew: false,
    avatarLetter: "KK",
  },
  {
    companyName: "Lang Landschaftsbau GmbH",
    numberOfMessages: 1,
    location: "U345 Uferstraße",
    minLeft: 5,
    statusNew: true,
    avatarLetter: "LL",
  },
  {
    companyName: "Gross Gastronomie GmbH",
    numberOfMessages: 3,
    location: "B101 Bahnhofstraße",
    minLeft: 15,
    statusNew: false,
    avatarLetter: "GG",
  },
  {
    companyName: "Becker Bäckerei GmbH",
    numberOfMessages: 2,
    location: "S123 Sonnenweg",
    minLeft: 40,
    statusNew: false,
    avatarLetter: "BB",
  },
  {
    companyName: "Zimmermann Zimmerei GmbH",
    numberOfMessages: 4,
    location: "L333 Lindenstraße",
    minLeft: 50,
    statusNew: true,
    avatarLetter: "ZZ",
  },
  {
    companyName: "Weber Werkstatt AG",
    numberOfMessages: 3,
    location: "M666 Mühlenstraße",
    minLeft: 35,
    statusNew: false,
    avatarLetter: "WW",
  },
  {
    companyName: "Schneider Schneiderei KG",
    numberOfMessages: 1,
    location: "F555 Freiheitsstraße",
    minLeft: 60,
    statusNew: true,
    avatarLetter: "SS",
  },
];

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

export const tenderTypesListHW = [
  { label: "Reperatur", value: "Reperatur" },
  { label: "Wartung", value: "Wartung" },
  { label: "Installation", value: "Installation" },
  { label: "Prüfung", value: "Prüfung" },
  { label: "SV Begleitung", value: "SV Begleitung" },
  { label: "Beratung/Planprüfung", value: "Beratung/Planprüfung" },
  { label: "Konzepterstellung BSK", value: "Konzepterstellung BSK" },
  {
    label: "Konzepterstellung Löschanlage",
    value: "Konzepterstellung Löschanlage",
  },
  { label: "Brandwache", value: "Brandwache" },
];

export const tenderTypesListSV = [
  {
    label: "Arbeitsstättenverordnung - Gesundheitsschutz der Beschäftigte",
    value: "Arbeitsstättenverordnung - Gesundheitsschutz der Beschäftigte",
  },
  {
    label:
      "Betriebssicherheitsverordnung (ZÜS) - Sicherheit Maschinen und Anlagen",
    value:
      "Betriebssicherheitsverordnung (ZÜS) - Sicherheit Maschinen und Anlagen",
  },
  {
    label: "Baurechtliche Prüfung - Gesetzlicher Brandschutz",
    value: "Baurechtliche Prüfung - Gesetzlicher Brandschutz",
  },
  {
    label: "DGUV - Deutsche Gesetzliche Unfallversicherung",
    value: "DGUV - Deutsche Gesetzliche Unfallversicherung",
  },
  {
    label: "Elektrische Anlagen - VDE 0105-100",
    value: "Elektrische Anlagen - VDE 0105-100",
  },
  {
    label: "Konzepterstellung - Brandschutzkonzept",
    value: "Konzepterstellung - Brandschutzkonzept",
  },
  {
    label: "Hygiene Prüfung Lüftung - VDI 6022",
    value: "Hygiene Prüfung Lüftung - VDI 6022",
  },
  {
    label: "Hygiene Prüfung Trinkwasser - VDI 6023",
    value: "Hygiene Prüfung Trinkwasser - VDI 6023",
  },
  {
    label: "Versicherungsprüfung - VdS Prüfung",
    value: "Versicherungsprüfung - VdS Prüfung",
  },
  {
    label: "Wassergefährdete Stoffe - AwsV Prüfung",
    value: "Wassergefährdete Stoffe - AwsV Prüfung",
  },
];

export const DocumentTypes = {
  SONSTIGE: "SONSTIGE",
  GRUNDRISSE: "GRUNDRISSE",
  BAUUNTERLAGEN: "BAUUNTERLAGEN",
  BERICHTE: "BERICHTE PRÜFEN",
};

export const dummyFacilities = [
  {
    id: 1,
    name: "Facility A",
    facilityType: "Feuerlöschanlage",
    subcategory: "Gaslöschanlage",
    contactPerson: "John Doe",
    servicingType: "Type A",
    lastCheckOderMaintenanceDate: { $date: "2023-01-01T00:00:00.000Z" },
    nextCheckIn: 2,
    isPublishAutomatically: true,
    publishAutomaticallyInMonth: 6,
    reminderInMonth: 3,
    isReminderEnabled: true,
    isEmailNotificationEnabled: true,
    emailNotificationList: ["example1@domain.com", "example2@domain.com"],
    createdAt: "2023-08-07T12:34:56Z",
    updatedAt: "2024-08-08T12:34:56Z",
    __v: 0,
  },
  {
    id: 2,
    name: "Facility B",
    facilityType: "Brandmeldanlage",
    subcategory: "Warehouse",
    contactPerson: "Jane Smith",
    servicingType: "Type B",
    lastCheckOderMaintenanceDate: { $date: "2023-02-15T00:00:00.000Z" },
    nextCheckIn: 12,
    isPublishAutomatically: false,
    publishAutomaticallyInMonth: 0,
    reminderInMonth: 1,
    isReminderEnabled: true,
    isEmailNotificationEnabled: false,
    emailNotificationList: [],
    createdAt: "2023-09-10T10:22:45Z",
    updatedAt: "2024-08-08T10:22:45Z",
    __v: 1,
  },
  {
    id: 3,
    name: "Facility C",
    facilityType: "Structure",
    subcategory: "Bridge",
    contactPerson: "Mark Johnson",
    servicingType: "Type C",
    lastCheckOderMaintenanceDate: { $date: "2023-05-21T00:00:00.000Z" },
    nextCheckIn: 6,
    isPublishAutomatically: true,
    publishAutomaticallyInMonth: 3,
    reminderInMonth: 2,
    isReminderEnabled: true,
    isEmailNotificationEnabled: true,
    emailNotificationList: ["admin@domain.com"],
    createdAt: "2023-10-01T08:10:30Z",
    updatedAt: "2024-08-08T08:10:30Z",
    __v: 2,
  },
  {
    id: 4,
    name: "Facility D",
    facilityType: "Building",
    subcategory: "School",
    contactPerson: "Emily Davis",
    servicingType: "Type D",
    lastCheckOderMaintenanceDate: { $date: "2023-07-10T00:00:00.000Z" },
    nextCheckIn: 9,
    isPublishAutomatically: false,
    publishAutomaticallyInMonth: 0,
    reminderInMonth: 4,
    isReminderEnabled: false,
    isEmailNotificationEnabled: false,
    emailNotificationList: [],
    createdAt: "2023-11-15T14:15:22Z",
    updatedAt: "2024-08-08T14:15:22Z",
    __v: 3,
  },
  {
    id: 5,
    name: "Facility E",
    facilityType: "Infrastructure",
    subcategory: "Dam",
    contactPerson: "Michael Brown",
    servicingType: "Type E",
    lastCheckOderMaintenanceDate: { $date: "2023-03-03T00:00:00.000Z" },
    nextCheckIn: 24,
    isPublishAutomatically: true,
    publishAutomaticallyInMonth: 12,
    reminderInMonth: 6,
    isReminderEnabled: true,
    isEmailNotificationEnabled: true,
    emailNotificationList: ["maintenance@domain.com", "safety@domain.com"],
    createdAt: "2023-12-01T09:30:00Z",
    updatedAt: "2024-08-08T09:30:00Z",
    __v: 4,
  },
];

export const jobItemListInCostPage = [
  {
    facilityType: "Brandschutzprüfung inkl. Reparatur",
    tags: ["Brandschutz", "Wasserschutz", "Inserlation"],
    location: "G001 Mittelstraße 121",
    projectID: "A1001",
    savingAmount: 50,
    status: "offen",
  },
  {
    facilityType: "Brandschutzprüfung inkl. Reparatur",
    tags: ["Brandschutz", "Wasserschutz", "Inserlation"],
    location: "G002 Mittelstraße 121",
    projectID: "A1002",
    savingAmount: 800,
    status: "abgeschlossen",
  },
  {
    facilityType: "Brandschutzprüfung inkl. Reparatur",
    tags: ["Brandschutz", "Wasserschutz", "Inserlation"],
    location: "G003 Mittelstraße 121",
    projectID: "A1003",
    savingAmount: 420,
    status: "in Bearbeitung",
  },
  {
    facilityType: "Brandschutzprüfung inkl. Reparatur",
    tags: ["Brandschutz", "Wasserschutz", "Inserlation"],
    location: "G004 Mittelstraße 121",
    projectID: "A1004",
    savingAmount: 275,
    status: "Freigabe ausstehend",
  },
  {
    facilityType: "Brandschutzprüfung inkl. Reparatur",
    tags: ["Brandschutz", "Wasserschutz", "Inserlation"],
    location: "G005 Mittelstraße 121",
    projectID: "A1005",
    savingAmount: 530,
    status: "Nachprüfung",
  },
  {
    facilityType: "Brandschutzprüfung inkl. Reparatur",
    tags: ["Brandschutz", "Wasserschutz", "Inserlation"],
    location: "G006 Mittelstraße 121",
    projectID: "A1006",
    savingAmount: 610,
    status: "offen",
  },
  {
    facilityType: "Brandschutzprüfung inkl. Reparatur",
    tags: ["Brandschutz", "Wasserschutz", "Inserlation"],
    location: "G007 Mittelstraße 121",
    projectID: "A1007",
    savingAmount: 710,
    status: "abgeschlossen",
  },
  {
    facilityType: "Brandschutzprüfung inkl. Reparatur",
    tags: ["Brandschutz", "Wasserschutz", "Inserlation"],
    location: "G008 Mittelstraße 121",
    projectID: "A1008",
    savingAmount: 290,
    status: "in Bearbeitung",
  },
  {
    facilityType: "Brandschutzprüfung inkl. Reparatur",
    tags: ["Brandschutz", "Wasserschutz", "Inserlation"],
    location: "G009 Mittelstraße 121",
    projectID: "A1009",
    savingAmount: 750,
    status: "Freigabe ausstehend",
  },
  {
    facilityType: "Brandschutzprüfung inkl. Reparatur",
    tags: ["Brandschutz", "Wasserschutz", "Inserlation"],
    location: "G010 Mittelstraße 121",
    projectID: "A1010",
    savingAmount: 880,
    status: "Nachprüfung",
  },
];

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
    label: "Vor 3 Monate",
    value: 3,
  },
  {
    label: "Vor 6 Monate",
    value: 6,
  },
  {
    label: "Vor 9 Monate",
    value: 9,
  },
  {
    label: "Vor 12 Monate",
    value: 12,
  },
];
export const autoPublishMonthsOptions = [
  {
    label: "alle 12 Monate",
    value: 12,
  },
  {
    label: "alle 9 Monate",
    value: 9,
  },
  {
    label: "alle 6 Monate",
    value: 6,
  },
  {
    label: "alle 3 Monate",
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
