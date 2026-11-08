import { PostalAddress } from "@/utils/distance";
import { SuggestionWorkDate, TenderApplication } from "./types";

export const formatDate = (date: string): string =>
  new Date(date).toLocaleDateString("de-DE");

// A suggestion is either a single day or a period (date - endDate).
export const formatWorkDates = (workDates: SuggestionWorkDate[] = []): string =>
  workDates
    .filter(({ date }) => date)
    .map(({ date, endDate }) =>
      endDate
        ? `${formatDate(date as string)} - ${formatDate(endDate)}`
        : formatDate(date as string)
    )
    .join(", ");

// The owner may decide until the end of the deadline day.
export const isDeadlineExpired = (responseDeadline?: string): boolean => {
  if (!responseDeadline) return false;
  const endOfDeadline = new Date(responseDeadline);
  endOfDeadline.setHours(23, 59, 59, 999);
  return Date.now() > endOfDeadline.getTime();
};

// Label for the cards; undecided offers only, a decided one needs no deadline.
export const getDeadlineLabel = ({
  responseDeadline,
  status,
}: TenderApplication): string | undefined => {
  if (!responseDeadline || typeof status === "boolean") return undefined;
  return isDeadlineExpired(responseDeadline)
    ? "Frist abgelaufen"
    : `Rückmeldung bis ${formatDate(responseDeadline)}`;
};

// The departure point submitted with the application wins over the registered
// company address, because it is also the location shown on the card.
export const getOrigin = (
  application: TenderApplication,
  country: string
): PostalAddress | null => {
  const { zip, city, companyAddress } = application;
  if (city) {
    return { zip, city, country };
  }
  return companyAddress
    ? { ...companyAddress, houseNumber: companyAddress.houseNo }
    : null;
};
