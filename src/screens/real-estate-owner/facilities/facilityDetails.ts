import dayjs, { ManipulateType } from "dayjs";
import { Facility } from "./facility-overview/types";

export interface DetailEntry {
  label: string;
  value: string;
}

export interface DetailSection {
  title: string;
  entries: DetailEntry[];
}

// Settings shared by the check ("Prüfung") and maintenance ("Wartung") blocks.
interface AutomationSettings {
  isPublishAutomatically?: boolean;
  publishAutomaticallyInMonth?: number;
  reminderInMonth?: number;
  isEmailNotificationEnable?: boolean;
  emailNotificationList?: string[];
}

const NONE = "–";

const textOrNone = (value?: string | number | null): string => {
  const text = value ?? "";
  return text === "" ? NONE : String(text);
};

const yesNo = (value?: boolean): string => (value ? "Ja" : "Nein");

const withUnit = (value: number | undefined, unit: string): string =>
  value ? `${value} ${unit}` : NONE;

const formatDate = (date: unknown): string =>
  date ? dayjs(date as string).format("DD.MM.YYYY") : NONE;

const dueDate = (
  lastDate: unknown,
  amount: number | undefined,
  unit: ManipulateType
): string =>
  lastDate && amount
    ? dayjs(lastDate as string)
        .add(amount, unit)
        .format("DD.MM.YYYY")
    : NONE;

const emailList = (emails?: string[]): string =>
  emails?.filter(Boolean).join(", ") || NONE;

// Add a field to a section by adding one entry here.
const automationEntries = (settings?: AutomationSettings): DetailEntry[] => {
  const entries: DetailEntry[] = [
    {
      label: "Automatisch veröffentlichen",
      value: yesNo(settings?.isPublishAutomatically),
    },
  ];
  if (settings?.isPublishAutomatically) {
    entries.push({
      label: "Veröffentlichen in",
      value: withUnit(settings.publishAutomaticallyInMonth, "Monat(e)"),
    });
  }
  entries.push(
    {
      label: "Erinnerung in",
      value: settings?.reminderInMonth
        ? `${settings.reminderInMonth} Monat(e)`
        : "Keine",
    },
    {
      label: "E-Mail-Benachrichtigung",
      value: yesNo(settings?.isEmailNotificationEnable),
    }
  );
  if (settings?.isEmailNotificationEnable) {
    entries.push({
      label: "E-Mail-Empfänger",
      value: emailList(settings.emailNotificationList),
    });
  }
  return entries;
};

const generalSection = (facility: Facility): DetailSection => ({
  title: "Allgemein",
  entries: [
    { label: "Anlagenart", value: textOrNone(facility.facilityType) },
    { label: "Anlagentyp", value: textOrNone(facility.subcategory) },
    {
      label: "Anzahl der Anlagen",
      value: textOrNone(facility.numberOfUnits),
    },
    {
      label: "Anzahl der Ausschreibungen",
      value: textOrNone(facility.tenderIds?.length ?? 0),
    },
    { label: "Dokumente", value: textOrNone(facility.documentUploadType) },
    { label: "Server-Link", value: textOrNone(facility.serverLink) },
  ],
});

const checkSection = (facility: Facility): DetailSection => {
  const check = facility.check;
  return {
    title: "Prüfung",
    entries: [
      { label: "Letzte Prüfung", value: formatDate(check?.lastCheckDate) },
      {
        label: "Nächste Prüfung in",
        value: withUnit(check?.nextCheckInYearNumber, "Jahr(e)"),
      },
      {
        label: "Nächste Prüfung fällig am",
        value: dueDate(
          check?.lastCheckDate,
          check?.nextCheckInYearNumber,
          "year"
        ),
      },
      ...automationEntries(check),
    ],
  };
};

const maintenanceSection = (facility: Facility): DetailSection => {
  const maintenance = facility.maintenance;
  return {
    title: "Wartung",
    entries: [
      {
        label: "Letzte Wartung",
        value: formatDate(maintenance?.lastMaintenanceDate),
      },
      {
        label: "Nächste Wartung in",
        value: withUnit(maintenance?.nextMaintenanceInMonth, "Monat(e)"),
      },
      {
        label: "Nächste Wartung fällig am",
        value: dueDate(
          maintenance?.lastMaintenanceDate,
          maintenance?.nextMaintenanceInMonth,
          "month"
        ),
      },
      ...automationEntries(maintenance),
    ],
  };
};

// Every field of the facility schema, grouped for display. Documents are
// rendered separately because they are files, not label/value pairs.
export const getFacilityDetailSections = (
  facility: Facility
): DetailSection[] => [
  generalSection(facility),
  checkSection(facility),
  maintenanceSection(facility),
];
