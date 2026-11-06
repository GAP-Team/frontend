// Tab indices of the building detail view; also used in the ?tab= URL param.
export const BUILDING_TABS = {
  CHECK_DEADLINES: 0,
  MAINTENANCE_DEADLINES: 1,
  TENDERS: 2,
  DOCUMENTS: 3,
} as const;

export const BUILDING_TAB_VALUES: number[] = Object.values(BUILDING_TABS);
