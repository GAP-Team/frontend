export interface AddObjektFormValues{
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

export interface AddObjektFormProps {
    activeStep: ActiveStepItem;
    steps: ActiveStepItem[];
    handleBack: () => void;
    handleNext: () => void;
  }
  