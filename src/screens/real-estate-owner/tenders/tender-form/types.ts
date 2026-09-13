import { Dispatch, SetStateAction } from "react";
import { Dayjs } from "dayjs";
import { ObjectFacilityMode } from "@/utils/enums";

export interface NewBuildingFields {
  name: string;
  buildingType: string;
  street: string;
  houseNumber: string;
  zip: string;
  city: string;
  state: string;
}

export interface NewFacilityFields {
  name: string;
  facilityType: string;
  subcategory: string;
  numberOfUnits: number;
}

export interface TenderFormValues {
  //Tender Info feilds = Form 1
  clientName: string;
  tenderForm: string;
  tenderType: string;
  //Tender Building feilds = Form 2
  buildingName: string;
  buildingId: string;
  facilityName: string;
  facilityId: string;
  // Whether Form 2 selects an existing building/facility or creates new ones inline
  objectFacilityMode: ObjectFacilityMode;
  newBuilding: NewBuildingFields;
  newFacility: NewFacilityFields;
  //Description feild = Form 3
  detailDescription: string;
  //Classification = Form 4
  urgency: string;
  fromDate: Dayjs | null;
  toDate: Dayjs | null;
  safetyWorkRequired: boolean;
  freeParkingAvailable: boolean;
}
// FIX ME: Multiple declarations of the same type, make it reusable
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
  id?: string;
}
