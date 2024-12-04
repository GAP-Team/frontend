export interface Building {
  buildingName: string;
  buildingAdress: buildingAdress;
  tenders: Tender[];
}

export interface buildingAdress {
  city: string;
  country: string;
  houseNumber: number;
  street: string;
  zip: number;
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
  status: string;
  createdAt: Date;
}
