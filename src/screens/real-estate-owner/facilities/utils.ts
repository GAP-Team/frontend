import dayjs from "dayjs";
import { Facility } from "./facility-overview/types";

export const getFacilityCheckTimeRemaining = (
  facility: Facility | undefined,
  unit: "days" | "months" | "years" = "months"
): number => {
  if (
    !facility?.check?.lastCheckDate ||
    !facility?.check?.nextCheckInYearNumber
  ) {
    return 0;
  }

  const lastCheckDate = dayjs(facility.check.lastCheckDate);
  const nextCheckDate = lastCheckDate.add(
    Number(facility.check.nextCheckInYearNumber),
    "year"
  );

  return nextCheckDate.diff(dayjs(), unit);
};

export const getFacilityMaintenanceTimeRemaining = (
  facility: Facility | undefined,
  unit: "days" | "months" | "years" = "days"
): number => {
  if (
    !facility?.maintenance?.lastMaintenanceDate ||
    !facility?.maintenance?.nextMaintenanceInMonth
  ) {
    return 0;
  }

  const lastMaintenanceDate = dayjs(facility?.maintenance?.lastMaintenanceDate);
  const nextMaintenanceDate = lastMaintenanceDate.add(
    Number(facility.maintenance.nextMaintenanceInMonth),
    "month"
  );

  return nextMaintenanceDate.diff(dayjs(), unit);
};
