import dayjs, { Dayjs } from "dayjs";
import { Facility } from "@/screens/real-estate-owner/facilities/facility-overview/types";

export type DeadlineStatus = "overdue" | "soon" | "ok";
export type DeadlineTab = "all" | DeadlineStatus;

export interface FacilityFilters {
  search: string;
  tab: DeadlineTab;
  facilityType: string;
  onlyActiveTender: boolean;
}

export const ALL_FACILITY_TYPES = "";

export const DEFAULT_FACILITY_FILTERS: FacilityFilters = {
  search: "",
  tab: "all",
  facilityType: ALL_FACILITY_TYPES,
  onlyActiveTender: false,
};

// Only the check (Prüfung) deadline counts; maintenance is not considered.
const getNextCheckDate = (facility: Facility): Dayjs | null => {
  const { lastCheckDate, nextCheckInYearNumber } = facility.check ?? {};
  return lastCheckDate && nextCheckInYearNumber
    ? dayjs(lastCheckDate).add(Number(nextCheckInYearNumber), "year")
    : null;
};

// "Überfällig": deadline already exceeded. "Bald fällig": deadline is today or
// within the next year. "In Ordnung": deadline is at least one year away.
// Facilities without a check deadline only show up under "Alle".
const getDeadlineStatus = (facility: Facility): DeadlineStatus | null => {
  const deadline = getNextCheckDate(facility);
  if (!deadline) {
    return null;
  }
  if (deadline.isBefore(dayjs(), "day")) {
    return "overdue";
  }
  return deadline.isBefore(dayjs().add(1, "year")) ? "soon" : "ok";
};

const matchesTab = (facility: Facility, tab: DeadlineTab): boolean =>
  tab === "all" || getDeadlineStatus(facility) === tab;

const matchesSearch = (facility: Facility, search: string): boolean => {
  const term = search.trim().toLowerCase();
  return [facility.name, facility.facilityType, facility.subcategory].some(
    (value) => value?.toLowerCase().includes(term)
  );
};

export const getFacilityTypes = (facilities: Facility[]): string[] =>
  Array.from(
    new Set(facilities.map((facility) => facility.facilityType))
  ).filter(Boolean);

const matchesType = (facility: Facility, facilityType: string): boolean =>
  facilityType === ALL_FACILITY_TYPES || facility.facilityType === facilityType;

const matchesActiveTender = (
  facility: Facility,
  onlyActiveTender: boolean,
  activeTenderFacilityIds: Set<string>
): boolean => !onlyActiveTender || activeTenderFacilityIds.has(facility.id);

export const applyFacilityFilters = (
  facilities: Facility[],
  filters: FacilityFilters,
  activeTenderFacilityIds: Set<string>
): Facility[] =>
  facilities.filter(
    (facility) =>
      matchesSearch(facility, filters.search) &&
      matchesTab(facility, filters.tab) &&
      matchesType(facility, filters.facilityType) &&
      matchesActiveTender(
        facility,
        filters.onlyActiveTender,
        activeTenderFacilityIds
      )
  );
