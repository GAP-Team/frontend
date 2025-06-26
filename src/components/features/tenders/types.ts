import { BuildingAddress } from "../buildings/building/types";
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
