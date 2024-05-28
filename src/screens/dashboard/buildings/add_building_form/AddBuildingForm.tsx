"use client";
import GButton from "@/components/button/GButton";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import GStepper from "@/components/stepper/GStepper";
import GProgressStepper from "@/components/stepper/GProgressStepper";
import Divider from "@mui/material/Divider";
import { useFormikContext } from "formik";
import { AddBuildingFormProps, AddBuildingFormValues } from "./types";
import SuccessPage from "@/components/common/SuccessPage";
import SectionTitle from "@/components/label/SectionTitle";

const AddBuildingForm = ({
  activeStep,
  steps,
  handleBack,
  handleNext,
}: AddBuildingFormProps): JSX.Element => {
  const formik = useFormikContext<AddBuildingFormValues>();
  const isBeyondLastStep = activeStep.id >= steps.length;
  const StepComponent = steps[activeStep.id]?.component;
  const formOrSuccessContent = isBeyondLastStep ? (
    <SuccessPage
      title="Objekt angelegt!"
      description2="Aussschreibung wurde erfolgreich anleget"
      description="You have been added to the project team and permitted to receive any project news and updates"
    />
  ) : (
    <>
      <div className="flex flex-col">
        <SectionTitle text={activeStep.stepName}  sx={styles.subTitle}/>
        <GProgressStepper
          sx={styles.progressStepper}
          activeStep={activeStep.id}
        />
      </div>
      {StepComponent && <StepComponent formik={formik} />}
    </>
  );

  const forwardAndBackBtns = (
    <>
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
    </>
  );

  return (
    <>
      <Grid item xs={2}>
        <Link
          underline="hover"
          sx={styles.stepIndicator}
          color="inherit"
          href="/"
        >
          Schritt {!isBeyondLastStep?activeStep?.id+1:4} / {steps.length}
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
          {formOrSuccessContent}
        </div>
        <Grid container justifyContent="flex-end" spacing={2}>
          <Grid item>
            {forwardAndBackBtns}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default AddBuildingForm;

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
