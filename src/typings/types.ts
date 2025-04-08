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

export interface BlogCardProps {
  article: {
    date: string;
    title: string;
    author: string;
    excerpt: string;
    category: string;
    image: StaticImageData;
  }
}
