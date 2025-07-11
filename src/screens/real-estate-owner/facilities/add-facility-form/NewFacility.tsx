"use client";
import {
  ActiveStepItem,
  StepComponentProps,
  AddFacilityFormValues,
} from "./types";
import Link from "next/link";
import Grid from "@mui/material/Grid";
import { ROUTES } from "@/utils/routes";
import { CgClose } from "react-icons/cg";
import { IconButton } from "@mui/material";
import FacilityCheck from "./FacilityCheck";
import { useRouter } from "next/navigation";
import { Formik, FormikHelpers } from "formik";
import AddFacilityForm from "./AddFacilityForm";
import FacilitySummary from "./FacilitySummary";
import React, { useEffect, useState } from "react";
import PageTitle from "@/components/data-display/label/PageTitle";
import FacilityMaintenance from "./FacilityMaintenance";
import FacilityInformation from "./FacilityInformation";
import SuccessPage from "@/components/common/pages/SuccessPage";
import { showSnackbar } from "@/components/feedback/snackbar";
import SectionTitle from "@/components/data-display/label/SectionTitle";
import { DEFAULT_PUBLISH_MONTHS } from "@/utils/Constants";
import FacilityDocumentation from "./FacilityDocumentation";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { handleUploadMultipleDoc } from "@/utils/uploadToS3";
import { fetchBuildings } from "@/lib/features/buildingSlice";
import { currentUser, isUserActive } from "@/lib/features/userSlice";
import GProgressStepper from "@/components/navigation/stepper/GProgressStepper";
import { addFacilityValidationSchema } from "@/utils/ValidationSchema";
import {
  createFacility,
  getFacilityById,
  updateFacility,
} from "@/lib/features/facilitySlice";
import { DOCUMENT_TYPE, DocumentChoice } from "@/utils/enums";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { Facility } from "../facility-card/types";

dayjs.extend(utc);
interface NewFacilityProps {
  facilityId?: string;
}

const NewFacility: React.FC<NewFacilityProps> = ({
  facilityId,
}): JSX.Element => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector(currentUser);
  const checkActiveUser = useAppSelector(isUserActive);
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

  const getInitialFormValues = (): AddFacilityFormValues => ({
    name: facility?.name || "",
    facilityType: facility?.facilityType || "",
    subcategory: facility?.subcategory || "",
    isPublishCheckAutomatically:
      facility?.check?.isPublishAutomatically || false,
    publishCheckAutomaticallyInMonth:
      facility?.check?.publishAutomaticallyInMonth || DEFAULT_PUBLISH_MONTHS,
    isReminderEnabled: false,
    emailNotificationList: facility?.check?.emailNotificationList || ["", ""],
    selectedBuilding: facility?.buildingId || "",
    documentChoice: facility?.documentUploadType || DocumentChoice.UPLOAD_NOW,
    checkReports:
      facility?.documents?.filter(
        (doc: any) => doc.documentType === DOCUMENT_TYPE.CHECK_REPORTS
      ) || [],
    floorplanDocs:
      facility?.documents?.filter(
        (doc: any) => doc.documentType === DOCUMENT_TYPE.FLOOR_PLANS
      ) || [],
    otherDocs:
      facility?.documents?.filter(
        (doc: any) => doc.documentType === DOCUMENT_TYPE.OTHER
      ) || [],
    serverLink: facility?.serverLink || "",
    lastMaintenanceDate: facility?.maintenance?.lastMaintenanceDate
      ? dayjs(facility.maintenance.lastMaintenanceDate)
      : null,
    nextMaintenanceInMonth: facility?.maintenance?.nextMaintenanceInMonth || 0,
    isPublishMaintenanceAutomatically:
      facility?.maintenance?.isPublishAutomatically || false,
    publishMaintenanceAutomaticallyInMonth:
      facility?.maintenance?.publishAutomaticallyInMonth ||
      DEFAULT_PUBLISH_MONTHS,
    maintenanceReminderInMonth: facility?.maintenance?.reminderInMonth || 0,
    maintenanceEmailNotificationList: facility?.maintenance
      ?.emailNotificationList || ["", ""],
    isMaintenanceEmailNotificationEnable:
      facility?.maintenance?.isEmailNotificationEnable || false,
    lastCheckDate: facility?.check?.lastCheckDate
      ? dayjs(facility?.check?.lastCheckDate)
      : null,
    nextCheckInYearNumber: facility?.check?.nextCheckInYearNumber || 0,
    reminderInMonth: facility?.check?.reminderInMonth || 0,
    isEmailNotificationEnable:
      facility?.check?.isEmailNotificationEnable || false,
  });

  const [formData, setFormData] = useState<AddFacilityFormValues>(() =>
    getInitialFormValues()
  );

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
      state: "",
      facilityType: "",
    };
    dispatch(fetchBuildings(query));
  };

  const handleNext = async (
    values: AddFacilityFormValues,
    actions: FormikHelpers<AddFacilityFormValues>
  ): Promise<void> => {
    const updatedValues = { ...formData, ...values };
    setFormData(updatedValues);
    if (activeStep?.id === steps.length - 1) {
      if (checkActiveUser) {
        const saveStatus = await uploadAllDocuments(values);
        if (saveStatus) {
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

  const handleBack = (): void => {
    if (activeStep.id > 0) {
      setActiveStep(steps[activeStep.id - 1]);
    } else {
      router.push(ROUTES.REAL_ESTATE.DASHBOARD);
    }
  };

  const saveFacilityData = async (
    values: AddFacilityFormValues,
    docObjList: any[] = []
  ): Promise<boolean> => {
    let facilityData: Partial<Facility> = {
      name: values?.name,
      facilityType: values?.facilityType,
      subcategory: values?.subcategory,
      buildingId: values?.selectedBuilding,
      check: {
        lastCheckDate: values?.lastCheckDate
          ? dayjs(values.lastCheckDate.utc(true).format("YYYY-MM-DD"))
          : null,
        nextCheckInYearNumber: values?.nextCheckInYearNumber,
        isPublishAutomatically: values?.isPublishCheckAutomatically,
        publishAutomaticallyInMonth: values?.isPublishCheckAutomatically
          ? Number(values?.publishCheckAutomaticallyInMonth)
          : 0,
        reminderInMonth: values?.reminderInMonth,
        isEmailNotificationEnable: values?.isEmailNotificationEnable,
        emailNotificationList: values?.isEmailNotificationEnable
          ? values.emailNotificationList?.filter((item) => item !== "") || [
              "",
              "",
            ]
          : ["", ""],
      },
      maintenance: {
        lastMaintenanceDate: values?.lastMaintenanceDate
          ? dayjs(values?.lastMaintenanceDate?.utc(true).format("YYYY-MM-DD"))
          : null,
        nextMaintenanceInMonth: values?.nextMaintenanceInMonth,
        isPublishAutomatically: values?.isPublishMaintenanceAutomatically,
        publishAutomaticallyInMonth: values?.isPublishMaintenanceAutomatically
          ? Number(values?.publishMaintenanceAutomaticallyInMonth)
          : 0,
        reminderInMonth: values?.maintenanceReminderInMonth,
        isEmailNotificationEnable: values?.isMaintenanceEmailNotificationEnable,
        emailNotificationList: values?.isMaintenanceEmailNotificationEnable
          ? values.maintenanceEmailNotificationList?.filter(
              (item) => item !== ""
            ) || ["", ""]
          : ["", ""],
      },
      documents: docObjList,
      documentUploadType: values?.documentChoice,
      serverLink: values?.serverLink,
    };

    try {
      if (facility) {
        await dispatch(
          updateFacility({ facilityId: facility.id, data: facilityData })
        ).unwrap();
        dispatch(
          showSnackbar({
            type: "success",
            message: "Die Anlage wurde erfolgreich aktualisiert!",
          })
        );
      } else {
        await dispatch(createFacility(facilityData)).unwrap();
        dispatch(
          showSnackbar({
            type: "success",
            message: "Die Anlage wurde erfolgreich hinzugefügt!",
          })
        );
      }
      return true;
    } catch {
      dispatch(
        showSnackbar({
          type: "error",
          message: facility
            ? "Die Anlage konnte nicht aktualisiert werden. Bitte überprüfen Sie die Eingabedaten und versuchen Sie es erneut"
            : "Anlage konnte nicht hinzugefügt werden. Bitte überprüfen Sie die Eingabedaten und versuchen Sie es erneut",
        })
      );
      return false;
    }
  };

  const uploadAllDocuments = async (
    values: AddFacilityFormValues
  ): Promise<boolean> => {
    if (values.documentChoice === DocumentChoice.NO_DOCUMENTS) {
      return await saveFacilityData(values, []);
    }

    const docTypes = [
      { files: values.otherDocs, type: DOCUMENT_TYPE.OTHER },
      { files: values.floorplanDocs, type: DOCUMENT_TYPE.FLOOR_PLANS },
      { files: values.checkReports, type: DOCUMENT_TYPE.CHECK_REPORTS },
    ];

    try {
      const docObjList = await Promise.all(
        docTypes.flatMap(({ files, type }) =>
          files.map(async (file) => {
            if ("documentType" in file) return file;
            const uploaded = await handleUploadMultipleDoc(file);
            return { ...uploaded, documentType: type };
          })
        )
      );

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

  const formOrSuccessContent = isSubmitted ? (
    <SuccessPage
      title={facility ? "Anlage aktualisiert!" : "Anlage angelegt!"}
      primaryDescription={
        facility
          ? "Anlage wurde erfolgreich aktualisiert"
          : "Anlage wurde erfolgreich angelegt"
      }
      buttonLabel={"Schließen"}
      redirectUrl={ROUTES.REAL_ESTATE.FACILITY.FACILITIES}
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
          <Link href={ROUTES.REAL_ESTATE.FACILITY.FACILITIES}>
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
          title={facility ? "Anlage Bearbeiten" : "Neue Anlage erstellen"}
          sx={{ ml: "1.5rem" }}
        />
        <Formik
          initialValues={formData}
          validationSchema={addFacilityValidationSchema[activeStep.id]}
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
