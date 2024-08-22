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

    documents:{ name: string; key: string; }[] | null | undefined;

}

export interface PropertyFilterProps {
  handleOnChange: (city: string, federalState: string) => void;
}
  