import { Document } from "@/typings/types";
import { Dayjs } from "dayjs";
export interface Check {
  lastCheckDate: Dayjs | null;
  nextCheckInYearNumber: number;
  isPublishAutomatically: boolean;
  publishAutomaticallyInMonth: number;
  reminderInMonth: number;
  isEmailNotificationEnable: boolean;
  emailNotificationList: string[];
}

export interface Maintenance {
  lastMaintenanceDate: Dayjs | null;
  nextMaintenanceInMonth: number;
  isPublishAutomatically: boolean;
  publishAutomaticallyInMonth: number;
  reminderInMonth: number;
  isEmailNotificationEnable: boolean;
  emailNotificationList: string[];
}
export interface Facility {
  id: string;
  name: string;
  facilityType: string;
  subcategory: string;
  buildingId: string;
  check: Check;
  maintenance: Maintenance;
  documents: File[];
  documentUploadType: string;
  serverLink: string;
  tenderIds: string[];
}
