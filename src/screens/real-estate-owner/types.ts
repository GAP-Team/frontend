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
  // FIX ME: Multiple declarations of the same type, make it reusable
  activeStep: ActiveStepItem;
  setActiveStep: React.Dispatch<React.SetStateAction<ActiveStepItem>>;
  steps: ActiveStepItem[];
  handleBack: () => void;
  handleNext: () => void;
  loading: boolean;
  actionType: string;
}

export interface Item {
  label: string;
  value: string;
}
