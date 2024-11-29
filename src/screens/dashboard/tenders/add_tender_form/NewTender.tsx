"use client";
import Link from "next/link";
import Grid from "@mui/material/Grid";
import { CgClose } from "react-icons/cg";
import { useSelector } from "react-redux";
import { IconButton } from "@mui/material";
import { useRouter } from "next/navigation";
import { Formik, FormikHelpers } from "formik";
import React, { useEffect, useState } from "react";

import {
  ActiveStepItem,
  StepComponentProps,
  AddTenderFormValues,
} from "./types";
import tenderAPIs from "@/api/tender";
import AddTenderForm from "./AddTenderForm";
import TenderSummary from "./TenderSummary";
import { useAppDispatch } from "@/lib/hooks";
import TenderBuilding from "./TenderBuilding";
import TenderInformation from "./TenderInformation";
import TenderDescription from "./TenderDescription";
import PageTitle from "@/components/label/PageTitle";
import { currentUser } from "@/lib/features/userSlice";
import SuccessPage from "@/components/common/SuccessPage";
import TenderClassification from "./TenderClassification";
import { showSnackbar } from "@/components/root-snackbar";
import SectionTitle from "@/components/label/SectionTitle";
import { addTenderValidationSchema } from "@/utils/ValidationSchema";
import GProgressStepper from "@/components/stepper/GProgressStepper";
import { setUserBuildingDetails } from "@/lib/features/buildingSlice";
import userAPIs from "@/api/user";
import { Urgency } from "@/utils/enums";

const NewTender = (): JSX.Element => {
  const router = useRouter();
  const appDispatch = useAppDispatch();
  const user = useSelector(currentUser);
  const steps: ActiveStepItem[] = [
    {
      id: 0,
      stepName: "Ausschreibungstyp",
      component: TenderInformation,
    },
    { id: 1, stepName: "Objekt / Anlage", component: TenderBuilding },
    { id: 2, stepName: "Beschreibung", component: TenderDescription },
    { id: 3, stepName: "Einstufung", component: TenderClassification },
    { id: 4, stepName: "Übersicht Ausschreibung", component: TenderSummary },
  ];

  const [activeStep, setActiveStep] = useState<ActiveStepItem>(steps[0]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const StepComponent = steps[activeStep.id]
    ?.component as React.ComponentType<StepComponentProps>;

  useEffect(() => {
    setActiveStep(steps[0]);
    setIsSubmitted(false);
    getBuildingDetails();
  }, []);

  const getBuildingDetails = async (): Promise<void> => {
    const allUpdatedBuildings = await userAPIs.getBuildings(user?.id);
    appDispatch(setUserBuildingDetails(allUpdatedBuildings?.data));
  };

  const handleNext = async (
    values: AddTenderFormValues,
    actions: FormikHelpers<AddTenderFormValues>
  ): Promise<void> => {
    if (activeStep?.id === steps.length - 1) {
      const saveData = await saveTenderData(values);
      if (saveData) {
        setIsSubmitted(true);
        actions.setSubmitting(false);
      }
    } else {
      setActiveStep(steps[activeStep.id + 1]);
      actions.setTouched({});
      actions.setSubmitting(false);
    }
  };

  const saveTenderData = async (
    values: AddTenderFormValues
  ): Promise<boolean> => {
    let buildingObj = {
      id: values?.buildingId,
      name: values?.buildingName,
    };
    let facilityObj = {
      id: values?.facilityId,
      name: values?.facilityName,
    };

    let tenderData = {
      building: buildingObj,
      facility: facilityObj,
      toDate: values?.toDate,
      urgency: values?.urgency === "Dringend" ? Urgency.URGENT : values?.urgency,
      fromDate: values?.fromDate,
      clientName: values?.clientName,
      tenderForm: values?.tenderForm,
      tenderType: values?.tenderType,
      detailDescription: values?.detailDescription,
      safetyWorkRequired: values?.safetyWorkRequired,
      freeParkingAvailable: values?.freeParkingAvailable,
    };

    const createTenderResponse = await tenderAPIs.create(tenderData);

    if (createTenderResponse?.data?.id) {
      appDispatch(
        showSnackbar({
          type: "success",
          message: "Ausschreibung erfolgreich hinzugefügt!",
        })
      );

      return true;
    } else {
      appDispatch(
        showSnackbar({
          type: "error",
          message:
            "Ausschreibung konnte nicht hinzugefügt werden. Bitte überprüfen Sie die Eingabedaten und versuchen Sie es erneut",
        })
      );
      return false;
    }
  };

  const handleBack = (): void => {
    if (activeStep.id > 0) {
      setActiveStep(steps[activeStep.id - 1]);
    } else {
      router.push("/real_estate/dashboard");
    }
  };

  const initialValues: AddTenderFormValues = {
    clientName: "",
    tenderForm: "Handwerker",
    tenderType: "",
    buildingName: "",
    facilityName: "",
    detailDescription: "",
    urgency: "Nicht Dringend",
    fromDate: null,
    toDate: null,
    safetyWorkRequired: false,
    freeParkingAvailable: false,
    documentChoice: "Jetzt hochladen Empfohlen",
    constructionDocs: [],
    floorplanDocs: [],
    equipmentDocs: [],
    serverLink: "",
    buildingId: "",
    facilityId: "",
  };

  const formOrSuccessContent = isSubmitted ? (
    <SuccessPage
      title="Ausschreibung Online!"
      description2="Aussschreibung wurde erfolgreich angelegt"
      description="Du kannst Ihre Ausschreibung in der Ausschreibung-übersicht sehen und bearbeiten."
      buttonLabel="Schließen"
      redirectUrl="/real_estate/tenders"
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
          <Link href="/real_estate/tenders" type="button">
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
        <PageTitle
          title="Neue Ausschreibung veröffentlichen"
          sx={{ ml: "1.5rem" }}
        />
        <Formik
          initialValues={initialValues}
          validationSchema={addTenderValidationSchema[activeStep?.id]}
          onSubmit={handleNext}
        >
          {({ isSubmitting, handleSubmit }) => (
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
