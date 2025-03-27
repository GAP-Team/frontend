export interface RegistrationFormValues {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  telephone: string;
  role: string;
  state: string;
  street: string;
  houseNo: string;
  city: string;
  country: string;
  zip: string;
  password: string;
  confirmPassword: string;
  businessType: string;
  registrationNumber: string;
  manufacturerExperience?: string;
  approvalDocument: string | null;
  businessRegistrationDocument: string | null;
  landRegisterEntryDocument: string | null;
  personalIdDocument: string | null;

  approvalDocumentFile?: File;
  businessRegistrationDocumentFile?: File;
  landRegisterEntryDocumentFile?: File;
  personalIdDocumentFile?: File;

  numOfEmployees: string;
  qualificationDocs: File[];
}
