// types.ts
export interface Building {
    id: number;
    title: string;
    noOfInvestment: number;
    noOfTenders: number;
    address: string;
    area: number; // Area in square meters
    filesNames: string[] | null | undefined;
  }
  