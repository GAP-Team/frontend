"use client";
import Link from "next/link";
import Grid from "@mui/material/Grid";
import { CgClose } from "react-icons/cg";
import { useRouter } from "next/navigation";
import { Formik, FormikHelpers } from "formik";
import React, { useEffect, useState } from "react";
import { addFacilityValidationSchema } from "@/utils/ValidationSchema";
import {
  ActiveStepItem,
  StepComponentProps,
  AddFacilityFormValues,
} from "./types";
import { IconButton } from "@mui/material";
import AddFacilityForm from "./AddFacilityForm";
import PageTitle from "@/components/label/PageTitle";
import FacilityInformation from "./FacilityInformation";
import SuccessPage from "@/components/common/SuccessPage";
import SectionTitle from "@/components/label/SectionTitle";
import FacilityDocumentation from "./FacilityDocumentation";
import GProgressStepper from "@/components/stepper/GProgressStepper";

interface NewFacilityProps {
  facilityId: string;
}

const NewFacility: React.FC<NewFacilityProps> = ({}): JSX.Element => {
  const router = useRouter();
  const steps: ActiveStepItem[] = [
    {
      id: 0,
      stepName: "Anlageninformationen",
      component: FacilityInformation,
    },
    { id: 1, stepName: "Prüfung", component: undefined },
    { id: 2, stepName: "Wartung", component: undefined },
    { id: 3, stepName: "Dokumente", component: FacilityDocumentation },
    { id: 4, stepName: "Zusammenfassung", component: undefined },
  ];

  const [activeStep, setActiveStep] = useState<ActiveStepItem>(steps[0]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const StepComponent = steps[activeStep.id]
    ?.component as React.ComponentType<StepComponentProps>;

  useEffect(() => {
    setActiveStep(steps[0]);
    setIsSubmitted(false);
  }, []);

  const handleNext = (
    values: AddFacilityFormValues,
    actions: FormikHelpers<AddFacilityFormValues>
  ): void => {
    if (activeStep?.id === steps.length - 1) {
      setIsSubmitted(true);
      actions.setSubmitting(false);
    } else {
      setActiveStep(steps[activeStep.id + 1]);
      actions.setTouched({});
      actions.setSubmitting(false);
    }
  };

  const handleBack = (): void => {
    if (activeStep.id > 0) {
      setActiveStep(steps[activeStep.id - 1]);
    } else {
      router.push("/real_estate/dashboard");
    }
  };

  const initialValues: AddFacilityFormValues = {
    name: "",
    genericTerm: "",
    subcategory: "",
    contactPerson: "",
    servicingType: "",
    lastCheckOderMaintenanceDate: null,
    nextCheckIn: 0,
    isPublishAutomatically: false,
    publishAutomaticallyInMonths: 0,
    isReminderEnabled: false,
    reminderInMonths: 0,
    isEmailNotificationEnabled: false,
    emailNotificationList: [],
    buildingName: "",
    documentChoice: "Jetzt hochladen Empfohlen",
    checkReports: [],
    floorplanDocs: [],
    otherDocs: [],
    serverLink: "",
  };

  const formOrSuccessContent = isSubmitted ? (
    <SuccessPage
      title="Anlage ist Online!"
      description2="Anlage wurde erfolgreich angelegt"
      description="Du kannst Ihre Anlage in der Anlagen-übersicht sehen und bearbeiten."
      buttonLabel="Schließen"
      redirectUrl="/real_estate/facilities"
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
          <Link href="/real_estate/facilities" type="button">
            <IconButton sx={{ marginLeft: "auto" }} size="medium">
              <CgClose color="red" />
            </IconButton>
          </Link>
        </Grid>
      </Grid>
      {StepComponent && (
        <StepComponent setActiveStep={setActiveStep} steps={steps} />
      )}
    </>
  );

  return (
    <Grid container component="main">
      <Grid item xs={12} md={12} lg={12} sx={{ backgroundColor: "#F9FAFA" }}>
        <PageTitle title="Neue Anlage erstellen" sx={{ ml: "1.5rem" }} />
        <Formik
          initialValues={initialValues}
          validationSchema={addFacilityValidationSchema[activeStep?.id]}
          onSubmit={handleNext}
          enableReinitialize
        >
          {({ isSubmitting, handleSubmit }) => (
            <Grid sx={styles.form}>
              <AddFacilityForm
                activeStep={activeStep}
                steps={steps}
                handleBack={handleBack}
                handleSubmit={handleSubmit}
                isSubmitting={isSubmitting}
                isBeyondLastStep={isSubmitted}
                formOrSuccessContent={formOrSuccessContent}
              />
            </Grid>
          )}
        </Formik>
      </Grid>
    </Grid>
  );
};

export default NewFacility;

const styles = {
  form: {
    marginLeft: "3.75rem",
    marginRight: "3.5rem",
    display: "flex",
    flexDirection: "row",
    backgroundColor: "white",
    height: "37.375rem",
    padding: "1.5rem",
    borderRadius: "0.5rem",
    boxShadow: "0px 8px 24px 0px rgba(30, 49, 55, 0.08)",
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
