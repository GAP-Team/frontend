import { Document } from "@/typings/types";
export interface Check {
  lastCheckDate: Date;
  nextCheckInYearNumber: number;
  isPublishAutomatically: boolean;
  publishAutomaticallyInMonth: number;
  reminderInMonth: number;
  isEmailNotificationEnable: boolean;
  emailNotificationList: [];
}

export interface Maintenance {
  lastMaintenanceDate: Date;
  nextMaintenanceInMonth: number;
  isPublishAutomatically: boolean;
  publishAutomaticallyInMonth: number;
  reminderInMonth: number;
  isEmailNotificationEnable: boolean;
  emailNotificationList: [];
}
export interface Facility {
  id: string;
  name: string;
  facilityType: string;
  subcategory: string;
  buildingId: string;
  check: Check;
  maintenance: Maintenance;
  documents: Document[];
  documentUploadType: string;
  serverLink: string;
  tenderIds: string[];
}
