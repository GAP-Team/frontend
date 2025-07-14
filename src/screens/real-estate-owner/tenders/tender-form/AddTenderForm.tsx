import React from "react";
import Grid from "@mui/material/Grid";
import { Divider, Typography } from "@mui/material";
import GStepper from "@/components/navigation/stepper/GStepper";
import GButton from "@/components/inputs/button/GButton";
import { ActiveStepItem } from "./types";

interface AddTenderFormProps {
  activeStep: ActiveStepItem;
  steps: ActiveStepItem[];
  handleBack: () => void;
  handleSubmit: () => void;
  isSubmitting: boolean;
  isBeyondLastStep: boolean;
  formOrSuccessContent: React.ReactNode;
}

const AddTenderForm: React.FC<AddTenderFormProps> = ({
  activeStep,
  steps,
  handleBack,
  handleSubmit,
  isSubmitting,
  isBeyondLastStep,
  formOrSuccessContent,
}) => {
  return (
    <>
      <Grid item xs={2}>
        <Typography
          color="inherit"
          variant="subtitle2"
          sx={styles.stepIndicator}
        >
          Schritt {activeStep?.id + 1} / {steps.length}
        </Typography>
        <GStepper
          activeStep={activeStep.id}
          steps={steps.map((step) => step.stepName)}
        />
      </Grid>
      <Divider orientation="vertical" variant="middle" flexItem />
      <Grid item xs={10} sx={styles.mainContent}>
        <div
          style={{
            flexGrow: 1,
            alignContent: isBeyondLastStep ? "center" : undefined,
          }}
        >
          {formOrSuccessContent}
        </div>
        {!isBeyondLastStep && (
          <Grid container justifyContent="flex-end" spacing={2}>
            <Grid item>
              <GButton
                disabled={activeStep?.id === 0}
                onClick={handleBack}
                color="ggrey"
              >
                {activeStep.id < steps.length - 1 ? "Zurück" : "Bearbeiten"}
              </GButton>
              <GButton
                onClick={handleSubmit}
                type="submit"
                disabled={isSubmitting}
              >
                {isBeyondLastStep
                  ? "Schließen"
                  : activeStep.id < steps.length - 1
                    ? "Weiter"
                    : "Abschließen"}
              </GButton>
            </Grid>
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default AddTenderForm;

const styles = {
  stepIndicator: {
    display: "flex",
    fontSize: "0.75rem",
    fontWeight: "600",
    alignItems: "center",
    color: "#A0ADB1",
  },
  mainContent: {
    display: "flex",
    flexDirection: "column",
  },
};
