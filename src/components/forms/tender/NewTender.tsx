"use client";
import Link from "next/link";
import Grid from "@mui/material/Grid";
import { CgClose } from "react-icons/cg";
import { IconButton } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Formik, FormikHelpers } from "formik";
import {
  NewTenderProps,
  ActiveStepItem,
  StepComponentProps,
  AddTenderFormValues,
} from "./types";
import dayjs from "dayjs";
import AddTenderForm from "./AddTenderForm";
import TenderSummary from "./TenderSummary";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import TenderBuilding from "./TenderBuilding";
import TenderInformation from "./TenderInformation";
import TenderDescription from "./TenderDescription";
import PageTitle from "@/components/ui/label/PageTitle";
import SuccessSection from "@/components/layout/SuccessSection";
import TenderClassification from "./TenderClassification";
import { showSnackbar } from "@/components/ui/root-snackbar";
import SectionTitle from "@/components/ui/label/SectionTitle";
import { addTenderValidationSchema } from "@/utils/ValidationSchema";
import GProgressStepper from "@/components/ui/stepper/GProgressStepper";
import { TENDER_FORM } from "@/utils/enums";
import { isUserActive } from "@/lib/features/userSlice";
import {
  createTender,
  getTenderById,
  updateTender,
} from "@/lib/features/tenderSlice";
import { ROUTES } from "@/utils/routes";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

const NewTender: React.FC<NewTenderProps> = ({ id }): JSX.Element => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const checkActiveUser = useAppSelector(isUserActive);
  const tender = useAppSelector((state) =>
    id ? getTenderById(id)(state) : null
  );
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
  const [activeStep, setActiveStep] = useState<ActiveStepItem>(steps[0]);
  const StepComponent = steps[activeStep.id]
    ?.component as React.ComponentType<StepComponentProps>;

  useEffect(() => {
    setActiveStep(steps[0]);
    setIsSubmitted(false);
  }, []);

  const handleNext = async (
    values: AddTenderFormValues,
    actions: FormikHelpers<AddTenderFormValues>
  ): Promise<void> => {
    if (activeStep?.id === steps.length - 1) {
      if (checkActiveUser) {
        const saveData = await saveTenderData(values);
        if (saveData) {
          setIsSubmitted(true);
          actions.setSubmitting(false);
        }
      } else {
        actions.setSubmitting(false);
        dispatch(
          showSnackbar({
            type: "error",
            message:
              "Bitte aktivieren Sie Ihr Konto, um diese Funktion zu nutzen.",
          })
        );
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
      toDate: values?.toDate?.utc(true).format("YYYY-MM-DD"),
      urgency: values?.urgency,
      fromDate: values?.fromDate?.utc(true).format("YYYY-MM-DD"),
      clientName: values?.clientName,
      tenderForm: values?.tenderForm,
      tenderType: values?.tenderType,
      detailDescription: values?.detailDescription,
      safetyWorkRequired: values?.safetyWorkRequired,
      freeParkingAvailable: values?.freeParkingAvailable,
    };

    if (tender) {
      try {
        await dispatch(
          updateTender({ tenderId: tender?.id, data: tenderData })
        ).unwrap();
        dispatch(
          showSnackbar({
            type: "success",
            message: "Ausschreibung erfolgreich aktualisiert!",
          })
        );
        return true;
      } catch {
        dispatch(
          showSnackbar({
            type: "error",
            message:
              "Die Ausschreibung konnte nicht aktualisiert werden. Bitte überprüfen Sie die Eingabedaten und versuchen Sie es erneut",
          })
        );
        return false;
      }
    } else {
      try {
        await dispatch(createTender(tenderData)).unwrap();
        dispatch(
          showSnackbar({
            type: "success",
            message: "Ausschreibung erfolgreich hinzugefügt!",
          })
        );
        return true;
      } catch {
        dispatch(
          showSnackbar({
            type: "error",
            message:
              "Ausschreibung konnte nicht hinzugefügt werden. Bitte überprüfen Sie die Eingabedaten und versuchen Sie es erneut",
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
      router.push(ROUTES.REAL_ESTATE.DASHBOARD);
    }
  };

  const initialValues: AddTenderFormValues = {
    clientName: tender?.clientName || "",
    tenderForm: tender?.tenderForm || TENDER_FORM.CRAFTSMAN,
    tenderType: tender?.tenderType || "",
    buildingName: tender?.building?.name || "",
    facilityName: tender?.facility?.name || "",
    detailDescription: tender?.detailDescription || "",
    urgency: tender?.urgency || "Nicht Dringend",
    fromDate: tender?.fromDate ? dayjs(tender?.fromDate) : null,
    toDate: tender?.toDate ? dayjs(tender?.toDate) : null,
    safetyWorkRequired: tender?.safetyWorkRequired || false,
    freeParkingAvailable: tender?.freeParkingAvailable || false,
    buildingId: tender?.building?.id || "",
    facilityId: tender?.facility?.id || "",
  };

  const formOrSuccessContent = isSubmitted ? (
    <SuccessSection
      title="Ausschreibung Online!"
      primaryDescription={
        tender
          ? `Ausschreibung wurde erfolgreich aktualisiert`
          : `Aussschreibung wurde erfolgreich angelegt`
      }
      secondaryDescription="Du kannst Ihre Ausschreibung in der Ausschreibung-übersicht sehen und bearbeiten."
      buttonLabel="Schließen"
      redirectUrl={ROUTES.REAL_ESTATE.TENDER.TENDERS}
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
          <Link href={ROUTES.REAL_ESTATE.TENDER.TENDERS} type="button">
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
          title={
            tender
              ? `Ausschreibung Bearbeiten`
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
