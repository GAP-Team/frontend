import { SuggestedDate } from "./types";

const formatDate = (date: string): string =>
  new Date(date).toLocaleDateString("de-DE");

export const formatSuggestedDate = ({
  type,
  date,
  endDate,
}: SuggestedDate): string =>
  type === "range" && endDate
    ? `${formatDate(date)} - ${formatDate(endDate)}`
    : formatDate(date);
