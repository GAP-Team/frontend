import { REAL_ESTATE_BASE } from "@/utils/routes";

export const RETURN_TO_PARAM = "returnTo";

// Only in-app real-estate paths are accepted, so the param can't be abused as
// an open redirect.
export const sanitizeReturnTo = (value: string | null): string | null =>
  value?.startsWith(`${REAL_ESTATE_BASE}/`) ? value : null;

export const withReturnTo = (url: string, returnTo?: string | null): string => {
  if (!returnTo) return url;
  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}${RETURN_TO_PARAM}=${encodeURIComponent(returnTo)}`;
};

export const BUILDING_PARAM = "buildingId";
export const FACILITY_PARAM = "facilityId";

export interface Preselection {
  buildingId?: string;
  facilityId?: string;
}

// The add forms open with this object / facility already chosen.
export const withPreselection = (
  url: string,
  { buildingId, facilityId }: Preselection
): string => {
  const params = new URLSearchParams();
  if (buildingId) params.set(BUILDING_PARAM, buildingId);
  if (facilityId) params.set(FACILITY_PARAM, facilityId);
  const query = params.toString();
  if (!query) return url;
  return `${url}${url.includes("?") ? "&" : "?"}${query}`;
};
