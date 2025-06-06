import { StaticImageData } from "next/image";

export interface FormErrors {
  [key: string]: string;
}

export type ValidateFormFunction = () => Promise<FormErrors>;
export type SetTouchedFunction = (touched: { [key: string]: boolean }) => void;
export type SubmitFormFunction = () => void;

export interface Document {
  key: string;
  name: string;
  documentType?: string;
}
export interface ContractSearchProps {
  states: string[];
  tenderTypes: string[];
  facilitySubcategories: string[];
}
export interface BlogProps {
  date: string;
  slug: string;
  title: string;
  author: string;
  excerpt: string;
  category: string;
  image: StaticImageData;
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
  toDate?: string;
  fromDate?: string;
}

export interface FilterOptionType {
  category: string;
  items: string[];
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

export interface SideFilterPanelOptionsProps {
  title: string;
  options: FilterOptionType[];
  preSelectedOptions: string[];
  onSelect: (selected: string[], field: string) => void;
}
