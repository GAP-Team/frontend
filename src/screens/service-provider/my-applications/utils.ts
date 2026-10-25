import dayjs from "dayjs";
import { formatDateRange } from "@/utils/utils";
import {
  ApplicationFilter,
  ApplicationSort,
  MyApplication,
  SuggestionWorkDate,
} from "./types";

export const formatPrice = (price: string): string => {
  const amount = Number(price);
  if (Number.isNaN(amount)) return price;
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  }).format(amount);
};

export const formatLocation = ({ zip, city }: MyApplication): string =>
  [zip, city].filter(Boolean).join(" ");

export const formatSuggestedDate = ({
  date,
  endDate,
}: SuggestionWorkDate): string =>
  endDate ? formatDateRange(date, endDate) : dayjs(date).format("DD.MM.YYYY");

export const countByFilter = (
  applications: MyApplication[],
  filter: ApplicationFilter
): number =>
  filter === "ALL"
    ? applications.length
    : applications.filter(({ status }) => status === filter).length;

const matchesSearch = (application: MyApplication, query: string): boolean =>
  [
    application.facilityName,
    application.buildingName,
    application.subcategory,
    application.tenderType,
    application.city,
  ]
    .join(" ")
    .toLowerCase()
    .includes(query.trim().toLowerCase());

export const filterApplications = (
  applications: MyApplication[],
  filter: ApplicationFilter,
  query: string,
  sort: ApplicationSort
): MyApplication[] =>
  applications
    .filter(
      (application) =>
        (filter === "ALL" || application.status === filter) &&
        matchesSearch(application, query)
    )
    .sort((a, b) =>
      sort === "PRICE"
        ? Number(b.serviceTotalPrice) - Number(a.serviceTotalPrice)
        : dayjs(b.appliedAt).valueOf() - dayjs(a.appliedAt).valueOf()
    );
