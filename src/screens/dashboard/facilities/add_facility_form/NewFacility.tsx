"use client";
import {
  ActiveStepItem,
  StepComponentProps,
  AddFacilityFormValues,
} from "./types";
import Link from "next/link";
import Grid from "@mui/material/Grid";
import { CgClose } from "react-icons/cg";
import facilityAPIs from "@/api/facility";
import { useSelector } from "react-redux";
import { IconButton } from "@mui/material";
import FacilityCheck from "./FacilityCheck";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/lib/hooks";
import { Formik, FormikHelpers } from "formik";
import AddFacilityForm from "./AddFacilityForm";
import FacilitySummary from "./FacilitySummary";
import { DocumentTypes } from "@/utils/Constants";
import React, { useEffect, useState } from "react";
import PageTitle from "@/components/label/PageTitle";
import { currentUser } from "@/lib/features/userSlice";
import FacilityMaintenance from "./FacilityMaintenance";
import FacilityInformation from "./FacilityInformation";
import SuccessPage from "@/components/common/SuccessPage";
import { showSnackbar } from "@/components/root-snackbar";
import SectionTitle from "@/components/label/SectionTitle";
import FacilityDocumentation from "./FacilityDocumentation";
import { handleUploadMultipleDoc } from "@/utils/uploadToS3";
import { fetchBuildings } from "@/lib/features/buildingSlice";
import GProgressStepper from "@/components/stepper/GProgressStepper";
import { addFacilityValidationSchema } from "@/utils/ValidationSchema";

interface NewFacilityProps {
  facilityId: string;
}

const NewFacility: React.FC<NewFacilityProps> = ({}): JSX.Element => {
  const router = useRouter();
  const appdispatch = useAppDispatch();
  const user = useSelector(currentUser);

  const steps: ActiveStepItem[] = [
    {
      id: 0,
      stepName: "Anlageninformationen",
      component: FacilityInformation,
    },
    { id: 1, stepName: "Prüfung", component: FacilityCheck },
    { id: 2, stepName: "Wartung", component: FacilityMaintenance },
    { id: 3, stepName: "Dokumente", component: FacilityDocumentation },
    { id: 4, stepName: "Zusammenfassung", component: FacilitySummary },
  ];

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [activeStep, setActiveStep] = useState<ActiveStepItem>(steps[0]);

  const StepComponent = steps[activeStep.id]
    ?.component as React.ComponentType<StepComponentProps>;

  useEffect(() => {
    setActiveStep(steps[0]);
    setIsSubmitted(false);
    getUSerBuildingDetails();
  }, []);

  const getUSerBuildingDetails = async (): Promise<void> => {
    const query = {
      userId: user?.id,
      city: "",
      federalState: "",
      facilityType: "",
    };
    appdispatch(fetchBuildings(query));
  };

  const handleNext = async (
    values: AddFacilityFormValues,
    actions: FormikHelpers<AddFacilityFormValues>
  ): Promise<void> => {
    if (activeStep?.id === steps.length - 1) {
      const saveStatus = await uploadAllDocuments(values);
      if (saveStatus) {
        setIsSubmitted(true);
        actions.setSubmitting(false);
      }
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

  const saveFacilityData = async (
    values: AddFacilityFormValues,
    docObjList: any[] = []
  ): Promise<boolean> => {
    let facilityData = {
      name: values?.name,
      facilityType: values?.facilityType,
      subcategory: values?.subcategory,
      buildingId: values?.selectedBuilding,
      check: {
        lastCheckDate: values?.lastCheckDate,
        nextCheckInYearNumber: values?.nextCheckInYearNumber,
        isPublishAutomatically: values?.isPublishAutomatically,
        publishAutomaticallyInMonth: Number(
          values?.publishAutomaticallyInMonths
        ),
        reminderInMonth: values?.reminderInMonth,
        isEmailNotificationEnable: values?.isEmailNotificationEnable,
        emailNotificationList: values?.isEmailNotificationEnable
          ? Array.isArray(values?.emailNotificationList)
            ? values.emailNotificationList.filter((item) => item !== "")
            : []
          : [],
      },
      maintenance: {
        lastMaintenanceDate: values?.lastMaintenanceDate,
        nextMaintenanceInMonth: values?.nextMaintenanceInMonth,
        isPublishAutomatically: values?.isPublishMaintenanceAutomatically,
        publishAutomaticallyInMonth: Number(
          values?.publishMaintenanceAutomaticallyInMonth
        ),
        reminderInMonth: values?.maintenanceReminderInMonth,
        isEmailNotificationEnable: values?.isMaintenanceEmailNotificationEnable,
        emailNotificationList: values?.isMaintenanceEmailNotificationEnable
          ? Array.isArray(values?.maintenanceEmailNotificationList)
            ? values.maintenanceEmailNotificationList.filter(
                (item) => item !== ""
              )
            : []
          : [],
      },
      documents: docObjList,
      documentUploadType: values?.documentChoice,
      serverLink: values?.serverLink,
    };

    const createFacilityResponse = await facilityAPIs.create(facilityData);

    if (createFacilityResponse?.data?.id) {
      appdispatch(
        showSnackbar({
          type: "success",
          message: "Anlage erfolgreich hinzugefügt!",
        })
      );
    }

    return true;
  };

  const uploadAllDocuments = async (
    values: AddFacilityFormValues
  ): Promise<boolean> => {
    setLoading(true);
    const docObjList: any[] = [];

    const uploadDocuments = async (
      files: File[],
      docType: string
    ): Promise<void> => {
      for (const file of files) {
        if (file.hasOwnProperty("documentType")) {
          docObjList.push(file);
        } else {
          const uploadedDoc = await handleUploadMultipleDoc(file);
          uploadedDoc.documentType = docType;
          docObjList.push(uploadedDoc);
        }
      }
    };

    await uploadDocuments(values.otherDocs, DocumentTypes.SONSTIGE);
    await uploadDocuments(values.floorplanDocs, DocumentTypes.GRUNDRISSE);
    await uploadDocuments(values.checkReports, DocumentTypes.BERICHTE);

    try {
      await saveFacilityData(values, docObjList);
      return true;
    } catch {
      appdispatch(
        showSnackbar({
          type: "error",
          message:
            "Die Anlage konnte nicht hinzugefügt oder bearbeitet werden. Bitte versuchen Sie es erneut!",
        })
      );
      return false;
    } finally {
      setLoading(false);
    }
  };

  const initialValues: AddFacilityFormValues = {
    name: "",
    facilityType: "",
    subcategory: "",
    isPublishAutomatically: false,
    publishAutomaticallyInMonths: 0,
    isReminderEnabled: false,
    emailNotificationList: ["", ""],
    selectedBuilding: "",
    documentChoice: "Jetzt hochladen Empfohlen",
    checkReports: [],
    floorplanDocs: [],
    otherDocs: [],
    serverLink: "",
    lastMaintenanceDate: null,
    nextMaintenanceInMonth: 0,
    isPublishMaintenanceAutomatically: false,
    publishMaintenanceAutomaticallyInMonth: 0,
    maintenanceReminderInMonth: 0,
    maintenanceEmailNotificationList: ["", ""],
    isMaintenanceEmailNotificationEnable: false,
    lastCheckDate: null,
    nextCheckInYearNumber: 0,
    reminderInMonth: 0,
    isEmailNotificationEnable: false,
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
                loading={loading}
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
    height: "42.375rem",
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
