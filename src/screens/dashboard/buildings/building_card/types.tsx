// types.ts
export interface Building {
  id: string;
  buildingName: string;
  buildingType: string;
  totalArea: number;
  address: {
    country: string;
    state: string;
    street: string;
    city: string;
    houseNumber: number;
    zip: number;
  };
  facilityIds: [];
  area: number; // Area in square meters
  documents: [
    {
      name: string;
      key: string;
      documentType: string;
    },
  ];
  tendersCount: number;
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
