"use client";
import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import { useRouter } from "next/navigation";
import { Formik, Form, FormikHelpers } from "formik";
import { addTenderValidationSchema } from "@/utils/ValidationSchema";
import BackButton from "@/components/button/BackButton";
import PageTitle from "@/components/label/PageTitle";
import { AddTenderFormValues } from "./types";
// import { ActiveStepItem } from "../../types";
import { Divider, Link } from "@mui/material";
import GStepper from "@/components/stepper/GStepper";
import SuccessPage from "@/components/common/SuccessPage";
import GProgressStepper from "@/components/stepper/GProgressStepper";
import SectionTitle from "@/components/label/SectionTitle";
import GButton from "@/components/button/GButton";
import TenderInformation from "./TenderInformation";
import TenderBuilding from "./TenderBuilding";

export interface ActiveStepItem {
  id: number;
  stepName: string;
  component?: any;
}

const NewTender = () => {
  const router = useRouter();
  const steps: ActiveStepItem[] = [
    {
      id: 0,
      stepName: "Ausschreibungstyp",
      component: TenderInformation,
    },
    { id: 1, stepName: "Objekt / Anlage", component: TenderBuilding },
    { id: 2, stepName: "Beschreibung" },
    { id: 3, stepName: "Einstufung" },
    { id: 4, stepName: "Dokumente" },
  ];

  const [activeStep, setActiveStep] = useState<ActiveStepItem>(steps[0]);
  const isBeyondLastStep = activeStep.id >= steps.length;
  const StepComponent = steps[activeStep.id]?.component;

  const handleNext = (
    values: AddTenderFormValues,
    actions: FormikHelpers<AddTenderFormValues>
  ) => {
    if (activeStep?.id === steps.length - 1) {
      console.log("Form values", values);
      actions.setSubmitting(false);
    } else {
      setActiveStep(steps[activeStep.id + 1]);
      actions.setTouched({});
      actions.setSubmitting(false);
    }
  };

  const handleBack = () => {
    if (activeStep.id > 0) {
      setActiveStep(steps[activeStep.id - 1]);
    } else {
      router.push("/dashboard");
    }
  };

  const initialValues: AddTenderFormValues = {
    clientName: "",
    tenderName: "",
    tenderForm: "",
    tenderType: "",
    buildingName: "",
    equipmentName: "",
    equipmentType: "",
    detailDescription: "",
    urgency: "",
    fromDate: new Date(),
    toDate: new Date(),
    safetyWorkRequired: "",
    freeParkingAvailable: "",
    documentChoice: "",
    constructionDocs: [],
    floorplanDocs: [],
    equipmentDocs: [],
    serverLink: "",
  };

  const formOrSuccessContent = isBeyondLastStep ? (
    <SuccessPage
      title="Objekt angelegt!"
      description2="Aussschreibung wurde erfolgreich anleget"
      description="You have been added to the project team and permitted to receive any project news and updates"
    />
  ) : (
    <>
      <div className="flex flex-col">
        <SectionTitle text={activeStep.stepName} sx={styles.subTitle} />
        <GProgressStepper
          sx={styles.progressStepper}
          activeStep={activeStep.id}
        />
      </div>
      {StepComponent && <StepComponent />}
    </>
  );

  return (
    <Grid container component="main">
      <Grid item xs={12} md={12} lg={12} sx={{ backgroundColor: "#F9FAFA" }}>
        <BackButton onBack={handleBack} sx={{ ml: "1.5rem", mt: 0 }} />
        <PageTitle title="Objekt 0014" sx={{ ml: "1.5rem" }} />
        <Formik
          initialValues={initialValues}
          validationSchema={addTenderValidationSchema[activeStep?.id]}
          onSubmit={handleNext}
        >
          {({ isSubmitting, handleSubmit }) => (
            <Form>
              <Grid sx={styles.form}>
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
                    {formOrSuccessContent}
                  </div>
                  <Grid container justifyContent="flex-end" spacing={2}>
                    <Grid item>
                      <GButton
                        disabled={activeStep?.id === 0}
                        onClick={handleBack}
                        color="ggrey"
                      >
                        {activeStep.id < steps.length - 1
                          ? "Zurück"
                          : "Bearbeiten"}
                      </GButton>
                      <GButton
                        onClick={() => handleSubmit}
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
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Grid>
    </Grid>
  );
};

export default NewTender;

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
