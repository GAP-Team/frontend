import { Document } from "@/typings/types";
import { BuildingAddress } from "../../buildings/building_card/types";
export interface BuildingTenders {
  buildingName: string;
  buildingAddress: BuildingAddress;
  tenders: Tender[];
}
export interface Tender {
  id: string;
  clientName: string;
  tenderForm: string;
  tenderType: string;
  building: {
    id: string;
    name: string;
  };
  facility: {
    id: string;
    name: string;
  };
  detailDescription: string;
  safetyWorkRequired: boolean;
  freeParkingAvailable: boolean;
  urgency: string;
  fromDate: Date;
  toDate: Date;
  updatedAt: Date;
  status: string;
  createdAt: Date;
}

export interface Contarct {
  city: string;
  state: string;
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
