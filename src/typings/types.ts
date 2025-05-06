import { StaticImageData } from "next/image";
import { Tender } from "@/screens/dashboard/tenders/tender_card/types";
import { BuildingAddress } from "@/screens/dashboard/buildings/building_card/types";

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
  state: string[];
  tenderType: string[];
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

interface ContractFacility {
  facilityType: string;
  facilityId: string;
  facilityName: string;
  subcategory: string;
  facilityDocuments: Document[];
  contracts: Tender[];
}

export interface Contract {
  buildingAddress: BuildingAddress;
  buildingName: string;
  buildingId: string;
  buildingsDocuments: Document[];
  facilities: ContractFacility[];
}
