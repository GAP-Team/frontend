import { Tender } from "@/screens/real-estate-owner/tenders/tender-overview/types";

export type ApplicationFilter = "all" | "with" | "without";
export type TenderSort = "default" | "mostApplications";

export const countApplications = (tender: Tender): number =>
  tender?.applicationIds?.length ?? 0;

const matchesFilter = (tender: Tender, filter: ApplicationFilter): boolean => {
  const count = countApplications(tender);
  if (filter === "with") {
    return count > 0;
  }
  return filter === "without" ? count === 0 : true;
};

export const getFilterCounts = (
  tenders: Tender[]
): Record<ApplicationFilter, number> => ({
  all: tenders.length,
  with: tenders.filter((tender) => matchesFilter(tender, "with")).length,
  without: tenders.filter((tender) => matchesFilter(tender, "without")).length,
});

export const applyTenderView = (
  tenders: Tender[],
  filter: ApplicationFilter,
  sort: TenderSort
): Tender[] => {
  const visible = tenders.filter((tender) => matchesFilter(tender, filter));
  return sort === "mostApplications"
    ? visible.sort((a, b) => countApplications(b) - countApplications(a))
    : visible;
};
