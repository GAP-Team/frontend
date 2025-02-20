"use client";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { Formik, FormikHelpers } from "formik";
import Grid from "@mui/material/Grid";
import buildingAPIs from "@/api/building";
import { ActiveStepItem } from "../../types";
import {
  AddBuildingFormValues,
  NewBuildingProps,
  SelectedBuildingData,
} from "./types";
import { SubmitFormFunction } from "@/typings/types";
import { currentUser } from "@/lib/features/userSlice";

import AddBuildingForm from "./AddBuildingForm";
import BuildingAddress from "./BuildingAddress";
import BuildingSummary from "./BuildingSummary";
import PageTitle from "@/components/label/PageTitle";
import BuildingInformation from "./BuildingInformation";
import BuildingDocumentation from "./BuildingDocumentation";
import { handleUploadMultipleDoc } from "@/utils/uploadToS3";
import { addObjektFormSchema } from "@/utils/ValidationSchema";
import { useAppDispatch } from "@/lib/hooks";
import { showSnackbar } from "@/components/root-snackbar";
import { getUserBuildings } from "@/lib/features/buildingSlice";
import { DOCUMENT_TYPE } from "@/utils/enums";

const NewBuilding: React.FC<NewBuildingProps> = ({ id }) => {
  const router = useRouter();
  const appdispatch = useAppDispatch();
  const user = useSelector(currentUser);
  const userBuildingDetails = useSelector(getUserBuildings);

  const steps: ActiveStepItem[] = [
    { id: 0, stepName: "Objektinformation", component: BuildingInformation },
    { id: 1, stepName: "Objektanschrift", component: BuildingAddress },
    {
      id: 2,
      stepName: "Objektdokumentation",
      component: BuildingDocumentation,
    },
    { id: 3, stepName: "Übersicht Objektdaten", component: BuildingSummary },
  ];

  const [actionType, setActionType] = useState("add");
  const [loading, setLoading] = useState<boolean>(false);
  const [activeStep, setActiveStep] = useState<ActiveStepItem>(steps[0]);
  const [selectedBuildingDetails, setSelectedBuildingDetails] =
    useState<SelectedBuildingData | null>();

  useEffect(() => {
    if (id === "") {
      setActionType("add");
    } else {
      setActionType("edit");
      getCurrentBuildingDetails(id);
    }
  }, []);

  const getCurrentBuildingDetails = (id: any): void => {
    const selectedBuildingDetails = userBuildingDetails?.find(
      (building: any) => id === building?.id
    );
    setSelectedBuildingDetails(selectedBuildingDetails);
  };

  const initialValues: AddBuildingFormValues = {
    name: selectedBuildingDetails?.buildingName || "",
    totalArea: selectedBuildingDetails?.totalArea || "",
    buildingType: selectedBuildingDetails?.buildingType || "",
    buildingAbbreviation: selectedBuildingDetails?.buildingAbbreviation || "",
    contactPerson: selectedBuildingDetails?.contactPerson
      ? selectedBuildingDetails?.contactPerson
      : [],
    zip: selectedBuildingDetails?.address?.zip || "",
    city: selectedBuildingDetails?.address?.city || "",
    state: selectedBuildingDetails?.address?.state || "",
    street: selectedBuildingDetails?.address?.street || "",
    houseNumber: selectedBuildingDetails?.address?.houseNumber || "",
    country: selectedBuildingDetails?.address?.country || "Deutschland",
    documentChoice:
      selectedBuildingDetails?.documentUploadType ||
      "Jetzt hochladen Empfohlen",
    constructionDocs:
      selectedBuildingDetails?.documents?.filter(
        (doc: any) => doc.documentType === DOCUMENT_TYPE.CONSTRUCTION_DOCUMENTS
      ) || [],
    floorplanDocs:
      selectedBuildingDetails?.documents?.filter(
        (doc: any) => doc.documentType === DOCUMENT_TYPE.FLOOR_PLANS
      ) || [],
    otherDocs:
      selectedBuildingDetails?.documents?.filter(
        (doc: any) => doc.documentType === DOCUMENT_TYPE.OTHER
      ) || [],

    serverLink: selectedBuildingDetails?.serverLink || "",
  };

  const stepFieldsMap: { [key: number]: string[] } = {
    0: [
      "name",
      "totalArea",
      "buildingType",
      "buildingAbbreviation",
      "contactPerson",
    ],
    1: ["zip", "street", "country", "houseNumber", "city", "state"],
    2: ["serverLink", "constructionDocs", "floorplanDocs", "otherDocs"],
  };

  const handleNext = async (
    validateForm: FormikHelpers<AddBuildingFormValues>["validateForm"],
    setTouched: FormikHelpers<AddBuildingFormValues>["setTouched"],
    submitForm: SubmitFormFunction,
    values: AddBuildingFormValues
  ): Promise<void> => {
    const currentStepFields = stepFieldsMap[activeStep.id];
    setTouched(
      currentStepFields?.reduce((acc, field) => ({ ...acc, [field]: true }), {})
    );

    const errors = await validateForm();
    const hasErrors = currentStepFields?.some(
      (field) => (errors as any)[field]
    );

    if (!hasErrors) {
      const nextStepId = activeStep.id + 1;
      if (nextStepId < steps.length) {
        setActiveStep(steps[nextStepId]);
      } else {
        const uploadSuccess = await uploadAllDocuments(values);

        if (uploadSuccess) {
          setLoading(false);
          setActiveStep({ ...activeStep, id: nextStepId });
        } else {
          appdispatch(
            showSnackbar({
              type: "error",
              message:
                "Gebäude konnte nicht hinzugefügt oder bearbeitet werden. Bitte versuchen Sie es erneut!",
            })
          );
        }
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

  const uploadAllDocuments = async (
    values: AddBuildingFormValues
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

    await uploadDocuments(values.otherDocs, DOCUMENT_TYPE.OTHER);
    await uploadDocuments(values.floorplanDocs, DOCUMENT_TYPE.FLOOR_PLANS);
    await uploadDocuments(values.constructionDocs, DOCUMENT_TYPE.CONSTRUCTION_DOCUMENTS);

    const status = await handleSubmit(values, docObjList);

    if (status) {
      return true;
    } else {
      return false;
    }
  };

  const handleSubmit = async (
    values: AddBuildingFormValues,
    docObjList: any[] = []
  ): Promise<boolean> => {
    let status = false;
    const addressObj = {
      city: values.city,
      state: values.state,
      street: values.street,
      country: values.country,
      zip: Number(values.zip),
      houseNumber: Number(values.houseNumber),
    };

    const formateDate = moment().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");

    let buildingData = {
      userId: user?.id,
      documents: docObjList,
      address: addressObj,
      createdAt: formateDate,
      buildingName: values.name,
      serverLink: values.serverLink,
      buildingType: values.buildingType,
      totalArea: values.totalArea !== "" ? Number(values.totalArea) : null,
      contactPerson: values.contactPerson,
      documentUploadType: values.documentChoice,
      buildingAbbreviation: values.buildingAbbreviation,
    };

    if (actionType === "edit") {
      const saveStatus = await UpdateBuildingData(buildingData);
      if (saveStatus) {
        status = true;
      }
    } else if (actionType === "add") {
      const updateStatus = await saveBuildingData(buildingData);
      if (updateStatus) {
        status = true;
      }
    }

    return status;
  };

  const saveBuildingData = async (data: any): Promise<boolean> => {
    const createBuildingResponse = await buildingAPIs.create(data);
    if (createBuildingResponse?.data?.id) {
      appdispatch(
        showSnackbar({
          type: "success",
          message: "Gebäude erfolgreich hinzugefügt!",
        })
      );

      return true;
    } else {
      return false;
    }
  };

  const UpdateBuildingData = async (data: any): Promise<boolean> => {
    if (!selectedBuildingDetails?.id) {
      throw new Error("Building edit failed");
    }

    const updateBuildingResponse = await buildingAPIs.update(
      selectedBuildingDetails?.id,
      data
    );
    if (updateBuildingResponse?.data?.id) {
      appdispatch(
        showSnackbar({
          type: "success",
          message: "Gebäude erfolgreich aktualisiert!",
        })
      );

      return true;
    } else {
      return false;
    }
  };

  return (
    <Grid container component="main">
      <Grid item xs={12} md={12} lg={12} sx={{ backgroundColor: "#F9FAFA" }}>
        <PageTitle
          title={
            actionType === "edit"
              ? `Objekt Bearbeiten: ${initialValues?.name}`
              : `Neues Objekt erstellen`
          }
          sx={{ ml: "1.5rem" }}
        />
        <Formik
          initialValues={initialValues}
          validationSchema={addObjektFormSchema}
          onSubmit={() => {}}
          enableReinitialize
        >
          {({ validateForm, setTouched, submitForm, values }) => (
            <Grid sx={styles.form}>
              <AddBuildingForm
                steps={steps}
                activeStep={activeStep}
                handleBack={handleBack}
                handleNext={() =>
                  handleNext(validateForm, setTouched, submitForm, values)
                }
                setActiveStep={setActiveStep}
                loading={loading}
                actionType={actionType}
              />
            </Grid>
          )}
        </Formik>
      </Grid>
    </Grid>
  );
};

export default NewBuilding;

//Styles
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
};
