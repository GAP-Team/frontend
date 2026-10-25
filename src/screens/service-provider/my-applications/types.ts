export type ApplicationStatus = "PENDING" | "ACCEPTED" | "DECLINED";

export type ApplicationFilter = "ALL" | ApplicationStatus;

export type ApplicationSort = "DATE" | "PRICE";

export interface SuggestionWorkDate {
  date: string;
  endDate?: string;
}

export interface MyApplication {
  id: string;
  tenderId: string;
  tenderType: string;
  tenderForm: string;
  buildingName: string;
  facilityName: string;
  subcategory?: string;
  city?: string;
  zip?: number;
  serviceTotalPrice: string;
  suggestionWorkDates: SuggestionWorkDate[];
  appliedAt: string;
  status: ApplicationStatus;
}
