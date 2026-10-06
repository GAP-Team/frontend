import { BuildingAddress } from "@/screens/real-estate-owner/buildings/building-overview/types";
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
  applicationIds: string[];
  urgency: string;
  fromDate: Date;
  toDate: Date;
  updatedAt: Date;
  status: string;
  createdAt: Date;
}

export interface UpdateTenderResponse {
  data: Tender;
}

export interface TenderApplication {
  id: string;
  tenderId: string;
  userId: string;
  serviceTotalPrice: string;
  zip?: number;
  city?: string;
  benefitsSpecialServices: string[];
  companyName?: string;
  numberOfEmployees?: string;
  companyAddress?: {
    street: string;
    houseNo?: number;
    zip: number;
    city: string;
    country: string;
  };
}
