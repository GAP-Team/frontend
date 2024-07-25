// types.ts
export interface Building {
    _id: number;
    buildingName: string;
    buildingType: string;
    noOfInvestment: number;
    noOfTenders: number;
    address: {
      country: string,
      state: string,
      street: string,
      city: string,
      houseNumber: string,
      zip: string,
    };
    area: number; // Area in square meters
    filesNames: string[] | null | undefined;
    documents: [
      {
        name: string,
        key: string,
      }
    ] | null | undefined;
  }
  