import { Dispatch, SetStateAction } from "react";
import { Dayjs } from 'dayjs';
export interface AddTenderFormValues {
    //Tender Info feilds = Form 1
    clientName: string;
    tenderName: string;
    tenderForm: string;
    tenderType: string;
    //Tender Building feilds = Form 2
    buildingName: string;
    equipmentName: string;
    equipmentType: string;
    //Description feild = Form 3
    detailDescription: string;
    //Classification = Form 4
    urgency: string;
    fromDate: Dayjs | null;
    toDate: Dayjs | null;
    safetyWorkRequired: boolean;
    freeParkingAvailable: boolean;
}
export interface ActiveStepItem {
    id: number;
    stepName: string;
    component?: React.ComponentType<StepComponentProps>;
}
  
export interface StepComponentProps {
  setActiveStep: Dispatch<SetStateAction<ActiveStepItem>>;
  steps: ActiveStepItem[];
}