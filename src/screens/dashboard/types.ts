export interface ActiveStepItem {
  id: number;
  stepName: string;
  component?: React.ComponentType<{
    formik?: any;
    setActiveStep: React.Dispatch<React.SetStateAction<ActiveStepItem>>;
    steps: ActiveStepItem[];
  }>;
}

export interface AddComponentFormProps {
  activeStep: ActiveStepItem;
  setActiveStep: React.Dispatch<React.SetStateAction<ActiveStepItem>>;
  steps: ActiveStepItem[];
  handleBack: () => void;
  handleNext: () => void;
  loading: boolean;
}

export interface Item {
  label: string;
  value: string;
}
