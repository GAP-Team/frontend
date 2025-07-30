import { Document } from "@/typings/types";

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
