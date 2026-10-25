import * as React from "react";
import MobileStepper from "@mui/material/MobileStepper";
import { SxProps } from "@mui/material";

interface GProgressStepperProps {
  activeStep: number;
  sx: SxProps;
  steps?: number;
}

export default function GProgressStepper({
  activeStep,
  sx,
  steps = 5,
}: GProgressStepperProps): JSX.Element {
  return (
    <MobileStepper
      variant="progress"
      steps={steps}
      sx={sx}
      position="static"
      activeStep={activeStep}
      nextButton={<></>}
      backButton={<></>}
    />
  );
}
