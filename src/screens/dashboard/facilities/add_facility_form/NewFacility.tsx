"use client";
import {
  ActiveStepItem,
  StepComponentProps,
  AddFacilityFormValues,
} from "./types";
import Link from "next/link";
import Grid from "@mui/material/Grid";
import { CgClose } from "react-icons/cg";
import { useSelector } from "react-redux";
import { IconButton } from "@mui/material";
import FacilityCheck from "./FacilityCheck";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
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
import {
  createFacility,
  getFacilityById,
  updateFacility,
} from "@/lib/features/facilitySlice";
import dayjs from "dayjs";
import { DocumentChoice } from "@/utils/enums";

interface NewFacilityProps {
  facilityId?: string;
}

const NewFacility: React.FC<NewFacilityProps> = ({
  facilityId,
}): JSX.Element => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useSelector(currentUser);
  const facility = useAppSelector(getFacilityById(facilityId));

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
  const [activeStep, setActiveStep] = useState<ActiveStepItem>(steps[0]);

  const StepComponent = steps[activeStep.id]
    ?.component as React.ComponentType<StepComponentProps>;

  useEffect(() => {
    setActiveStep(steps[0]);
    setIsSubmitted(false);
    getUserBuildingDetails();
  }, []);

  const getUserBuildingDetails = async (): Promise<void> => {
    const query = {
      userId: user?.id,
      city: "",
      federalState: "",
      facilityType: "",
    };
    dispatch(fetchBuildings(query));
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

    if (facility) {
      try {
        await dispatch(
          updateFacility({ facilityId: facility?.id, data: facilityData })
        ).unwrap();
        dispatch(
          showSnackbar({
            type: "success",
            message: "Die Anlage wurde erfolgreich aktualisiert!",
          })
        );
        return true;
      } catch {
        dispatch(
          showSnackbar({
            type: "error",
            message:
              "Die Anlage konnte nicht aktualisiert werden. Bitte überprüfen Sie die Eingabedaten und versuchen Sie es erneut",
          })
        );
        return false;
      }
    } else {
      try {
        await dispatch(createFacility(facilityData)).unwrap();
        dispatch(
          showSnackbar({
            type: "success",
            message: "Die Anlage wurde erfolgreich hinzugefügt!",
          })
        );
        return true;
      } catch {
        dispatch(
          showSnackbar({
            type: "error",
            message:
              "Anlage konnte nicht hinzugefügt werden. Bitte überprüfen Sie die Eingabedaten und versuchen Sie es erneut",
          })
        );
        return false;
      }
    }
  };

  const uploadAllDocuments = async (
    values: AddFacilityFormValues
  ): Promise<boolean> => {
    // If document choice is NO_DOCUMENTS, pass empty array
    if (values.documentChoice === DocumentChoice.NO_DOCUMENTS) {
      return await saveFacilityData(values, []);
    }

    const docTypes = [
      { files: values.otherDocs, type: DocumentTypes.SONSTIGE },
      { files: values.floorplanDocs, type: DocumentTypes.GRUNDRISSE },
      { files: values.checkReports, type: DocumentTypes.BERICHTE },
    ];

    try {
      const docObjList = await Promise.all(
        docTypes.flatMap(async ({ files, type }) => {
          return Promise.all(
            files.map(async (file) => {
              if ("documentType" in file) {
                return file;
              }
              const uploadedDoc = await handleUploadMultipleDoc(file);
              return { ...uploadedDoc, documentType: type };
            })
          );
        })
      ).then((results) => results.flat());

      await saveFacilityData(values, docObjList);
      return true;
    } catch {
      dispatch(
        showSnackbar({
          type: "error",
          message:
            "Die Anlage konnte nicht hinzugefügt oder bearbeitet werden. Bitte versuchen Sie es erneut!",
        })
      );
      return false;
    }
  };

  const initialValues: AddFacilityFormValues = {
    name: facility?.name || "",
    facilityType: facility?.facilityType || "",
    subcategory: facility?.subcategory || "",
    isPublishAutomatically: facility?.check?.isPublishAutomatically || false,
    publishAutomaticallyInMonths:
      facility?.check?.publishAutomaticallyInMonth || 0,
    isReminderEnabled: false,
    emailNotificationList: facility?.check?.emailNotificationList || ["", ""],
    selectedBuilding: facility?.buildingId || "",
    documentChoice: facility?.documentUploadType || DocumentChoice.UPLOAD_NOW,
    checkReports:
      facility?.documents?.filter(
        (doc: any) => doc.documentType === DocumentTypes.BERICHTE
      ) || [],
    floorplanDocs:
      facility?.documents?.filter(
        (doc: any) => doc.documentType === DocumentTypes.GRUNDRISSE
      ) || [],
    otherDocs:
      facility?.documents?.filter(
        (doc: any) => doc.documentType === DocumentTypes.SONSTIGE
      ) || [],
    serverLink: facility?.serverLink || "",
    lastMaintenanceDate:
      (facility && dayjs(facility?.maintenance?.lastMaintenanceDate)) || null,
    nextMaintenanceInMonth: facility?.maintenance?.nextMaintenanceInMonth || 0,
    isPublishMaintenanceAutomatically:
      facility?.maintenance?.isPublishAutomatically || false,
    publishMaintenanceAutomaticallyInMonth:
      facility?.maintenance?.publishAutomaticallyInMonth || 0,
    maintenanceReminderInMonth: facility?.maintenance?.reminderInMonth || 0,
    maintenanceEmailNotificationList: facility?.maintenance
      ?.emailNotificationList || ["", ""],
    isMaintenanceEmailNotificationEnable:
      facility?.maintenance?.isEmailNotificationEnable || false,
    lastCheckDate: (facility && dayjs(facility?.check?.lastCheckDate)) || null,
    nextCheckInYearNumber: facility?.check?.nextCheckInYearNumber || 0,
    reminderInMonth: facility?.check?.reminderInMonth || 0,
    isEmailNotificationEnable:
      facility?.check?.isEmailNotificationEnable || false,
  };

  const formOrSuccessContent = isSubmitted ? (
    <SuccessPage
      title={facility ? "Anlage aktualisiert!" : "Anlage angelegt!"}
      primaryDescription={facility ? "Anlage wurde erfolgreich aktualisiert" : "Anlage wurde erfolgreich angelegt"}
      {...(!facility && {
        buttonLabel: "Schließen",
        redirectUrl: "/real_estate/facilities"
      })}
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
          <Link href="/real_estate/facilities</Grid>" type="button">
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
