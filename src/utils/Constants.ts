import EmailTemplate from "@/components/EmailTemplate/Template";

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
]

export const buildingContactPersonList: Detail[] = [
  { label: "Name", value: "Markus Richter" },
]

export const buildingAddress: Detail[] = [
  { label: "Address", value: "Mittelstraße 14" },
  { label: "Postleitzahl", value: "47475" },
  { label: "Stadt", value: "Kamp-Lintfort" },
  { label: "State", value: "Mittelstraße 14" },
  { label: "Bundesland", value: "Nordrhein-Westfahlen" },
]

export const buildingDocs: Detail[] = [
  { label: "File", value: "Objektplan A10-29 c.pdf" },
]

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
    companyName: 'Mayer Prüfungs GmbH',
    timeAgo: 'vor 30 Minuten',
    location: 'G003 Mittelstraße 121',
    projectID: 'A0382',
    price: '4.036,00',
    statusColor: '#3498db',
    avatarLetter: 'M',
  },
  {
    companyName: 'Mayer Prüfungs GmbH',
    timeAgo: 'vor 30 Minuten',
    location: 'G003 Mittelstraße 121',
    projectID: 'A0382',
    price: '4.036,00',
    statusColor: '#3498db',
    avatarLetter: 'M',
  },
  {
    companyName: 'Mayer Prüfungs GmbH',
    timeAgo: 'vor 30 Minuten',
    location: 'G003 Mittelstraße 121',
    projectID: 'A0382',
    price: '4.036,00',
    statusColor: '#3498db',
    avatarLetter: 'M',
  },
  {
    companyName: 'Mayer Prüfungs GmbH',
    timeAgo: 'vor 30 Minuten',
    location: 'G003 Mittelstraße 121',
    projectID: 'A0382',
    price: '4.036,00',
    statusColor: '#3498db',
    avatarLetter: 'M',
  },
  {
    companyName: 'Mayer Prüfungs GmbH',
    timeAgo: 'vor 30 Minuten',
    location: 'G003 Mittelstraße 121',
    projectID: 'A0382',
    price: '4.036,00',
    statusColor: '#3498db',
    avatarLetter: 'M',
  },
  {
    companyName: 'Mayer Prüfungs GmbH',
    timeAgo: 'vor 30 Minuten',
    location: 'G003 Mittelstraße 121',
    projectID: 'A0382',
    price: '4.036,00',
    statusColor: '#3498db',
    avatarLetter: 'M',
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
]

export const contactPersonList = [
  { firstName: "Markus", lastName: "Richter", email: "lrojektingenieur@abc.com" },
  { firstName: "Alexander", lastName: "Schmidt", email: "lgeschäftsführer@abc.com" },
  { firstName: "Alexande", lastName: "Schmidt", email: "lertriebsleiter@abc.com" },
  { firstName: "Katharina", lastName: "Weber", email: "lundenbetreuer@abc.com" },
];

export const buildingTypesList = [
  { label: "Bürogebäude", value: "Bürogebäude" },  // Office building
  { label: "Bahnhof", value: "Bahnhof" },  // Train station
  { label: "Einkaufscenter/Verkaufsstätte", value: "Einkaufscenter/Verkaufsstätte" },  // Shopping center/retail
  { label: "Flughafen", value: "Flughafen" },  // Airport
  { label: "Garage", value: "Garage" },  // Garage
  { label: "Pflegeheim", value: "Pflegeheim" },  // Nursing home
  { label: "Logisitkhalle/Produktionshalle", value: "Logisitkhalle/Produktionshalle" },  // Logistics/production hall
  { label: "Hochhaus", value: "Hochhaus" },  // Skyscraper
  { label: "Hotel", value: "Hotel" },  // Hotel
  { label: "Krankenhaus", value: "Krankenhaus" },  // Hospital
  { label: "Wohnhaus", value: "Wohnhaus" }  // Residential building
];

export const dummyBuildings = [
  {
    id: 1,
    title: "Building A",
    address: "Mittelstraße 401, 47475 Kamp-Lintfort",
    area: 43938,
    filesNames: ["ac.pdf", "abczd.pdf", "abczd.pdf", "abczd.pdf"],
    noOfInvestment: 2,
    noOfTenders: 5,
  },
  {
    id: 2,
    title: "Building B",
    address: "Mittelstraße 402, 47475 Kamp-Lintfort",
    area: 43938,
    filesNames: ["ac.pdf", "abczd.pdf", "abczd.pdf", "abczd.pdf"],
    noOfInvestment: 2,
    noOfTenders: 5,
  },
  {
    id: 3,
    title: "Building C",
    address: "Mittelstraße 403, 47475 Kamp-Lintfort",
    area: 43938,
    filesNames: ["ac.pdf", "abczd.pdf", "abczd.pdf", "abczd.pdf"],
    noOfInvestment: 2,
    noOfTenders: 5,
  },
  {
    id: 4,
    title: "Building D",
    address: "Mittelstraße 404, 47475 Kamp-Lintfort",
    area: 43938,
    filesNames: ["ac.pdf", "abczd.pdf", "abczd.pdf", "abczd.pdf"],
    noOfInvestment: 2,
    noOfTenders: 5,
  },
  {
    id: 5,
    title: "Building E",
    address: "Mittelstraße 405, 47475 Kamp-Lintfort",
    area: 43938,
    filesNames: ["ac.pdf", "abczd.pdf", "abczd.pdf", "abczd.pdf"],
    noOfInvestment: 2,
    noOfTenders: 5,
  },
  {
    id: 6,
    title: "Building F",
    address: "Mittelstraße 406, 47475 Kamp-Lintfort",
    area: 43938,
    filesNames: ["ac.pdf", "abczd.pdf", "abczd.pdf", "abczd.pdf"],
    noOfInvestment: 2,
    noOfTenders: 5,
  },
  {
    id: 7,
    title: "Building G",
    address: "Mittelstraße 407, 47475 Kamp-Lintfort",
    area: 43938,
    filesNames: ["ac.pdf", "abczd.pdf", "abczd.pdf", "abczd.pdf"],
    noOfInvestment: 2,
    noOfTenders: 5,
  },
  {
    id: 8,
    title: "Building I",
    address: "Mittelstraße 408, 47475 Kamp-Lintfort",
    area: 43938,
    filesNames: null,
    noOfInvestment: 2,
    noOfTenders: 5,
  },
  {
    id: 9,
    title: "Building J",
    address: "Mittelstraße 409, 47475 Kamp-Lintfort",
    area: 43938,
    filesNames: [],
    noOfInvestment: 2,
    noOfTenders: 5,
  },
  {
    id: 10,
    title: "Building K",
    address: "Mittelstraße 409, 47475 Kamp-Lintfort",
    area: 43938,
    filesNames: [],
    noOfInvestment: 2,
    noOfTenders: 5,
  },
];

export const tenderTypesList = [
  { label: "Reperatur", value: "Reperatur" },
  { label: "Wartung", value: "Wartung" },
  { label: "Installation", value: "Installation" },
  { label: "Prüfung", value: "Prüfung" },
  { label: "SV Begleitung", value: "SV_Begleitung" },
  { label: "Beratung/Planprüfung", value: "Beratung_Planpruefung" },
  { label: "Konzepterstellung BSK", value: "Konzepterstellung_BSK" },
  { label: "Konzepterstellung Löschanlage", value: "Konzepterstellung_Loeschanlage" },
  { label: "Brandwache", value: "Brandwache" },
];

export const equipmentTypesList = [
  { label: "Brandschutztüren/Brandschutztore", value: "Brandschutztüren/Brandschutztore" },
  { label: "Brandmeldeanlage/Alarmierungsanlage", value: "Brandmeldeanlage/Alarmierungsanlage" },
  { label: "CO-Warnanlagen", value: "CO-Warnanlagen" },
  { label: "Dampf und Druckanlagen", value: "Dampf und Druckanlagen" },
  { label: "DGUV V3 - ortsveränderliche elektrtechnische Prüfung", value: "DGUV V3 - ortsveränderliche elektrtechnische Prüfung" },
  { label: "Explosionsschutzanlagen (EX-Schutz)", value: "Explosionsschutzanlagen (EX-Schutz)" },
  { label: "Feuerlöschanlagen", value: "Feuerlöschanlagen" },
  { label: "Fördertechnik (Aufzüge, Rolltreppen, etc)", value: "Fördertechnik (Aufzüge, Rolltreppen, etc)" },
  { label: "Lüftungsanlagen/Raumlufttechnischeanlagen (Brandschutzklappen)", value: "Lüftungsanlagen/Raumlufttechnischeanlagen (Brandschutzklappen)" },
  { label: "Rauchabzugsanlagen/Druckbelüftungsanlagen", value: "Rauchabzugsanlagen/Druckbelüftungsanlagen" },
  { label: "Sicherheitsbeleuchtung", value: "Sicherheitsbeleuchtung" },
  { label: "Sicherheitsstrom", value: "Sicherheitsstrom" },
  { label: "Tanks mit wassergefährdeten Stoffen - Heizöltanks, etc.", value: "Tanks mit wassergefährdeten Stoffen - Heizöltanks, etc." },
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
