import { Document } from "@/typings/types";
import { ActiveStepItem } from "@/screens/real-estate-owner/types";

export type SuggestedDateType = "single" | "range";

export interface SuggestedDate {
  type: SuggestedDateType;
  date: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD, only used when type is "range"
}

export interface SuggestionWorkDate {
  date: string;
  endDate?: string;
}

export interface Application {
  tenderId: string;
  userId: string;
  serviceTotalPrice: string;
  message: string;
  suggestionWorkDates: SuggestionWorkDate[];
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
  desiredDates: SuggestedDate[];
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
