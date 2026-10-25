import { ApplicationFilter, ApplicationStatus } from "./types";

export const STATUS_LABELS: Record<ApplicationStatus, string> = {
  PENDING: "In Prüfung",
  ACCEPTED: "Angenommen",
  DECLINED: "Abgelehnt",
};

export const FILTER_LABELS: Record<ApplicationFilter, string> = {
  ALL: "Alle",
  ...STATUS_LABELS,
};

export const STATUS_COLORS: Record<
  ApplicationStatus,
  { bgcolor: string; color: string }
> = {
  PENDING: { bgcolor: "#FFF1C2", color: "#B98300" },
  ACCEPTED: { bgcolor: "#DDF3E4", color: "#1B7A3E" },
  DECLINED: { bgcolor: "#FBE0E0", color: "#B42318" },
};
