import { FormikHelpers } from "formik";
import { Dispatch, SetStateAction } from "react";

export interface AddBuildingFormValues{
    buildingName: string;
    totalArea: string;
    buildingType: string;
    objektTag: string;
    contactPerson: ContactPersonItem[];
    address: string;
    pin: string;
    city: string;
    state: string;
    constructionDocs: File[];
    floorplanDocs: File[];
    otherDocs: File[];
    serverLink: string;
}

export interface ActiveStepItem{
    id: number;
    stepName: string;
    component?: React.ComponentType<{ formik?: any, setActiveStep:React.Dispatch<React.SetStateAction<ActiveStepItem>>, steps:ActiveStepItem[] }>;
}

export interface AddBuildingFormProps {
    activeStep: ActiveStepItem;
    setActiveStep: React.Dispatch<React.SetStateAction<ActiveStepItem>>;
    steps: ActiveStepItem[];
    handleBack: () => void;
    handleNext: () => void;
  }
  
export interface ContactPersonItem{
    name: string;
    role: string;
    email?: string;
}
export interface Item {
    label: string;
    value: string;
}