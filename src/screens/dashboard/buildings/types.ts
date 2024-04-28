export interface AddBuildingFormValues{
    buildingName: string;
    totalArea: string;
    buildingType: string;
    objektTag: string;
    contactPerson: string;
    address: string;
    plz: string;
    city: string;
    state: string;
    serverLink: string;
}

export interface ActiveStepItem{
    id: number;
    stepName: string;
    component?: React.ReactElement;
}

export interface AddBuildingFormProps {
    activeStep: ActiveStepItem;
    steps: ActiveStepItem[];
    handleBack: () => void;
    handleNext: () => void;
  }
  
export interface ContactPersonItem{
    name: string;
    role: string;
}
export interface Item {
    label: string;
    value: string;
}