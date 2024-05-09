export interface RegistrationFormValues {
  firstname: string;
  lastname: string;
  email: string;
  telephone: string;
  company: string;
  country: string;
  state: string;
  street: string;
  hausnr: string;
  plz: string;
  city: string;
  bsndoc: string | null | undefined,
  landdoc: string | null | undefined,
  approvdoc:string | null | undefined,
  registrationnum: string;
}

export interface FormErrors {
  [key: string]: string;
}

export type ValidateFormFunction = () => Promise<FormErrors>;
export type SetTouchedFunction = (touched: { [key: string]: boolean }) => void;
export type SubmitFormFunction = () => void;
