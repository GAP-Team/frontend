export interface Facility {
  _id: number;
  name: string;
  genericTerm: string;
  subcategory: string;
  contactPerson: string;
  servicingType: string;
  lastCheckOderMaintenanceDate: {
    $date: string; // ISO date string
  };
  nextCheckIn: number; // assuming it's in months or a similar unit
  isPublishAutomatically: boolean;
  publishAutomaticallyInMonth: number;
  reminderInMonth: number;
  isReminderEnabled: boolean;
  isEmailNotificationEnabled: boolean;
  emailNotificationList: string[];
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
}
