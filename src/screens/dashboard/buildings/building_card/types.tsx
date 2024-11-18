// types.ts
export interface Building {
  id: string;
  buildingName: string;
  buildingType: string;
  noOfInvestment: number;
  noOfTenders: number;
  totalArea: number;
  address: {
    country: string;
    state: string;
    street: string;
    city: string;
    houseNumber: string;
    zip: string;
  };
  area: number; // Area in square meters
  documents: [
    {
      name: string;
      key: string;
      documentType: string;
    },
  ];
}

export interface PropertyFilterProps {
  handleOnChange: (
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
