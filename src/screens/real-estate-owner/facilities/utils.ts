import dayjs, { Dayjs } from "dayjs";
import { Facility } from "./facility-overview/types";
import {
  CHECK_DUE_SOON_DAYS,
  MAINTENANCE_DUE_SOON_DAYS,
} from "@/utils/Constants";

// Single source of truth for the deadline states shown across the app:
// - overdue: the deadline has passed
// - soon:    the deadline is today or fewer than `dueSoonDays` days away
// - ok:      the deadline is further away
export type DeadlineStatus = "overdue" | "soon" | "ok";

export const getNextCheckDate = (
  facility: Facility | undefined
): Dayjs | null => {
  const lastCheckDate = facility?.check?.lastCheckDate;
  const interval = facility?.check?.nextCheckInYearNumber;
  return lastCheckDate && interval
    ? dayjs(lastCheckDate).add(Number(interval), "year")
    : null;
};

export const getNextMaintenanceDate = (
  facility: Facility | undefined
): Dayjs | null => {
  const lastMaintenanceDate = facility?.maintenance?.lastMaintenanceDate;
  const interval = facility?.maintenance?.nextMaintenanceInMonth;
  return lastMaintenanceDate && interval
    ? dayjs(lastMaintenanceDate).add(Number(interval), "month")
    : null;
};

export const getDeadlineStatus = (
  deadline: Dayjs | null,
  dueSoonDays: number
): DeadlineStatus | null => {
  if (!deadline) {
    return null;
  }
  const daysRemaining = deadline.diff(dayjs(), "day");
  if (daysRemaining < 0) {
    return "overdue";
  }
  return daysRemaining < dueSoonDays ? "soon" : "ok";
};

export const getFacilityCheckStatus = (
  facility: Facility | undefined
): DeadlineStatus | null =>
  getDeadlineStatus(getNextCheckDate(facility), CHECK_DUE_SOON_DAYS);

export const getFacilityMaintenanceStatus = (
  facility: Facility | undefined
): DeadlineStatus | null =>
  getDeadlineStatus(
    getNextMaintenanceDate(facility),
    MAINTENANCE_DUE_SOON_DAYS
  );

// Remaining time until the next deadline; 0 when no deadline is set.
export const getFacilityCheckTimeRemaining = (
  facility: Facility | undefined,
  unit: "days" | "months" | "years" = "months"
): number => getNextCheckDate(facility)?.diff(dayjs(), unit) ?? 0;

export const getFacilityMaintenanceTimeRemaining = (
  facility: Facility | undefined,
  unit: "days" | "months" | "years" = "days"
): number => getNextMaintenanceDate(facility)?.diff(dayjs(), unit) ?? 0;
