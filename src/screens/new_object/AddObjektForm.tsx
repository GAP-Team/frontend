"use client";
import React from "react";
import GButton from "@/components/button/GButton";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import GStepper from "@/components/stepper/GStepper";
import GProgressStepper from "@/components/stepper/GProgressStepper";
import Divider from "@mui/material/Divider";
import { useFormikContext } from "formik";
import { AddObjektFormProps } from "./types";
import SuccessPage from "@/components/common/SuccessPage";

const AddObjektForm = ({
  activeStep,
  steps,
  handleBack,
  handleNext,
}: AddObjektFormProps): JSX.Element => {
  const formik = useFormikContext();
  const isBeyondLastStep = activeStep.id >= steps.length;
  return (
    <>
      <Grid item xs={2}>
        <Link
          underline="hover"
          sx={styles.stepIndicator}
          color="inherit"
          href="/"
        >
          Schritt {activeStep?.id + 1} / {steps.length}
        </Link>
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
          {isBeyondLastStep ? (
            <SuccessPage
              title="Objekt angelegt!"
              description="You have been added to the project team and permitted to receive any project news and updates"
              buttonLabel="Go to Dashboard"
              redirectUrl="/dashboard"
            />
          ) : (
            <>
              <div className="flex flex-col">
                <Typography variant="subtitle2" sx={styles.subTitle}>
                  {activeStep.stepName}
                </Typography>
                <GProgressStepper
                  sx={styles.progressStepper}
                  activeStep={activeStep.id}
                />
              </div>
              {activeStep.component}
            </>
          )}
        </div>
        <Grid container justifyContent="flex-end" spacing={2}>
          <Grid item>
            {!isBeyondLastStep && (
              <GButton onClick={handleBack} color="ggrey">
                {activeStep.id < steps.length - 1 ? "Zurück" : "Bearbeiten"}
              </GButton>
            )}
            <GButton onClick={handleNext}>
              {isBeyondLastStep
                ? "schließen"
                : activeStep.id < steps.length - 1
                  ? "Weiter"
                  : "Abschlißen"}
            </GButton>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default AddObjektForm;

//Styles
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
    // height: "100%",
  },
  subTitle: {
    display: "flex",
    fontSize: "0.75rem",
    marginLeft: "1.5rem",
    fontWeight: "600",
  },
  progressStepper: {
    maxWidth: "none",
    width: "auto",
    flexGrow: 1,
    marginLeft: "1rem",
    color: "gprimary",
  },
};
