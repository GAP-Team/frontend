import { Dayjs } from "dayjs";
import { StaticImageData } from "next/image";
import { ActiveStepItem } from "@/screens/real-estate-owner/types";

export interface FormErrors {
  [key: string]: string;
}

export type ValidateFormFunction = () => Promise<FormErrors>;
export type SetTouchedFunction = (touched: { [key: string]: boolean }) => void;
export type SubmitFormFunction = () => void;

export interface Document {
  key: string;
  name: string;
  documentType?: string;
}
export interface ContractSearchProps {
  states: string[];
  tenderTypes: string[];
  facilitySubcategories: string[];
}
export interface BlogProps {
  date: string;
  slug: string;
  title: string;
  author: string;
  excerpt: string;
  category: string;
  image: StaticImageData;
}

export interface Contract {
  city: string;
  state: string;
  buildingName: string;
  facilityName: string;
  facilityType: string;
  subcategory: string;
  tenderForm: string;
  tenderId: string;
  clientName: string;
  detailDescription: string;
  tenderType: string;
  urgency: string;
  safetyWorkRequired: boolean;
  freeParkingAvailable: boolean;
  facilityDocuments: Document[];
  buildingDocuments: Document[];
  toDate?: string;
  fromDate?: string;
}

export interface FilterOptionType {
  category: string;
  items: string[];
}
export interface SideFilterPanelProps {
  states: string[];
  tenderTypes: string[];
  facilitySubcategories: string[];
  handleSearchContracts: (
    states: string[],
    tenderTypes: string[],
    facilitySubcategories: string[]
  ) => void;
}

export interface SideFilterPanelOptionsProps {
  title: string;
  options: FilterOptionType[];
  preSelectedOptions: string[];
  onSelect: (selected: string[], field: string) => void;
}

export interface HelpIconButtonProps {
  helpText: string;
  iconColor?: string;
}

export interface ContractApplicationFormDesiredDateType {
  desiredDate: Dayjs[] | null;
}
export interface ContractApplicationFormValues {
  totalPrice: string;
  hourlyRate: string;
  message: string;
  zip: string;
  city: string;
  desiredDates: (Dayjs | null)[];
  advantages: string[];
  offerDoc: string | null;
  termsConditionDoc: string | null;
  offerDocFile: File;
  termsConditionDocFile: File;
  acceptedTerms: boolean;
}

export interface ApplyContractProps {
  loading: boolean;
  handleBack: () => void;
  handleNext: () => void;
  steps: ActiveStepItem[];
  activeStep: ActiveStepItem;
  setActiveStep: React.Dispatch<React.SetStateAction<ActiveStepItem>>;
}
export interface SendActivityEmailType {
  email: string;
  templateName: string;
  userFirstName: string;
}
export interface Notification {
  message: string;
  time: string;
  status: "success" | "warning" | "danger";
}

export interface TopFilterProps {
  title?: string;
}

export interface UserCompanyAddress {
  zip: number;
  state: string;
  street: string;
  country: string;
  houseNo: number;
  city: string;
}

export interface UserBusiness {
  businessType: string;
  registrationNumber: string;
  documents: Document[];
}

export interface UserCompany {
  name: string;
  phonenumber: number;
  address: Partial<UserCompanyAddress>;
  numberOfEmployees?: number;
  business?: Partial<UserBusiness>;
}

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  company: UserCompany;
  role: string;
  id: string;
  manufacturerExperience: string;
  qualificationDocuments: Document[];
  isActive: boolean;
}

export interface Application {
  tenderId: string;
  userId: string;
  serviceTotalPrice: string;
  servicePerHourPrice: string;
  message: string;
  suggestionWorkDates: string[];
  zip: number;
  city: string;
  dataPrivacy: boolean;
  benefitsSpecialServices: string[];
  documents: Document[];
  status: null;
}

export interface CreateResponseType {
  id: string;
}
