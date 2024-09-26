"use client";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, FormikHelpers } from "formik";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";

import userAPIs from "@/api/user";
import buildingAPIs from "@/api/building";
import { getLogger } from "@/utils/Logger";
import { ActiveStepItem } from "../../types";
import { AddBuildingFormValues } from "./types";
import { SubmitFormFunction } from "@/typings/types";
import {
  currentUser,
  setUserBuildings,
  currentUserBuildings,
  setAllBuildingDetails,
} from "@/lib/features/userSlice";

import AddBuildingForm from "./AddBuildingForm";
import BuildingAddress from "./BuildingAddress";
import BuildingSummary from "./BuildingSummary";
import PageTitle from "@/components/label/PageTitle";
import BuildingInformation from "./BuildingInformation";
import BuildingDocumentation from "./BuildingDocumentation";

import { DocumentTypies } from "@/utils/Constants";
import { handleUploadMultipleDoc } from "@/utils/uploadToS3";
import { allBuildingDetails } from "@/lib/features/userSlice";
import { addObjektFormSchema } from "@/utils/ValidationSchema";

// Logger
const logger = getLogger("new-building");

interface NewBuildingProps {
  id: string;
}
interface ContactP {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  // role: string;
  email: string;
}
interface Address {
  city: string;
  country: string;
  houseNumber: string;
  state: string;
  street: string;
  zip: string;
}
interface SelectedBuildingData {
  _id: string | undefined;
  buildingName: string;
  totalArea: string;
  buildingType: string;
  buildingAbbreviation: string;
  contactPerson: ContactP[];
  address: Address;
  documentUploadType: string;
  constructionDocs: File[] | undefined;
  floorplanDocs: File[] | undefined;
  otherDocs: File[] | undefined;
  documents: File[] | undefined;
  serverLink: string;
}

const NewBuilding: React.FC<NewBuildingProps> = ({ id }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector(currentUser);
  const allBuildings = useSelector(allBuildingDetails);
  const userBuildings = useSelector(currentUserBuildings);

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

  const getCurrentBuildingDetails = (id: any) => {
    const selectedBuildingDetails = allBuildings?.filter(
      (building: any) => id == building?._id
    );
    setBuildingDetails(selectedBuildingDetails[0]);
  };

  const initialValues: AddBuildingFormValues = {
    name: buildingDetails?.buildingName,
    totalArea: buildingDetails?.totalArea,
    buildingType: buildingDetails?.buildingType,
    buildingAbbreviation: buildingDetails?.buildingAbbreviation,
    contactPerson: buildingDetails?.contactPerson,
    zip: buildingDetails?.address?.zip,
    city: buildingDetails?.address?.city,
    state: buildingDetails?.address?.state,
    street: buildingDetails?.address?.street,
    houseNumber: buildingDetails?.address?.houseNumber,
    country: buildingDetails?.address?.country,
    documentChoice: buildingDetails?.documentUploadType,

    constructionDocs: buildingDetails?.documents?.filter(
      (doc: any) => doc.documentType == "BAUUNTERLAGEN"
    ),
    floorplanDocs: buildingDetails?.documents?.filter(
      (doc: any) => doc.documentType == "GRUNDRISSE"
    ),
    otherDocs: buildingDetails?.documents?.filter(
      (doc: any) => doc.documentType == "SONSTIGE"
    ),

    serverLink: buildingDetails?.serverLink,
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
        await uploadAllDocuments(values);
        setActiveStep({ ...activeStep, id: steps.length });
      }
    }
  };

  const handleBack = () => {
    if (activeStep.id > 0) {
      setActiveStep(steps[activeStep.id - 1]);
    } else {
      router.push("/real_estate/dashboard");
    }
  };

  const handleSubmit = async (
    values: AddBuildingFormValues,
    docObj: any[] = []
  ) => {
    try {
      const addressObj = {
        zip: values.zip,
        city: values.city,
        state: values.state,
        street: values.street,
        country: values.country,
        houseNumber: values.houseNumber,
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
        totalArea: Number(values.totalArea),
        contactPerson: values.contactPerson,
        documentUploadType: values.documentChoice,
        buildingAbbreviation: values.buildingAbbreviation,
      };
      if (actionType == "edit") {
        UpdateBuildingData(arrangedDataObj);
      } else {
        saveBuildingData(arrangedDataObj);
      }
    } catch (error: any) {
      logger.error(
        "Unable to create a new building, post reqeust failed " + error.name,
        error.message
      );
    }
  };

  const uploadAllDocuments = async (values: AddBuildingFormValues) => {
    setLoading(true);
    const docObj: any[] = [];

    const uploadDocuments = async (
      files: File[] | undefined,
      docType: string
    ) => {
      if (files !== undefined) {
        for (const file of files) {
          if (file.hasOwnProperty("documentType")) {
            docObj.push(file);
          } else {
            const uploadedDoc = await handleUploadMultipleDoc(file);
            uploadedDoc.documentType = docType;
            docObj.push(uploadedDoc);
          }
        }
      }
    };

    await uploadDocuments(values.otherDocs, DocumentTypies.SONSTIGE);
    await uploadDocuments(values.floorplanDocs, DocumentTypies.GRUNDRISSE);
    await uploadDocuments(
      values.constructionDocs,
      DocumentTypies.BAUUNTERLAGEN
    );

    handleSubmit(values, docObj);
    setLoading(false);
  };

  const saveBuildingData = async (data: any) => {
    const createBuildingResponse = await buildingAPIs.create(data);
    if (createBuildingResponse?.data?.buildingId) {
      const updatedBuildings = [
        ...userBuildings,
        createBuildingResponse.data.buildingId,
      ];
      dispatch(setUserBuildings(updatedBuildings));
    }
  };

  const UpdateBuildingData = async (data: any) => {
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

    const allUpdatedBuildings = await buildingAPIs.getBuildings(
      user?._id,
      "",
      "",
      ""
    );
    dispatch(setAllBuildingDetails(allUpdatedBuildings.data));
  };

  return (
    <Grid container component="main">
      <Grid item xs={12} md={12} lg={12} sx={{ backgroundColor: "#F9FAFA" }}>
        <PageTitle
          title={
            actionType == "edit"
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
