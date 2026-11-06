import {
  DeadlineStatus,
  getFacilityCheckStatus,
  getFacilityMaintenanceStatus,
} from "@/screens/real-estate-owner/facilities/utils";
import { Facility } from "@/screens/real-estate-owner/facilities/facility-overview/types";

export type DeadlineKind = "check" | "maintenance";

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

const DEADLINE_STATUS_GETTERS = {
  check: getFacilityCheckStatus,
  maintenance: getFacilityMaintenanceStatus,
};

// Facilities without the given deadline only show up under "Alle".
const matchesTab = (
  facility: Facility,
  tab: DeadlineTab,
  kind: DeadlineKind
): boolean => tab === "all" || DEADLINE_STATUS_GETTERS[kind](facility) === tab;

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
  activeTenderFacilityIds: Set<string>,
  kind: DeadlineKind = "check"
): Facility[] =>
  facilities.filter(
    (facility) =>
      matchesSearch(facility, filters.search) &&
      matchesTab(facility, filters.tab, kind) &&
      matchesType(facility, filters.facilityType) &&
      matchesActiveTender(
        facility,
        filters.onlyActiveTender,
        activeTenderFacilityIds
      )
  );
