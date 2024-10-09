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
  buildingName: string;
  documentChoice: string;
  constructionDocs: File[];
  floorplanDocs: File[];
  otherDocs: File[];
  serverLink: string;
  maintenanceFinalDate: Dayjs | null;
  nextMaintenance: string;
  maintenanceAutoPublish: boolean;
  maintenanceReminder: string;
  maintenanceAutoEmail: boolean;
  maintenanceEmailOne: string;
  maintenanceEmailTwo: string;
}

export interface ActiveStepItem {
  id: number;
  stepName: string;
  component?: React.ComponentType<{
    formik?: any;
    setActiveStep: React.Dispatch<React.SetStateAction<ActiveStepItem>>;
    steps: ActiveStepItem[];
  }>;
}

export interface StepComponentProps {
  setActiveStep: Dispatch<SetStateAction<ActiveStepItem>>;
  steps: ActiveStepItem[];
}
