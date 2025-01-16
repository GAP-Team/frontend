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

export interface Document {
  name: string;
  key: string;
  documentType: string;
}

export interface SelectedFacilityData {
  id: string;
  name: string;
  facilityType: string;
  subcategory: string;
  buildingId: string;
  check: Check;
  maintenance: Maintenance;
  checkReports: File[];
  floorplanDocs: File[];
  otherDocs: File[];
  documents: File[];
  documentUploadType: string;
  serverLink: string;
}
