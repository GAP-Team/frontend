import { ReactNode } from "react";

export interface JobItemProps {
  location: string;
  projectID: string;
  status: string;
  facilityType: string;
  tags: string[];
  savingAmount: number;
}

export interface StatItemProps {
  icon: ReactNode;
  label: string;
  value: string | number;
}
