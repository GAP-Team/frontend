"use client";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { Formik, FormikHelpers } from "formik";
import Grid from "@mui/material/Grid";
import buildingAPIs from "@/api/building";
import { getLogger } from "@/utils/Logger";
import { ActiveStepItem } from "../../types";
import {
  AddBuildingFormValues,
  NewBuildingProps,
  SelectedBuildingData,
} from "./types";
import { SubmitFormFunction } from "@/typings/types";
import {
  currentUser,
  setUserBuildings,
  currentUserBuildings,
  setAllBuildingDetails,
  allBuildingDetails,
} from "@/lib/features/userSlice";

import AddBuildingForm from "./AddBuildingForm";
import BuildingAddress from "./BuildingAddress";
import BuildingSummary from "./BuildingSummary";
import PageTitle from "@/components/label/PageTitle";
import BuildingInformation from "./BuildingInformation";
import BuildingDocumentation from "./BuildingDocumentation";
import { DocumentTypies } from "@/utils/Constants";
import { handleUploadMultipleDoc } from "@/utils/uploadToS3";
import { addObjektFormSchema } from "@/utils/ValidationSchema";
import { useAppDispatch } from "@/lib/hooks";
import { showSnackbar } from "@/components/root-snackbar";

// Logger
const logger = getLogger("new-building");

const NewBuilding: React.FC<NewBuildingProps> = ({ id }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector(currentUser);
  const allBuildings = useSelector(allBuildingDetails);
  const userBuildings = useSelector(currentUserBuildings);

  const appdispatch = useAppDispatch();

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
  const [buildingDetails, setBuildingDetails] =
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
    const selectedBuildingDetails = allBuildings?.filter(
      (building: any) => id === building?._id
    );
    setBuildingDetails(selectedBuildingDetails[0]);
  };

  const initialValues: AddBuildingFormValues = {
    name: buildingDetails?.buildingName || "",
    totalArea: buildingDetails?.totalArea || "",
    buildingType: buildingDetails?.buildingType || "",
    buildingAbbreviation: buildingDetails?.buildingAbbreviation || "",
    contactPerson: buildingDetails?.contactPerson
      ? buildingDetails?.contactPerson
      : [],
    zip: buildingDetails?.address?.zip || "",
    city: buildingDetails?.address?.city || "",
    state: buildingDetails?.address?.state || "",
    street: buildingDetails?.address?.street || "",
    houseNumber: buildingDetails?.address?.houseNumber || "",
    country: buildingDetails?.address?.country || "Deutschland",
    documentChoice:
      buildingDetails?.documentUploadType || "Jetzt hochladen Empfohlen",
    constructionDocs:
      buildingDetails?.documents?.filter(
        (doc: any) => doc.documentType === "BAUUNTERLAGEN"
      ) || [],
    floorplanDocs:
      buildingDetails?.documents?.filter(
        (doc: any) => doc.documentType === "GRUNDRISSE"
      ) || [],
    otherDocs:
      buildingDetails?.documents?.filter(
        (doc: any) => doc.documentType === "SONSTIGE"
      ) || [],

    serverLink: buildingDetails?.serverLink || "",
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
          setActiveStep({ ...activeStep, id: nextStepId });
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

  const handleSubmit = async (
    values: AddBuildingFormValues,
    docObj: any[] = []
  ): Promise<void> => {
    const addressObj = {
      city: values.city,
      state: values.state,
      street: values.street,
      country: values.country,
      zip: Number(values.zip),
      houseNumber: Number(values.houseNumber),
    };

    const formateDate = moment().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");

    let arrangedDataObj = {
      userId: user?._id,
      documents: docObj,
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
      return await UpdateBuildingData(arrangedDataObj);
    } else if (actionType === "add") {
      return await saveBuildingData(arrangedDataObj);
    }
  };

  const uploadAllDocuments = async (
    values: AddBuildingFormValues
  ): Promise<boolean> => {
    setLoading(true);
    const docObj: any[] = [];

    const uploadDocuments = async (
      files: File[],
      docType: string
    ): Promise<void> => {
      for (const file of files) {
        if (file.hasOwnProperty("documentType")) {
          docObj.push(file);
        } else {
          const uploadedDoc = await handleUploadMultipleDoc(file);
          uploadedDoc.documentType = docType;
          docObj.push(uploadedDoc);
        }
      }
    };

    await uploadDocuments(values.otherDocs, DocumentTypies.SONSTIGE);
    await uploadDocuments(values.floorplanDocs, DocumentTypies.GRUNDRISSE);
    await uploadDocuments(
      values.constructionDocs,
      DocumentTypies.BAUUNTERLAGEN
    );

    try {
      await handleSubmit(values, docObj);
      return true;
    } catch (error) {
      appdispatch(
        showSnackbar({
          type: "error",
          message:
            "Gebäude konnte nicht hinzugefügt oder bearbeitet werden. Bitte versuchen Sie es erneut!",
        })
      );
      return false;
    } finally {
      setLoading(false);
    }
  };

  const saveBuildingData = async (data: any): Promise<void> => {
    const createBuildingResponse = await buildingAPIs.create(data);
    if (createBuildingResponse?.data?.buildingId) {
      const updatedBuildings = [
        ...userBuildings,
        createBuildingResponse.data.buildingId,
      ];
      dispatch(setUserBuildings(updatedBuildings));
      appdispatch(
        showSnackbar({
          type: "success",
          message: "Gebäude erfolgreich hinzugefügt!",
        })
      );
    } else {
      throw new Error("Building creation failed.");
    }
  };

  const UpdateBuildingData = async (data: any): Promise<void> => {
    if (!buildingDetails?._id) {
      throw new Error("Building edit failed");
    }

    const createBuildingResponse = await buildingAPIs.update(
      buildingDetails?._id,
      data
    );
    if (createBuildingResponse?.data?.buildingId) {
      const updatedBuildings = [
        ...userBuildings,
        createBuildingResponse.data.buildingId,
      ];
      dispatch(setUserBuildings(updatedBuildings));
    }
    if (user?._id) return;
    const allUpdatedBuildings = await buildingAPIs.getBuildings(
      user?._id,
      "",
      "",
      ""
    );
    dispatch(setAllBuildingDetails(allUpdatedBuildings.data));
    appdispatch(
      showSnackbar({
        type: "success",
        message: "Gebäude erfolgreich aktualisiert!",
      })
    );
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
