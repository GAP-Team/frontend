export const listOfTrades = [
  {
    category: "Brandmeldeanlagen",
    items: ["Rauchmelder", "Optischemelder"],
  },
  {
    category: "Fördertechnik",
    items: ["Aufzüge", "Rolltreppen"],
  },
  {
    category: "Feuerlöschanlagen:",
    items: ["Sprinkleranlagen", "Gaslöschanlagen"],
  },
  {
    category: "Elektrotechnik",
    items: ["Elektrische Schaltschränke"],
  },
  {
    category: "Elektrische Arbeits - und Betriebsmittel:",
    items: ["Leiter", "Hebebühnen", "Steckdosen"],
  },
  {
    category: "Lüftungsanlagen",
    items: ["RWA", "RDA", "CO-Warnanlagen"],
  },
  {
    category: "Druckanlagen",
    items: [
      "Druckluftwasserbehälter",
      "Druckgeräte",
      "Druckbehälter",
      "Dampfkesselanlagen",
    ],
  },
];
export const listOfOrderTypes = [
  {
    category: "Unterteilung Auftragstypen (Nur für SV)",
    items: [
      "Arbeitsstättenverordnung - Gesundheitsschutz der Beschäftigte",
      "Betriebssicherheitsverordnung (ZÜS) - Sicherheit Maschinen und Anlagen",
      "Bauordnungsrechtliche Prüfung - Gesetzlicher Brandschutz",
      "DGUV - Deutsche Gesetzliche Unfallversicherung",
      "Elektrische Anlagen – VDE 0105-100",
      "Konzepterstellung - Brandschutzkonzept",
      "Hygiene Prüfung Lüftung – VDI 6022",
      "Hygiene Prüfung Trinkwasser – VDI 6023",
      "Versicherungsprüfung – VdS Prüfung",
      "Wassergefährdete Stoffe – AwsV Prüfung",
    ],
  },
  {
    category: "Unterteilung Auftragstypen (Nur für HW)",
    items: [
      "Wartung/Instandhaltung",
      "Instandsetzung/Reparatur",
      "SV-Begleitung Abnahme",
      "SV-Begleitung Wiederkehrende-Prüfung",
    ],
  },
];

interface Item {
  label: string;
  value: string;
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

interface Detail {
  label: string;
  value: string;
}

// Registration default dummy values
export const grundinformation: Detail[] = [
  { label: "Vorname", value: "Maximillian" },
  { label: "Nachname", value: "Müller-Maier" },
  { label: "E-mail-Adresse", value: "müller-maire@gmail.com" },
  { label: "Unternehmen", value: "Fire Protection GmbH" },
];

export const ansprechpartner: Detail[] = [
  { label: "Vorname", value: "Maximillian" },
  { label: "Nachname", value: "Müller-Maier" },
  { label: "E-Mail-Adresse", value: "müller-maire@gmail.com" },
  { label: "Tel. Nummer", value: "+4916090010020" },
];

export const adresse: Detail[] = [
  { label: "Land", value: "Germany" },
  { label: "Bundesland", value: "Mecklenburg-Vorpom..." },
  { label: "Straße", value: "Heinrich-Baumann Str. 49" },
  { label: "Hausnummer", value: "123" },
  { label: "Postleitzahl", value: "19061" },
  { label: "Stadt", value: "Schwerin" },
];

// Objekt/Building Values
export const buildingInformation: Detail[] = [
  { label: "Name", value: "G302 - Mittelstraße 14" },
  { label: "Area", value: "24.58" },
  { label: "Gebäude Type", value: "Wohngebäude" },
];

export const buildingContactPersonList: Detail[] = [
  { label: "Name", value: "Markus Richter" },
];

export const buildingAddress: Detail[] = [
  { label: "Address", value: "Mittelstraße 14" },
  { label: "Postleitzahl", value: "47475" },
  { label: "Stadt", value: "Kamp-Lintfort" },
  { label: "State", value: "Mittelstraße 14" },
  { label: "Bundesland", value: "Nordrhein-Westfahlen" },
];

export const buildingDocs: Detail[] = [
  { label: "File", value: "Objektplan A10-29 c.pdf" },
];

export const jobCardsData = [
  {
    id: "1",
    status: "offen",
    offers: 2,
    title: "Brandschutzprüfung inkl. Reparatur",
    tags: ["Brandschutz", "Wasserschutz", "Insulation"],
    location: "G003 Mittelstraße 121",
    projectId: "A0382",
    sectionId: "BM 02 Sued",
  },
  {
    id: "2",
    status: "abgeschlossen",
    offers: 5,
    title: "Wartung der Klimaanlage",
    tags: ["Klimaanlage", "Wartung", "Reparatur"],
    location: "G005 Hauptstraße 45",
    projectId: "B0451",
    sectionId: "CL 01 Nord",
  },
  {
    id: "3",
    status: "in Bearbeitung",
    offers: 3,
    title: "Inspektion der Heizung",
    tags: ["Heizung", "Inspektion", "Reparatur"],
    location: "G012 Bergstraße 89",
    projectId: "C0784",
    sectionId: "HT 03 Ost",
  },
  {
    id: "4",
    status: "Freigabe ausstehend",
    offers: 1,
    title: "Überprüfung der Wasserversorgung",
    tags: ["Wasserversorgung", "Überprüfung", "Reparatur"],
    location: "G021 Uferstraße 10",
    projectId: "D0321",
    sectionId: "WS 04 West",
  },
  {
    id: "5",
    status: "Nachprüfung",
    offers: 4,
    title: "Elektrische Installation",
    tags: ["Elektrik", "Installation", "Wartung"],
    location: "G033 Sonnenweg 78",
    projectId: "E0145",
    sectionId: "EL 02 Süd",
  },
  {
    id: "6",
    status: "offen",
    offers: 2,
    title: "Fensterreparatur",
    tags: ["Fenster", "Reparatur", "Glas"],
    location: "G003 Mittelstraße 121",
    projectId: "A0382",
    sectionId: "BM 02 Sued",
  },
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

export const contactPersonList = [
  {
    firstName: "Markus",
    lastName: "Richter",
    email: "lrojektingenieur@abc.com",
  },
  {
    firstName: "Alexander",
    lastName: "Schmidt",
    email: "lgeschäftsführer@abc.com",
  },
  {
    firstName: "Alexande",
    lastName: "Schmidt",
    email: "lertriebsleiter@abc.com",
  },
  {
    firstName: "Katharina",
    lastName: "Weber",
    email: "lundenbetreuer@abc.com",
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

export const dummyBuildings = [
  {
    _id: 1,
    buildingName: "Building A",
    buildingType: "Residential",
    noOfInvestment: 2,
    noOfTenders: 5,
    totalArea: 43938,
    address: {
      country: "Germany",
      state: "North Rhine-Westphalia",
      street: "Mittelstraße",
      city: "Kamp-Lintfort",
      houseNumber: "401",
      zip: "47475",
    },
    area: 43938,
    documents: [
      { name: "ac.pdf", key: "ac" },
      { name: "abczd.pdf", key: "abczd1" },
      { name: "abczd.pdf", key: "abczd2" },
      { name: "abczd.pdf", key: "abczd3" },
    ],
  },
  {
    _id: 2,
    buildingName: "Building B",
    buildingType: "Commercial",
    noOfInvestment: 2,
    noOfTenders: 5,
    totalArea: 43938,
    address: {
      country: "Germany",
      state: "North Rhine-Westphalia",
      street: "Mittelstraße",
      city: "Kamp-Lintfort",
      houseNumber: "402",
      zip: "47475",
    },
    area: 43938,
    documents: [
      { name: "ac.pdf", key: "ac" },
      { name: "abczd.pdf", key: "abczd1" },
      { name: "abczd.pdf", key: "abczd2" },
      { name: "abczd.pdf", key: "abczd3" },
    ],
  },
  {
    _id: 3,
    buildingName: "Building C",
    buildingType: "Industrial",
    noOfInvestment: 2,
    noOfTenders: 5,
    totalArea: 43938,
    address: {
      country: "Germany",
      state: "North Rhine-Westphalia",
      street: "Mittelstraße",
      city: "Kamp-Lintfort",
      houseNumber: "403",
      zip: "47475",
    },
    area: 43938,
    documents: [
      { name: "ac.pdf", key: "ac" },
      { name: "abczd.pdf", key: "abczd1" },
      { name: "abczd.pdf", key: "abczd2" },
      { name: "abczd.pdf", key: "abczd3" },
    ],
  },
  {
    _id: 4,
    buildingName: "Building D",
    buildingType: "Educational",
    noOfInvestment: 2,
    noOfTenders: 5,
    totalArea: 43938,
    address: {
      country: "Germany",
      state: "North Rhine-Westphalia",
      street: "Mittelstraße",
      city: "Kamp-Lintfort",
      houseNumber: "404",
      zip: "47475",
    },
    area: 43938,
    documents: [
      { name: "ac.pdf", key: "ac" },
      { name: "abczd.pdf", key: "abczd1" },
      { name: "abczd.pdf", key: "abczd2" },
      { name: "abczd.pdf", key: "abczd3" },
    ],
  },
  {
    _id: 5,
    buildingName: "Building E",
    buildingType: "Hospitality",
    noOfInvestment: 2,
    noOfTenders: 5,
    totalArea: 43938,
    address: {
      country: "Germany",
      state: "North Rhine-Westphalia",
      street: "Mittelstraße",
      city: "Kamp-Lintfort",
      houseNumber: "405",
      zip: "47475",
    },
    area: 43938,
    documents: [
      { name: "ac.pdf", key: "ac" },
      { name: "abczd.pdf", key: "abczd1" },
      { name: "abczd.pdf", key: "abczd2" },
      { name: "abczd.pdf", key: "abczd3" },
    ],
  },
  {
    _id: 6,
    buildingName: "Building F",
    buildingType: "Office",
    noOfInvestment: 2,
    noOfTenders: 5,
    totalArea: 43938,
    address: {
      country: "Germany",
      state: "North Rhine-Westphalia",
      street: "Mittelstraße",
      city: "Kamp-Lintfort",
      houseNumber: "406",
      zip: "47475",
    },
    area: 43938,
    documents: [
      { name: "ac.pdf", key: "ac" },
      { name: "abczd.pdf", key: "abczd1" },
      { name: "abczd.pdf", key: "abczd2" },
      { name: "abczd.pdf", key: "abczd3" },
    ],
  },
  {
    _id: 7,
    buildingName: "Building G",
    buildingType: "Retail",
    noOfInvestment: 2,
    noOfTenders: 5,
    totalArea: 43938,
    address: {
      country: "Germany",
      state: "North Rhine-Westphalia",
      street: "Mittelstraße",
      city: "Kamp-Lintfort",
      houseNumber: "407",
      zip: "47475",
    },
    area: 43938,
    documents: [
      { name: "ac.pdf", key: "ac" },
      { name: "abczd.pdf", key: "abczd1" },
      { name: "abczd.pdf", key: "abczd2" },
      { name: "abczd.pdf", key: "abczd3" },
    ],
  },
  {
    _id: 8,
    buildingName: "Building I",
    buildingType: "Residential",
    noOfInvestment: 2,
    noOfTenders: 5,
    totalArea: 43938,
    address: {
      country: "Germany",
      state: "North Rhine-Westphalia",
      street: "Mittelstraße",
      city: "Kamp-Lintfort",
      houseNumber: "408",
      zip: "47475",
    },
    area: 43938,
    documents: null,
  },
  {
    _id: 9,
    buildingName: "Building J",
    buildingType: "Commercial",
    noOfInvestment: 2,
    noOfTenders: 5,
    totalArea: 43938,
    address: {
      country: "Germany",
      state: "North Rhine-Westphalia",
      street: "Mittelstraße",
      city: "Kamp-Lintfort",
      houseNumber: "409",
      zip: "47475",
    },
    area: 43938,
    documents: [],
  },
  {
    _id: 10,
    buildingName: "Building K",
    buildingType: "Industrial",
    noOfInvestment: 2,
    noOfTenders: 5,
    totalArea: 43938,
    address: {
      country: "Germany",
      state: "North Rhine-Westphalia",
      street: "Mittelstraße",
      city: "Kamp-Lintfort",
      houseNumber: "410",
      zip: "47475",
    },
    area: 43938,
    documents: [],
  },
];

export const tenderTypesListHW = [
  { label: "Reperatur", value: "Reperatur" },
  { label: "Wartung", value: "Wartung" },
  { label: "Installation", value: "Installation" },
  { label: "Prüfung", value: "Prüfung" },
  { label: "SV Begleitung", value: "SV_Begleitung" },
  { label: "Beratung/Planprüfung", value: "Beratung_Planpruefung" },
  { label: "Konzepterstellung BSK", value: "Konzepterstellung_BSK" },
  {
    label: "Konzepterstellung Löschanlage",
    value: "Konzepterstellung_Loeschanlage",
  },
  { label: "Brandwache", value: "Brandwache" },
];

export const tenderTypesListSV = [
  {
    label: "Arbeitsstättenverordnung - Gesundheitsschutz der Beschäftigte",
    value: "Arbeitsstaettenverordnung_Gesundheitsschutz",
  },
  {
    label:
      "Betriebssicherheitsverordnung (ZÜS) - Sicherheit Maschinen und Anlagen",
    value: "Betriebssicherheitsverordnung_ZUES",
  },
  {
    label: "Baurechtliche Prüfung - Gesetzlicher Brandschutz",
    value: "Baurechtliche_Pruefung_Brandschutz",
  },
  {
    label: "DGUV - Deutsche Gesetzliche Unfallversicherung",
    value: "DGUV_Unfallversicherung",
  },
  {
    label: "Elektrische Anlagen - VDE 0105-100",
    value: "Elektrische_Anlagen_VDE_0105_100",
  },
  {
    label: "Konzepterstellung - Brandschutzkonzept",
    value: "Konzepterstellung_Brandschutzkonzept",
  },
  {
    label: "Hygiene Prüfung Lüftung - VDI 6022",
    value: "Hygiene_Pruefung_Lueftung_VDI_6022",
  },
  {
    label: "Hygiene Prüfung Trinkwasser - VDI 6023",
    value: "Hygiene_Pruefung_Trinkwasser_VDI_6023",
  },
  {
    label: "Versicherungsprüfung - VdS Prüfung",
    value: "Versicherungspruefung_VdS_Pruefung",
  },
  {
    label: "Wassergefährdete Stoffe - AwsV Prüfung",
    value: "Wassergefaehrdete_Stoffe_AwsV_Pruefung",
  },
];

export const equipmentTypesList = [
  {
    label: "Brandschutztüren/Brandschutztore",
    value: "Brandschutztüren/Brandschutztore",
  },
  {
    label: "Brandmeldeanlage/Alarmierungsanlage",
    value: "Brandmeldeanlage/Alarmierungsanlage",
  },
  { label: "CO-Warnanlagen", value: "CO-Warnanlagen" },
  { label: "Dampf und Druckanlagen", value: "Dampf und Druckanlagen" },
  {
    label: "DGUV V3 - ortsveränderliche elektrtechnische Prüfung",
    value: "DGUV V3 - ortsveränderliche elektrtechnische Prüfung",
  },
  {
    label: "Explosionsschutzanlagen (EX-Schutz)",
    value: "Explosionsschutzanlagen (EX-Schutz)",
  },
  { label: "Feuerlöschanlagen", value: "Feuerlöschanlagen" },
  {
    label: "Fördertechnik (Aufzüge, Rolltreppen, etc)",
    value: "Fördertechnik (Aufzüge, Rolltreppen, etc)",
  },
  {
    label: "Lüftungsanlagen/Raumlufttechnischeanlagen (Brandschutzklappen)",
    value: "Lüftungsanlagen/Raumlufttechnischeanlagen (Brandschutzklappen)",
  },
  {
    label: "Rauchabzugsanlagen/Druckbelüftungsanlagen",
    value: "Rauchabzugsanlagen/Druckbelüftungsanlagen",
  },
  { label: "Sicherheitsbeleuchtung", value: "Sicherheitsbeleuchtung" },
  { label: "Sicherheitsstrom", value: "Sicherheitsstrom" },
  {
    label: "Tanks mit wassergefährdeten Stoffen - Heizöltanks, etc.",
    value: "Tanks mit wassergefährdeten Stoffen - Heizöltanks, etc.",
  },
  { label: "Tragbare Feuerlöscher", value: "Tragbare Feuerlöscher" },
];

export const realStateUsers = "REAL_ESTATE_USER";
export const serviceProvider = "SERVICE_PROVIDER";

export const emailTemplateSubject = `Subject: Verify Your Email for GAP (Gesetzliche Anlagen Prüfen)`;
export const emailTemplateGreetins = `Thank you for registering with GAP (Gesetzliche Anlagen Prüfen)! To complete your registration and activate your account, please verify your email address by entering the verification code provided below.`;
export const emailTemplateVerificationText = `Your Verification Code: `;
export const emailTemplateFoot = `This verification helps us ensure the security of your account and provides you with a seamless experience on our platform. If you did not create an account with GAP, please disregard this email. Should you encounter any issues during the verification process, feel free to contact our support team at support@gap.com for assistance. Thank you for choosing GAP to manage and maintain your real estate facilities efficiently.`;
export const emailSignature1 = `Best regards`;
export const emailSignature2 = `The GAP Team `;
export const emailSignature3 = `info@gap.com`;
export const emailSignature4 = `Düsseldorf, Germany `;

export const DocumentTypies = {
  SONSTIGE: "SONSTIGE",
  GRUNDRISSE: "GRUNDRISSE",
  BAUUNTERLAGEN: "BAUUNTERLAGEN",
};

export const GenericTerms = [
  {
    label: "Allgemeine Geschäftsbedingungen",
    value: "Allgemeine Geschäftsbedingungen",
  },
  { label: "Datenschutzerklärung", value: "Datenschutzerklärung" },
  { label: "Impressum", value: "Impressum" },
  { label: "Nutzungsbedingungen", value: "Nutzungsbedingungen" },
];

export const subcategories = [
  { label: "Rauchmelder", value: "Rauchmelder" },
  { label: "Optischemelder", value: "Optischemelder" },
  { label: "Sprinkleranlagen", value: "Sprinkleranlagen" },
  { label: "Gaslöschanlagen", value: "Gaslöschanlagen" },
  { label: "Elektrische Schaltschränke", value: "Elektrische Schaltschränke" },
  { label: "Leiter", value: "Leiter" },
  { label: "Hebebühnen", value: "Hebebühnen" },
  { label: "Steckdosen", value: "Steckdosen" },
  { label: "RWA", value: "RWA" },
  { label: "RDA", value: "RDA" },
  { label: "CO-Warnanlagen", value: "CO-Warnanlagen" },
  { label: "Druckluftwasserbehälter", value: "Druckluftwasserbehälter" },
  { label: "Druckgeräte", value: "Druckgeräte" },
  { label: "Druckbehälter", value: "Druckbehälter" },
  { label: "Dampfkesselanlagen", value: "Dampfkesselanlagen" },
];

export const dummyFacilities = [
  {
    _id: 1,
    name: "Facility A",
    genericTerm: "Feuerlöschanlage",
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
    _id: 2,
    name: "Facility B",
    genericTerm: "Brandmeldanlage",
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
    _id: 3,
    name: "Facility C",
    genericTerm: "Structure",
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
    _id: 4,
    name: "Facility D",
    genericTerm: "Building",
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
    _id: 5,
    name: "Facility E",
    genericTerm: "Infrastructure",
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

export const dummySummaryData = [
  { label: "Name des Auftraggebers", value: "Fire Service GmbH" },
  { label: "Name der Ausschreibung", value: "Fire Service GmbH" },
  { label: "Ausschreibungsart", value: "Handwerker" },
  { label: "Ausschreibungstyp", value: "SV-Begleitung" },
  { label: "Objekt", value: "Handwerker" },
  { label: "Anlage", value: "Handwerker" },
  { label: "Anlagetyp", value: "Handwerker" },
  { label: "Dringlichkeit", value: "Eröffnungstermin" },
  { label: "Verfügbares Zeitfesnster", value: "14. Jan 2024 - 28 Mar. 2025" },
  { label: "Detailbeschreibung", value: "Klicken Sie hier, um zu sehen" },
  { label: "Dokumente", value: "Vor Ort zur Verfügung stellen" },
];
