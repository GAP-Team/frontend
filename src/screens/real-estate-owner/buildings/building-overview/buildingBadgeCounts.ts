import { Facility } from "@/screens/real-estate-owner/facilities/facility-overview/types";
import { Tender } from "@/screens/real-estate-owner/tenders/tender-overview/types";
import {
  DeadlineStatus,
  getFacilityCheckStatus,
  getFacilityMaintenanceStatus,
} from "@/screens/real-estate-owner/facilities/utils";
import { TenderStatusEnum } from "@/utils/enums";

export interface BuildingBadgeCounts {
  overdue: number;
  dueSoon: number;
  openTenders: number;
  newOffers: number;
}

const getStatuses = (facility: Facility): (DeadlineStatus | null)[] => [
  getFacilityCheckStatus(facility),
  getFacilityMaintenanceStatus(facility),
];

// A facility counts once, under its most urgent deadline.
const isOverdue = (facility: Facility): boolean =>
  getStatuses(facility).includes("overdue");

const isDueSoon = (facility: Facility): boolean =>
  !isOverdue(facility) && getStatuses(facility).includes("soon");

// Offers on a tender that is still open and have not been looked at yet.
export const getBuildingBadgeCounts = (
  facilities: Facility[],
  tenders: Tender[],
  seenCounts: Record<string, number>
): BuildingBadgeCounts => {
  const openTenders = tenders.filter(
    (tender) => tender.status === TenderStatusEnum.OPEN
  );
  return {
    overdue: facilities.filter(isOverdue).length,
    dueSoon: facilities.filter(isDueSoon).length,
    openTenders: openTenders.length,
    newOffers: openTenders.reduce(
      (sum, tender) =>
        sum +
        Math.max(
          (tender.applicationIds?.length ?? 0) - (seenCounts[tender.id] ?? 0),
          0
        ),
      0
    ),
  };
};
