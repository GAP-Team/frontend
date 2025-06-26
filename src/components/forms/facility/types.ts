import { Dispatch, SetStateAction } from "react";
import { Dayjs } from "dayjs";
import { Document } from "@/typings/types";

export interface AddFacilityFormValues {
  name: string;
  facilityType: string;
  subcategory: string;
  isPublishCheckAutomatically: boolean;
  publishAutomaticallyInMonth: number;
  isReminderEnabled: boolean;
  emailNotificationList: string[];
  selectedBuilding: string;
  documentChoice: string;
  checkReports: Document[];
  floorplanDocs: Document[];
  otherDocs: Document[];
  serverLink: string;
  lastMaintenanceDate: Dayjs | null;
  nextMaintenanceInMonth: number;
  isPublishMaintenanceAutomatically: boolean;
  publishMaintenanceAutomaticallyInMonth: number;
  maintenanceReminderInMonth: number;
  maintenanceEmailNotificationList: string[];
  isMaintenanceEmailNotificationEnable: boolean;
  lastCheckDate: Dayjs | null;
  nextCheckInYearNumber: number;
  reminderInMonth: number;
  isEmailNotificationEnable: boolean;
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
