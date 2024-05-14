export interface FormErrors {
    [key: string]: string;
  }
  
export type ValidateFormFunction = () => Promise<FormErrors>;
export type SetTouchedFunction = (touched: { [key: string]: boolean }) => void;
export type SubmitFormFunction = () => void;
  