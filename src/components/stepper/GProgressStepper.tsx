import * as React from 'react';
import MobileStepper from '@mui/material/MobileStepper';
import { SxProps } from '@mui/material'

interface GProgressStepperProps {
    activeStep:number;
    sx: SxProps;
}
  
export default function GProgressStepper({activeStep, sx}:GProgressStepperProps) {
  return (
    <MobileStepper
      variant="progress"
      steps={5}
      sx={sx}
      position="static"
      activeStep={activeStep}
      nextButton={<></>}
      backButton={<></>}
    />
  );
}