export interface ContactFormProps {
  firstName: string;
  lastName: string;
  phoneNumber: number | null;
  email: string;
  message: string;
  dataPrivacyAccepted: boolean;
}
