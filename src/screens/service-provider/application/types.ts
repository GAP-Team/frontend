import { Dayjs } from "dayjs";
import { Document } from "@/typings/types";
import { ActiveStepItem } from "@/screens/real-estate-owner/types";

export interface Application {
  tenderId: string;
  userId: string;
  serviceTotalPrice: string;
  message: string;
  suggestionWorkDates: string[];
  zip: number;
  city: string;
  dataPrivacy: boolean;
  benefitsSpecialServices: string[];
  documents: Document[];
  status: null;
}

export interface ContractApplicationFormValues {
  totalPrice: string;
  message: string;
  zip: string;
  city: string;
  desiredDates: (Dayjs | null)[];
  advantages: string[];
  offerDoc: string;
  termsConditionDoc: string;
  offerDocFile: File;
  termsConditionDocFile: File;
  acceptedTerms: boolean;
}

export interface ApplyContractProps {
  // FIX ME: Multiple declarations of the same type, make it reusable
  loading: boolean;
  handleBack: () => void;
  handleNext: () => void;
  steps: ActiveStepItem[];
  activeStep: ActiveStepItem;
  setActiveStep: React.Dispatch<React.SetStateAction<ActiveStepItem>>;
}
