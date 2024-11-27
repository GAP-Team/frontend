import { Dispatch, SetStateAction } from "react";
export interface AddTenderFormValues {
  //Tender Info feilds = Form 1
  clientName: string;
  tenderForm: string;
  tenderType: string;
  //Tender Building feilds = Form 2
  buildingName: string;
  buildingId: string;
  facilityName: string;
  facilityId: string;
  //Description feild = Form 3
  detailDescription: string;
  //Classification = Form 4
  urgency: string;
  fromDate: Date | null;
  toDate: Date | null;
  safetyWorkRequired: boolean;
  freeParkingAvailable: boolean;
}
export interface ActiveStepItem {
  id: number;
  stepName: string;
  component?: React.ComponentType<StepComponentProps>;
}

export interface StepComponentProps {
  formik?: any;
  setActiveStep: Dispatch<SetStateAction<ActiveStepItem>>;
  steps: ActiveStepItem[];
}

export interface NewTenderProps {
  id: string;
}
