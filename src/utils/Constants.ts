export const listOfTrades = [
    {
      category: 'Brandmeldeanlagen',
      items: ['Rauchmelder', 'Optischemelder'],
    },
    {
      category: 'Fördertechnik',
      items: ['Aufzüge', 'Rolltreppen'],
    },
    {
      category: 'Feuerlöschanlagen:',
      items: ['Sprinkleranlagen', 'Gaslöschanlagen'],
    },
    {
      category: 'Elektrotechnik',
      items: ['Elektrische Schaltschränke'],
    },
    {
      category: 'Elektrische Arbeits - und Betriebsmittel:',
      items: ['Leiter','Hebebühnen','Steckdosen'],
    },
    {
      category: 'Lüftungsanlagen',
      items: ['RWA', 'RDA', 'CO-Warnanlagen'],
    },
    {
      category: 'Druckanlagen',
      items: ['Druckluftwasserbehälter', 'Druckgeräte', 'Druckbehälter', 'Dampfkesselanlagen'],
    },
];
export const listOfOrderTypes = [
    {
        category: 'Unterteilung Auftragstypen (Nur für SV)',
        items: [
          'Arbeitsstättenverordnung - Gesundheitsschutz der Beschäftigte',
          'Betriebssicherheitsverordnung (ZÜS) - Sicherheit Maschinen und Anlagen',
          'Bauordnungsrechtliche Prüfung - Gesetzlicher Brandschutz',
          'DGUV - Deutsche Gesetzliche Unfallversicherung',
          'Elektrische Anlagen – VDE 0105-100',
          'Konzepterstellung - Brandschutzkonzept',
          'Hygiene Prüfung Lüftung – VDI 6022',
          'Hygiene Prüfung Trinkwasser – VDI 6023',
          'Versicherungsprüfung – VdS Prüfung',
          'Wassergefährdete Stoffe – AwsV Prüfung'
        ]
      },
      {
        category: 'Unterteilung Auftragstypen (Nur für HW)',
        items: [
          'Wartung/Instandhaltung',
          'Instandsetzung/Reparatur',
          'SV-Begleitung Abnahme',
          'SV-Begleitung Wiederkehrende-Prüfung'
        ]
      }
]

interface Item {
  label: string;
  value: string;
}

export const germanStates: Item[] = [
  { label: 'Baden-Württemberg', value: 'Baden-Württemberg' },
  { label: 'Bayern', value: 'Bayern' }, // Bavaria
  { label: 'Berlin', value: 'Berlin' },
  { label: 'Brandenburg', value: 'Brandenburg' },
  { label: 'Bremen', value: 'Bremen' },
  { label: 'Hamburg', value: 'Hamburg' },
  { label: 'Hessen', value: 'Hessen' }, // Hesse
  { label: 'Niedersachsen', value: 'Niedersachsen' }, // Lower Saxony
  { label: 'Mecklenburg-Vorpommern', value: 'Mecklenburg-Vorpommern' }, // Mecklenburg-Western Pomerania
  { label: 'Nordrhein-Westfalen', value: 'Nordrhein-Westfalen' }, // North Rhine-Westphalia
  { label: 'Rheinland-Pfalz', value: 'Rheinland-Pfalz' }, // Rhineland-Palatinate
  { label: 'Saarland', value: 'Saarland' },
  { label: 'Sachsen', value: 'Sachsen' }, // Saxony
  { label: 'Sachsen-Anhalt', value: 'Sachsen-Anhalt' }, // Saxony-Anhalt
  { label: 'Schleswig-Holstein', value: 'Schleswig-Holstein' },
  { label: 'Thüringen', value: 'Thüringen' } // Thuringia
];