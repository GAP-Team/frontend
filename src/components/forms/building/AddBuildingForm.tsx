"use client";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import { CgClose } from "react-icons/cg";
import { useFormikContext } from "formik";
import { useRouter } from "next/navigation";
import Divider from "@mui/material/Divider";
import { IconButton, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

import { ROUTES } from "@/utils/routes";
import { AddBuildingFormValues } from "./types";
import GButton from "@/components/ui/button/GButton";
// FIXME: reorganise the types in whole project
import { AddComponentFormProps } from "@/components/features/dashboard/types";
import GStepper from "@/components/ui/stepper/GStepper";
import SuccessSection from "@/components/layout/SuccessSection";
import SectionTitle from "@/components/ui/label/SectionTitle";
import GProgressStepper from "@/components/ui/stepper/GProgressStepper";

const AddBuildingForm = ({
  steps,
  activeStep,
  loading,
  actionType,
  handleBack,
  handleNext,
  setActiveStep,
}: AddComponentFormProps): JSX.Element => {
  const router = useRouter();
  const formik = useFormikContext<AddBuildingFormValues>();

  const StepComponent = steps[activeStep.id]?.component;
  const isBeyondLastStep = activeStep.id >= steps.length;
  const typeOfBtn = activeStep.id + 1 >= steps.length ? "submit" : "button";

  const handleRoute = (): void => {
    router.push(ROUTES.REAL_ESTATE.BUILDING.BUILDINGS);
  };

  const formOrSuccessContent = isBeyondLastStep ? (
    !loading && (
      <SuccessSection
        title={
          actionType === "edit" ? "Objekt aktualisiert!" : "Objekt angelegt!"
        }
        primaryDescription={
          actionType === "edit"
            ? "Objekt wurde erfolgreich aktualisiert"
            : "Objekt wurde erfolgreich angelegt"
        }
      />
    )
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
          <Link href={ROUTES.REAL_ESTATE.BUILDING.BUILDINGS}>
            <IconButton sx={{ marginLeft: "auto" }} size="medium">
              <CgClose color="red" />
            </IconButton>
          </Link>
        </Grid>
      </Grid>

      {StepComponent && (
        <StepComponent
          formik={formik}
          setActiveStep={setActiveStep}
          steps={steps}
        />
      )}
    </>
  );

  const forwardAndBackBtns = (
    <>
      {!isBeyondLastStep && (
        <GButton onClick={handleBack} color="ggrey">
          {activeStep.id < steps.length - 1 ? "Zurück" : "Bearbeiten"}
        </GButton>
      )}
      {loading ? (
        <CircularProgress color="gprimary" size={24} />
      ) : (
        <GButton
          type={typeOfBtn}
          onClick={!isBeyondLastStep ? handleNext : handleRoute}
        >
          {isBeyondLastStep
            ? "schließen"
            : activeStep.id < steps.length - 1
              ? "Weiter"
              : "Abschlißen"}
        </GButton>
      )}
    </>
  );

  return (
    <>
      <Grid item xs={2}>
        <Typography
          color="inherit"
          variant="subtitle2"
          sx={styles.stepIndicator}
        >
          Schritt {!isBeyondLastStep ? activeStep?.id + 1 : 4} / {steps.length}
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
        <Grid container justifyContent="flex-end" spacing={2}>
          <Grid item>{forwardAndBackBtns}</Grid>
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
