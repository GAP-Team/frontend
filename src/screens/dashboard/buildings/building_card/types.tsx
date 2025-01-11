// types.ts
export interface Building {
  id: string;
  buildingName: string;
  buildingType: string;
  totalArea: number;
  address: BuildingAddress;
  facilityIds: string[];
  documents: Document[];
  tendersCount: number;
}

export interface BuildingAddress {
  country: string;
  state: string;
  street: string;
  city: string;
  houseNumber: number;
  zip: number;
}

export interface PropertyFilterProps {
  handleOnChange?: (
    city: string,
    federalState: string,
    facilityType: string
  ) => void;
  title: string;
}

export interface Document {
  key: string;
  name: string;
  documentType: string;
}
