"use client";
import moment from 'moment';
import Grid from "@mui/material/Grid";
import React,{ useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, FormikHelpers, useFormik, FormikErrors } from "formik";  

import userAPIs from "@/api/user";
import buildingAPIs from "@/api/building";
import { ActiveStepItem } from "../../types";
import { getLogger } from "@/utils/Logger";
import AddBuildingForm from "./AddBuildingForm";
import { AddBuildingFormValues } from "./types";
import BuildingAddress from "./BuildingAddress";
import BuildingSummary from "./BuildingSummary";
import { SubmitFormFunction } from "@/typings/types";
import PageTitle from "@/components/label/PageTitle";
import BuildingInformation from "./BuildingInformation";
import BackButton from "@/components/button/BackButton";
import { setUserBuildings } from '@/lib/features/userSlice';
import BuildingDocumentation from "./BuildingDocumentation";
import CircularProgress from "@mui/material/CircularProgress";
import { addObjektFormSchema } from "@/utils/ValidationSchema";
import { handleUploadDoc, handleUploadMultipleDoc } from "@/utils/uploadToS3";
import { currentUser, currentUserBuildings } from '@/lib/features/userSlice';


const NewBuilding = () => {

  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector(currentUser);
  const logger = getLogger("new-building");
  const userBuildings = useSelector(currentUserBuildings);

  const steps: ActiveStepItem[] = [
    {
      id: 0,
      stepName: "Objektinformation",
      component: BuildingInformation,
    },
    { 
      id: 1, 
      stepName: "Objektanschrift", 
      component: BuildingAddress
    },
    {
      id: 2,
      stepName: "Objektdokumentation",
      component: BuildingDocumentation,
    },
    {
      id: 3,
      stepName: "Übersicht Objektdaten",
      component: BuildingSummary,
    },
  ];

  const [loading, setLoading] = useState<boolean>(false);
  const [activeStep, setActiveStep] = useState<ActiveStepItem>(steps[0]);

  const [ allOtherItemsProcessed, setAllOtherItemsProcessed ] = useState<boolean>(false);
  const [ allFloorplanItemsProcessed, setAllFloorplanItemsProcessed ] = useState<boolean>(false);
  const [ allConstructionItemsProcessed, setAllConstructionItemsProcessed ] = useState<boolean>(false);

  const handleNext = async (
    validateForm: FormikHelpers<AddBuildingFormValues>["validateForm"],
    setTouched: FormikHelpers<AddBuildingFormValues>["setTouched"],
    submitForm: SubmitFormFunction,
    // resetForm: FormikHelpers<AddBuildingFormValues>["resetForm"],
    values: AddBuildingFormValues
  ): Promise<void> => {    

    const stepFieldsMap: { [key: number]: string[] } = {
      0: ["name", "totalArea", "buildingType", "buildingAbbreviation", "contactPerson"],
      1: ["zip", "street", "country", "houseNumber", "city", "state"],
      2: ["serverLink", "constructionDocs", "floorplanDocs", "otherDocs"],
    };

    const currentStepFields = stepFieldsMap[activeStep.id];

    setTouched(currentStepFields?.reduce((acc, field) => ({ ...acc, [field]: true }), {}));

    const errors = await validateForm();
    const hasErrors = currentStepFields?.some(field => (errors as any)[field]);

    if (!hasErrors) {
      const nextStepId = activeStep.id + 1;
      if (nextStepId < steps.length) { 
        setActiveStep(steps[nextStepId]);
      } else {
        //post data to API
        await uploadAllDocuments(values);
        // await handleSubmit(values);
        submitForm();
        
        setActiveStep({ ...activeStep, id: steps.length });
      }
    }

  };

  const handleBack = () => {
    if (activeStep.id > 0) {
      setActiveStep(steps[activeStep.id - 1]);
    } else {
      // If active step is 0, then push to login
      router.push("/dashboard");
    }
  };
  
  const initialValues: AddBuildingFormValues = {
    name: "",
    totalArea: "",
    buildingType: "",
    buildingAbbreviation: "",
    contactPerson: [],

    zip: "",
    city: "",
    state: "",
    street: "",
    houseNumber: "",
    country: "Deutschland",
    documentChoice: "Jetzt hochladen Empfohlen",
    constructionDocs: [],
    floorplanDocs: [],
    otherDocs: [],
    serverLink: "",
  };
  
  const handleSubmit = async (values: any, docObj: any[]) => {

    try {
      
      let addressObj = {
        zip: values.zip,
        city: values.city,
        state: values.state,
        street: values.street,
        country: values.country,
        houseNumber: values.houseNumber,
      }
      
      let currentDate = new Date();
      const formateDate = moment(currentDate).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');

      let arrangedDataObj= {
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
      }
      
      saveBuildingData(arrangedDataObj);

    } catch (error: any) {
      logger.error("Unable to create a new building, post reqeust failed "+error.name, error.message);
    }

  }

  const uploadAllDocuments = async (values: any) => {

    setLoading(true);

    let docObj: any[] = [];
    var otherItemsProcessed = 0;
    var floorplanItemsProcessed = 0;
    var constructionItemsProcessed = 0;
    let selectedOtherDocsFiles = values?.otherDocs;
    let selectedFloorplanDocsFiles = values?.floorplanDocs;
    let selectedConstructionFiles = values?.constructionDocs;

    const allFiles = [...selectedOtherDocsFiles, ...selectedFloorplanDocsFiles, ...selectedConstructionFiles];
    

    if (selectedOtherDocsFiles.length > 0) {
      selectedOtherDocsFiles.forEach( async (file: any, index: any, array: string | any[]) => {

        let fdFileDocUpload = await handleUploadMultipleDoc(file);
        let newDocObj = fdFileDocUpload;
        newDocObj.documentType = "SONSTIGE";

        docObj.push(newDocObj);
        otherItemsProcessed++;
  
        if (otherItemsProcessed == array.length) {
          handleUpdateDocObject(allFiles.length, docObj, values);
        }
      });      
    }
    if (selectedFloorplanDocsFiles.length > 0) {
      selectedFloorplanDocsFiles.forEach( async (file: any, index: any, array: string | any[]) => {

        let fdFileDocUpload = await handleUploadMultipleDoc(file);
        let newDocObj = fdFileDocUpload;
        newDocObj.documentType = "GRUNDRISSE";

        docObj.push(newDocObj);
        floorplanItemsProcessed++;
  
        if (floorplanItemsProcessed == array.length) {
          handleUpdateDocObject(allFiles.length, docObj, values);
        }
      });
    }
    if (selectedConstructionFiles.length > 0) {
      selectedConstructionFiles.forEach( async (file: any, index: any, array: string | any[]) => {

        let fdFileDocUpload = await handleUploadMultipleDoc(file);
        let newDocObj = fdFileDocUpload;
        newDocObj.documentType = "BAUUNTERLAGEN";

        docObj.push(newDocObj);
        constructionItemsProcessed++;
  
        if (constructionItemsProcessed == array.length) {
          handleUpdateDocObject(allFiles.length, docObj, values);
        }
      });      
    }
  }

  const handleUpdateDocObject = (totalFiles: number, docObj: any, values: any) => {
    let docDataArray = [...docObj];

    if (totalFiles === docDataArray.length) {
      handleSubmit(values, docDataArray);
    }
  }

  const saveBuildingData = async (data :any) => {
    
    const createBuildingResponse = await buildingAPIs.create(data);
    
    if (createBuildingResponse?.data?.buildingId != "") {
      let oldBuildings = [...userBuildings];
      oldBuildings.push(createBuildingResponse?.data?.buildingId);
      dispatch(setUserBuildings(oldBuildings));
    }

    setLoading(false);
  }

  return (
    <Grid container component="main">
      <Grid item xs={12} md={12} lg={12} sx={{ backgroundColor: "#F9FAFA" }}>
        <PageTitle title="Neues Objekt erstellen" sx={{ ml: "1.5rem" }} />
        <Formik
          initialValues={initialValues}
          validationSchema={addObjektFormSchema}
          onSubmit={ async (values, { resetForm }) => {}}
          enableReinitialize
        >
          {({ validateForm, setTouched, submitForm, values}) => (
            <Form>
              <Grid sx={styles.form}>
                <AddBuildingForm
                  steps={steps}
                  activeStep={activeStep}
                  handleBack={handleBack}
                  handleNext={()=>
                    handleNext(validateForm, setTouched, submitForm, values)
                  }
                  setActiveStep={setActiveStep}
                  loading={loading}
                />
              </Grid>
            </Form>
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
}