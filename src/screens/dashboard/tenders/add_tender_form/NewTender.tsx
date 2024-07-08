"use client";
import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { useRouter } from "next/navigation";
import { Formik, Form, FormikHelpers } from "formik";
import { addTenderValidationSchema } from "@/utils/ValidationSchema";
import PageTitle from "@/components/label/PageTitle";
import { AddTenderFormValues, ActiveStepItem } from "./types";
import SuccessPage from "@/components/common/SuccessPage";
import SectionTitle from "@/components/label/SectionTitle";
import AddTenderForm from "./AddTenderForm"; 
import TenderInformation from "./TenderInformation";
import TenderBuilding from "./TenderBuilding";
import TenderDescription from "./TenderDescription";
import TenderClassification from "./TenderClassification";
import GProgressStepper from "@/components/stepper/GProgressStepper";
import Link from "next/link";
import { IconButton } from "@mui/material";
import { CgClose } from "react-icons/cg";
import TenderDocumentation from "./TenderDocumentation";


const NewTender = () => {
  const router = useRouter();
  const steps: ActiveStepItem[] = [
    {
      id: 0,
      stepName: "Ausschreibungstyp",
      component: TenderInformation,
    },
    { id: 1, stepName: "Objekt / Anlage", component: TenderBuilding },
    { id: 2, stepName: "Beschreibung", component: TenderDescription },
    { id: 3, stepName: "Einstufung", component: TenderClassification },
    { id: 4, stepName: "Dokumente", component: TenderDocumentation },
  ];

  const [activeStep, setActiveStep] = useState<ActiveStepItem>(steps[0]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const StepComponent = steps[activeStep.id]?.component;

  useEffect(() => {
    setActiveStep(steps[0]);
    setIsSubmitted(false);
  }, []);

  const handleNext = (
    values: AddTenderFormValues,
    actions: FormikHelpers<AddTenderFormValues>
  ) => {
    if (activeStep?.id === steps.length - 1) {
      console.log("Form values", values);
      setIsSubmitted(true);
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
    tenderForm: "Handwerker",
    tenderType: "",
    buildingName: "",
    equipmentName: "",
    equipmentType: "",
    detailDescription: "",
    urgency: "",
    fromDate: null,
    toDate: null,
    safetyWorkRequired: false,
    freeParkingAvailable: false,
    documentChoice: "Jetzt hochladen Empfohlen",
    constructionDocs: [],
    floorplanDocs: [],
    equipmentDocs: [],
    serverLink: "",
  };

  const formOrSuccessContent = isSubmitted ? (
    <SuccessPage
      title="Ausschreibung Online!"
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
          <Link href="/dashboard/tenders" type="button">
            <IconButton sx={{ marginLeft: "auto" }} size="medium">
              <CgClose color="red" />
            </IconButton>
          </Link>
        </Grid>
      </Grid>
      {StepComponent && <StepComponent />}
    </>
  );

  return (
    <Grid container component="main">
      <Grid item xs={12} md={12} lg={12} sx={{ backgroundColor: "#F9FAFA" }}>
        <PageTitle title="Objekt 0014" sx={{ ml: "1.5rem" }} />
        <Formik
          initialValues={initialValues}
          validationSchema={addTenderValidationSchema[activeStep?.id]}
          onSubmit={handleNext}
        >
          {({ isSubmitting, handleSubmit }) => (
            <Form>
              <Grid sx={styles.form}>
                <AddTenderForm
                  activeStep={activeStep}
                  steps={steps}
                  handleBack={handleBack}
                  handleSubmit={handleSubmit}
                  isSubmitting={isSubmitting}
                  isBeyondLastStep={isSubmitted}
                  formOrSuccessContent={formOrSuccessContent}
                />
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
