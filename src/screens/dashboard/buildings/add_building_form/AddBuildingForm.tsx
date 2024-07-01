"use client";
import GButton from "@/components/button/GButton";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import GStepper from "@/components/stepper/GStepper";
import { useRouter } from "next/navigation";
import GProgressStepper from "@/components/stepper/GProgressStepper";
import Divider from "@mui/material/Divider";
import { useFormikContext } from "formik";
import { AddBuildingFormValues } from "./types";
import { AddComponentFormProps } from "../../types";
import SuccessPage from "@/components/common/SuccessPage";
import SectionTitle from "@/components/label/SectionTitle";
import { IconButton } from "@mui/material";
import { CgClose } from "react-icons/cg";

const AddBuildingForm = ({
  activeStep,
  setActiveStep,
  steps,
  handleBack,
  handleNext,
}: AddComponentFormProps): JSX.Element => {
  const formik = useFormikContext<AddBuildingFormValues>();
  const isBeyondLastStep = activeStep.id >= steps.length;
  const StepComponent = steps[activeStep.id]?.component;
  const typeOfBtn = activeStep.id + 1 >= steps.length ? "submit" : "button";
  const router = useRouter();
  const handleRoute = () => {
    router.push("/dashboard/buildings");
  }
  const formOrSuccessContent = isBeyondLastStep ? (
    <SuccessPage
      title="Objekt angelegt!"
      description2="Aussschreibung wurde erfolgreich anleget"
      description="You have been added to the project team and permitted to receive any project news and updates"
    />
  ) : (
    <>
        <Grid container alignItems="center">
          <Grid item xs>
            <SectionTitle text={activeStep.stepName} sx={styles.subTitle} />
            <GProgressStepper
          sx={styles.progressStepper}
          activeStep={activeStep.id}
        />
          </Grid>
          <Grid item>
            <Link href="/dashboard/buildings">
              <IconButton sx={{marginLeft:'auto'}} size="medium">
                <CgClose color="red" />
              </IconButton>
            </Link>
          </Grid>
        </Grid>
        
        {StepComponent && <StepComponent formik={formik} setActiveStep={setActiveStep} steps={steps} />}
    </>
  );

  const forwardAndBackBtns = (
    <>
      {!isBeyondLastStep && (
        <GButton onClick={handleBack} color="ggrey">
          {activeStep.id < steps.length - 1 ? "Zurück" : "Bearbeiten"}
        </GButton>
      )}
      <GButton type={typeOfBtn} onClick={!isBeyondLastStep ? handleNext : handleRoute} >
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
