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
  { label: "Email", value: "müller-maire@gmail.com" },
  { label: "Company", value: "Fire Protection GmbH" },
];

export const ansprechpartner: Detail[] = [
  { label: "Vorname", value: "Maximillian" },
  { label: "Nachname", value: "Müller-Maier" },
  { label: "Email", value: "müller-maire@gmail.com" },
  { label: "Tel. Nummer", value: "+4916090010020" },
];

export const adresse: Detail[] = [
  { label: "Land", value: "Germany" },
  { label: "Bundesland", value: "Mecklenburg-Vorpom..." },
  { label: "Straße", value: "Heinrich-Baumann Str. 49" },
  { label: "Hause Nummer", value: "123" },
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
    status: "Offen",
    offers: 2,
    title: "Brandschutzprüfung inkl. Reparatur",
    tags: ["Brandschutz", "Wasserschutz", "Insulation"],
    location: "G003 Mittelstraße 121",
    projectId: "A0382",
    sectionId: "BM 02 Sued",
  },
  {
    status: "Offen",
    offers: 2,
    title: "Brandschutzprüfung inkl. Reparatur",
    tags: ["Brandschutz", "Wasserschutz", "Insulation"],
    location: "G003 Mittelstraße 121",
    projectId: "A0382",
    sectionId: "BM 02 Sued",
  },
  {
    status: "Offen",
    offers: 2,
    title: "Brandschutzprüfung inkl. Reparatur",
    tags: ["Brandschutz", "Wasserschutz", "Insulation"],
    location: "G003 Mittelstraße 121",
    projectId: "A0382",
    sectionId: "BM 02 Sued",
  },
  {
    status: "Offen",
    offers: 2,
    title: "Brandschutzprüfung inkl. Reparatur",
    tags: ["Brandschutz", "Wasserschutz", "Insulation"],
    location: "G003 Mittelstraße 121",
    projectId: "A0382",
    sectionId: "BM 02 Sued",
  },
  {
    status: "Offen",
    offers: 2,
    title: "Brandschutzprüfung inkl. Reparatur",
    tags: [
      "Brandschutz",
      "Wasserschutz",
      "Insulation",
      "Insulation",
      "Insulation",
    ],
    location: "G003 Mittelstraße 121",
    projectId: "A0382",
    sectionId: "BM 02 Sued",
  },
  {
    status: "Offen",
    offers: 2,
    title: "Brandschutzprüfung inkl. Reparatur",
    tags: ["Brandschutz", "Wasserschutz", "Insulation"],
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
  { name: "Markus Richter", role: "Projektingenieur" },
  { name: "Alexander Schmidt", role: " Geschäftsführer" },
  { name: "Alexander Schmidt", role: "Vertriebsleiter" },
  { name: "Katharina Weber", role: "Kundenbetreuer" },
];

export const buildingTypesList = [
  { label: "Wohnung", value: "Wohnung" },    // Apartment
  { label: "Büro", value: "Büro"  },       // Office
  { label: "Lagerhaus", value: "Lagerhaus" },  // Warehouse
  { label: "Einzelhandel", value: "Einzelhandel"  }, // Retail
  { label: "Industrie", value: "Industrie" },    // Industrial
  { label: "Krankenhaus", value: "Krankenhaus" }  // Hospital
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
];