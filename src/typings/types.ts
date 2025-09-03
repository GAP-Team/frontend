import { StaticImageData } from "next/image";

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

export interface BlogProps {
  date: string;
  slug: string;
  title: string;
  author: string;
  excerpt: string;
  category: string;
  image: StaticImageData;
}

export interface HelpIconButtonProps {
  helpText: string;
  iconColor?: string;
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

export interface CreateResponseType {
  id: string;
}
