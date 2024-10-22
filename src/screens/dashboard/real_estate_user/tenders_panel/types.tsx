import { boolean } from "yup";

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
  status: string;
}
