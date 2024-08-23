// types.ts
export interface Building {
    _id: number;
    buildingName: string;
    buildingType: string;
    noOfInvestment: number;
    noOfTenders: number;
    totalArea: number;
    address: {
      country: string,
      state: string,
      street: string,
      city: string,
      houseNumber: string,
      zip: string,
    };
    area: number; // Area in square meters
<<<<<<< HEAD
    filesNames: string[] | null | undefined;
    documents: [
      {
        name: string,
        key: string,
        documentType: string,
      }
    ]
=======

    documents:{ name: string; key: string; }[] | null | undefined;

>>>>>>> 6de870b8163cce611fb6ddc4340928cc46f0b0ce
}

export interface PropertyFilterProps {
  handleOnChange: (city: string, federalState: string) => void;
  title: string;
}

export interface Document {
  key: string,
  name: string,
  documentType: string,
}
  