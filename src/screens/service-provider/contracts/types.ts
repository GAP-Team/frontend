import { Document } from "@/typings/types";

export interface FilterOptionType {
  category: string;
  items: string[];
}

export interface SideFilterPanelOptionsProps {
  title: string;
  options: FilterOptionType[];
  preSelectedOptions: string[];
  onSelect: (selected: string[], field: string) => void;
}

export interface SideFilterPanelProps {
  states: string[];
  tenderTypes: string[];
  facilitySubcategories: string[];
  handleSearchContracts: (
    states: string[],
    tenderTypes: string[],
    facilitySubcategories: string[]
  ) => void;
}

export interface Contract {
  city: string;
  state: string;
  buildingName: string;
  facilityName: string;
  facilityType: string;
  subcategory: string;
  tenderForm: string;
  tenderId: string;
  clientName: string;
  detailDescription: string;
  tenderType: string;
  urgency: string;
  safetyWorkRequired: boolean;
  freeParkingAvailable: boolean;
  facilityDocuments: Document[];
  buildingDocuments: Document[];
  buildingDocumentUploadType?: string;
  buildingServerLink?: string | null;
  facilityDocumentUploadType?: string;
  facilityServerLink?: string | null;
  toDate?: string;
  fromDate?: string;
  applicationIds?: string[];
  hasApplied?: boolean;
  applicationCount?: number;
}

export interface ContractSearchProps {
  states: string[];
  tenderTypes: string[];
  facilitySubcategories: string[];
}
