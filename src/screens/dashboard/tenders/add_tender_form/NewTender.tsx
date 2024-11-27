"use client";
import Link from "next/link";
import Grid from "@mui/material/Grid";
import { CgClose } from "react-icons/cg";
import { useSelector } from "react-redux";
import { IconButton } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Formik, FormikHelpers, useFormikContext } from "formik";

import {
  NewTenderProps,
  ActiveStepItem,
  StepComponentProps,
  AddTenderFormValues,
} from "./types";
import dayjs from "dayjs";
import tenderAPIs from "@/api/tender";
import AddTenderForm from "./AddTenderForm";
import TenderSummary from "./TenderSummary";
import { useAppDispatch } from "@/lib/hooks";
import { Tender } from "../tender_card/types";
import TenderBuilding from "./TenderBuilding";
import TenderInformation from "./TenderInformation";
import TenderDescription from "./TenderDescription";
import PageTitle from "@/components/label/PageTitle";
import SuccessPage from "@/components/common/SuccessPage";
import TenderClassification from "./TenderClassification";
import { showSnackbar } from "@/components/root-snackbar";
import SectionTitle from "@/components/label/SectionTitle";
import { addTenderValidationSchema } from "@/utils/ValidationSchema";
import GProgressStepper from "@/components/stepper/GProgressStepper";
import { getAllTenders } from "@/lib/features/tenderSlice";

const NewTender: React.FC<NewTenderProps> = ({ id }): JSX.Element => {
  const router = useRouter();
  const appDispatch = useAppDispatch();
  const userTenders = useSelector(getAllTenders);
  const formik = useFormikContext<AddTenderFormValues>();

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

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [actionType, setActionType] = useState<string>("add");
  const [activeStep, setActiveStep] = useState<ActiveStepItem>(steps[0]);
  const StepComponent = steps[activeStep.id]
    ?.component as React.ComponentType<StepComponentProps>;
  const [selectedTenderDetails, setSelectedTenderDetails] =
    useState<Tender | null>();

  useEffect(() => {
    if (id === "") {
      setActionType("add");
      setActiveStep(steps[0]);
      setIsSubmitted(false);
    } else {
      setActionType("edit");
      getCurrentTenderDetails(id);
    }
  }, []);

  const getCurrentTenderDetails = (id: string): void => {
    const tenderDetails = userTenders?.find(
      (tender: Tender) => id === tender?.id
    );
    setSelectedTenderDetails(tenderDetails);
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
      urgency: values?.urgency,
      fromDate: values?.fromDate,
      clientName: values?.clientName,
      tenderForm: values?.tenderForm,
      tenderType: values?.tenderType,
      detailDescription: values?.detailDescription,
      safetyWorkRequired: values?.safetyWorkRequired,
      freeParkingAvailable: values?.freeParkingAvailable,
    };

    if (actionType === "add") {
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
    } else {
      const updateTenderResponse = await tenderAPIs.update(
        selectedTenderDetails?.id,
        tenderData
      );

      if (updateTenderResponse?.data?.id) {
        appDispatch(
          showSnackbar({
            type: "success",
            message: "Ausschreibung erfolgreich aktualisiert!",
          })
        );

        return true;
      } else {
        appDispatch(
          showSnackbar({
            type: "error",
            message:
              "Die Ausschreibung konnte nicht aktualisiert werden. Bitte überprüfen Sie die Eingabedaten und versuchen Sie es erneut",
          })
        );
        return false;
      }
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
    clientName: selectedTenderDetails?.clientName || "",
    tenderForm: selectedTenderDetails?.tenderForm || "Handwerker",
    tenderType: selectedTenderDetails?.tenderType || "",
    buildingName: selectedTenderDetails?.building?.name || "",
    facilityName: selectedTenderDetails?.facility?.name || "",
    detailDescription: selectedTenderDetails?.detailDescription || "",
    urgency: selectedTenderDetails?.urgency || "Nicht Dringend",
    fromDate: selectedTenderDetails?.fromDate
      ? dayjs(selectedTenderDetails?.fromDate)
      : null,
    toDate: selectedTenderDetails?.toDate
      ? dayjs(selectedTenderDetails?.toDate)
      : null,
    safetyWorkRequired: selectedTenderDetails?.safetyWorkRequired || false,
    freeParkingAvailable: selectedTenderDetails?.freeParkingAvailable || false,
    buildingId: selectedTenderDetails?.building?.id || "",
    facilityId: selectedTenderDetails?.facility?.id || "",
    documentChoice: "Jetzt hochladen Empfohlen",
    constructionDocs: [],
    floorplanDocs: [],
    equipmentDocs: [],
    serverLink: "",
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
        <StepComponent
          setActiveStep={setActiveStep}
          steps={steps}
          formik={formik}
        />
      )}
    </>
  );

  return (
    <Grid container component="main">
      <Grid item xs={12} md={12} lg={12} sx={{ backgroundColor: "#F9FAFA" }}>
        <PageTitle
          title={
            actionType === "edit"
              ? `Ausschreibung Bearbeiten: ${initialValues?.clientName}`
              : `Neue Ausschreibung veröffentlichen`
          }
          sx={{ ml: "1.5rem" }}
        />
        <Formik
          initialValues={initialValues}
          validationSchema={addTenderValidationSchema[activeStep?.id]}
          onSubmit={handleNext}
          enableReinitialize
        >
          {({ isSubmitting, handleSubmit }) => (
            <Grid sx={styles.form}>
              <AddTenderForm
                steps={steps}
                activeStep={activeStep}
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
