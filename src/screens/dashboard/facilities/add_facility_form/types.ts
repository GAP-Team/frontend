import { Dispatch, SetStateAction } from "react";
import { Dayjs } from "dayjs";


export interface AddFacilityFormValues {
    name: string;
    genericTerm: string;
    subcategory: string;
    contactPerson: string;
    servicingType: string;
    lastCheckOderMaintenanceDate: Dayjs | null;
    nextCheckIn: number;
    isPublishAutomatically: boolean;
    publishAutomaticallyInMonths: number;
    isReminderEnabled: boolean;
    reminderInMonths: number;
    isEmailNotificationEnabled: boolean;
    emailNotificationList: string[];
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