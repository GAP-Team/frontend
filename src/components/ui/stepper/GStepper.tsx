import * as React from "react";
import { Stepper, Step, StepLabel, Box } from "@mui/material";

interface GStepperProps {
  steps: string[];
  activeStep: number;
}

export default function GStepper({
  steps,
  activeStep,
}: GStepperProps): JSX.Element {
  return (
    <Box sx={{ marginTop: "1.5rem" }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label: string, index: number) => (
          <Step key={label}>
            <StepLabel
              sx={{
                "& .MuiStepLabel-label":
                  activeStep === index
                    ? { fontWeight: "600", fontSize: "0.875rem" }
                    : { fontSize: "0.875rem" },
              }}
            >
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
