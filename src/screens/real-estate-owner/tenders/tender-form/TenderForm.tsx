"use client";
import Link from "next/link";
import Grid from "@mui/material/Grid";
import { CgClose } from "react-icons/cg";
import { IconButton } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Formik, FormikHelpers } from "formik";
import moment from "moment";
import {
  NewTenderProps,
  ActiveStepItem,
  StepComponentProps,
  TenderFormValues,
  NewBuildingFields,
  NewFacilityFields,
} from "./types";
import dayjs from "dayjs";
import AddTenderForm from "./AddTenderForm";
import TenderSummary from "./TenderSummary";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import TenderBuilding from "./TenderBuilding";
import TenderInformation from "./TenderInformation";
import TenderDescription from "./TenderDescription";
import PageTitle from "@/components/data-display/label/PageTitle";
import SuccessPage from "@/components/common/pages/SuccessPage";
import TenderClassification from "./TenderClassification";
import { showSnackbar } from "@/components/feedback/snackbar";
import SectionTitle from "@/components/data-display/label/SectionTitle";
import { addTenderValidationSchema } from "@/utils/ValidationSchema";
import GProgressStepper from "@/components/navigation/stepper/GProgressStepper";
import { DocumentChoice, ObjectFacilityMode, TENDER_FORM } from "@/utils/enums";
import { currentUser, isUserActive } from "@/lib/features/userSlice";
import {
  createTender,
  getTenderById,
  updateTender,
} from "@/lib/features/tenderSlice";
import buildingAPI from "@/api/building";
import facilityAPI from "@/api/facility";
import { addBuilding } from "@/lib/features/buildingSlice";
import { addFacilities } from "@/lib/features/facilitySlice";
import { Facility } from "@/screens/real-estate-owner/facilities/facility-overview/types";
import { DEFAULT_PUBLISH_MONTHS } from "@/utils/Constants";
import logger from "@/utils/Logger";
import { ROUTES } from "@/utils/routes";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

interface CreatedBuildingFacility {
  buildingId: string;
  buildingName: string;
  facilityId: string;
  facilityName: string;
}

const TenderForm: React.FC<NewTenderProps> = ({ id }): JSX.Element => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector(currentUser);
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

  const getInitialFormValues = (): TenderFormValues => ({
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
    objectFacilityMode: ObjectFacilityMode.EXISTING,
    newBuilding: {
      name: "",
      buildingType: "",
      street: "",
      houseNumber: "",
      zip: "",
      city: "",
      state: "",
    },
    newFacility: {
      name: "",
      facilityType: "",
      subcategory: "",
      numberOfUnits: 1,
    },
  });

  const [formData, setFormData] = useState<TenderFormValues>(() =>
    getInitialFormValues()
  );

  const handleNext = async (
    values: TenderFormValues,
    actions: FormikHelpers<TenderFormValues>
  ): Promise<void> => {
    const updatedValues = { ...formData, ...values };
    setFormData(updatedValues);
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
              "Ihr Konto ist noch nicht aktiviert. Bitte warten Sie, bis die Administration Ihr Konto freischaltet. Sie erhalten eine E-Mail, sobald dies geschehen ist.",
          })
        );
      }
    } else {
      setActiveStep(steps[activeStep.id + 1]);
      actions.setTouched({});
      actions.setSubmitting(false);
    }
  };

  const createBuildingUnderTheHood = async (
    newBuilding: NewBuildingFields
  ): Promise<{ id: string; name: string } | null> => {
    const address = {
      city: newBuilding.city,
      state: newBuilding.state,
      street: newBuilding.street,
      country: "Deutschland",
      zip: Number(newBuilding.zip),
      houseNumber: Number(newBuilding.houseNumber),
    };

    const building = {
      userId: user?.id,
      documents: [],
      address,
      createdAt: moment().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
      buildingName: newBuilding.name,
      serverLink: "",
      buildingType: newBuilding.buildingType,
      totalArea: null,
      contactPerson: [],
      documentUploadType: DocumentChoice.NO_DOCUMENTS,
      buildingAbbreviation: "",
    };

    try {
      const response = await buildingAPI.create(building);
      const newBuildingId = response?.data?.id;
      if (!newBuildingId) {
        throw new Error("Building creation did not return an id");
      }

      dispatch(
        addBuilding({
          id: newBuildingId,
          buildingName: building.buildingName,
          buildingType: building.buildingType,
          totalArea: 0,
          address,
          facilityIds: [],
          documents: [],
          tendersCount: 0,
        })
      );

      return { id: newBuildingId, name: building.buildingName };
    } catch (error) {
      logger.error("Error creating building for tender: ", error);
      dispatch(
        showSnackbar({
          type: "error",
          message:
            "Gebäude konnte nicht erstellt werden. Bitte versuchen Sie es später erneut.",
        })
      );
      return null;
    }
  };

  const createFacilityUnderTheHood = async (
    newFacility: NewFacilityFields,
    buildingId: string
  ): Promise<{ id: string; name: string } | null> => {
    const facilityData: Partial<Facility> = {
      name: newFacility.name,
      facilityType: newFacility.facilityType,
      subcategory: newFacility.subcategory,
      numberOfUnits: Number(newFacility.numberOfUnits),
      buildingId,
      check: {
        lastCheckDate: null,
        nextCheckInYearNumber: 0,
        isPublishAutomatically: false,
        publishAutomaticallyInMonth: DEFAULT_PUBLISH_MONTHS,
        reminderInMonth: 0,
        isEmailNotificationEnable: false,
        emailNotificationList: ["", ""],
      },
      maintenance: {
        lastMaintenanceDate: null,
        nextMaintenanceInMonth: 0,
        isPublishAutomatically: false,
        publishAutomaticallyInMonth: DEFAULT_PUBLISH_MONTHS,
        reminderInMonth: 0,
        isEmailNotificationEnable: false,
        emailNotificationList: ["", ""],
      },
      documents: [],
      documentUploadType: DocumentChoice.NO_DOCUMENTS,
      serverLink: "",
    };

    try {
      const response = await facilityAPI.create(facilityData as Facility);
      const newFacilityId = response?.data?.id;
      if (!newFacilityId) {
        throw new Error("Facility creation did not return an id");
      }

      dispatch(
        addFacilities([
          { ...facilityData, id: newFacilityId, tenderIds: [] } as Facility,
        ])
      );

      return { id: newFacilityId, name: newFacility.name };
    } catch (error) {
      logger.error("Error creating facility for tender: ", error);
      dispatch(
        showSnackbar({
          type: "error",
          message:
            "Anlage konnte nicht hinzugefügt werden. Bitte überprüfen Sie die Eingabedaten und versuchen Sie es erneut",
        })
      );
      return null;
    }
  };

  const createBuildingAndFacility = async (
    values: TenderFormValues
  ): Promise<CreatedBuildingFacility | null> => {
    const createdBuilding = await createBuildingUnderTheHood(
      values.newBuilding
    );
    if (!createdBuilding) {
      return null;
    }

    const createdFacility = await createFacilityUnderTheHood(
      values.newFacility,
      createdBuilding.id
    );
    if (!createdFacility) {
      return null;
    }

    return {
      buildingId: createdBuilding.id,
      buildingName: createdBuilding.name,
      facilityId: createdFacility.id,
      facilityName: createdFacility.name,
    };
  };

  const saveTenderData = async (values: TenderFormValues): Promise<boolean> => {
    let buildingId = values?.buildingId;
    let buildingName = values?.buildingName;
    let facilityId = values?.facilityId;
    let facilityName = values?.facilityName;

    if (!tender && values.objectFacilityMode === ObjectFacilityMode.NEW) {
      const created = await createBuildingAndFacility(values);
      if (!created) {
        return false;
      }
      ({ buildingId, buildingName, facilityId, facilityName } = created);
    }

    let buildingObj = {
      id: buildingId,
      name: buildingName,
    };
    let facilityObj = {
      id: facilityId,
      name: facilityName,
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

  const formOrSuccessContent = isSubmitted ? (
    <SuccessPage
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
          initialValues={formData}
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

export default TenderForm;

const styles = {
  form: {
    marginLeft: "3.75rem",
    marginRight: "3.5rem",
    display: "flex",
    flexDirection: "row",
    backgroundColor: "white",
    height: "37.375rem",
    overflowY: "auto",
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
