// types.ts
export interface Tender {
    id: number;
    title: string;
    noOfInvestment: number;
    noOfTenders: number;
    address: string;
    area: number; // Area in square meters
    filesNames: string[] | null | undefined;
  }
  