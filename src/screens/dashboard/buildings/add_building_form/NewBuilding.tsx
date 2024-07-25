"use client";
import moment from 'moment';
import Grid from "@mui/material/Grid";
import React,{ useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector, useStore } from 'react-redux'
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
import BuildingDocumentation from "./BuildingDocumentation";
import CircularProgress from "@mui/material/CircularProgress";
import { addObjektFormSchema } from "@/utils/ValidationSchema";
import { handleUploadDoc, handleUploadMultipleDoc } from "@/utils/uploadToS3";
import { currentUserId, currentUserBuildings } from '@/lib/features/userSlice';


const NewBuilding = () => {

  const router = useRouter();
  const logger = getLogger("new-building");
  const userId = useSelector(currentUserId);
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
    totalArea: 0,
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
        buildingName: values.name,
        documents: docObj,
        address: addressObj,
        createdAt: formateDate,
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
    var itemsProcessed = 0;
    let selectedOtherDocsFiles = values?.otherDocs;
    let selectedFloorplanDocsFiles = values?.floorplanDocs;
    let selectedConstructionFiles = values?.constructionDocs;

    const allFiles = [...selectedOtherDocsFiles, ...selectedFloorplanDocsFiles, ...selectedConstructionFiles];

    if (allFiles.length > 0) {
      allFiles.forEach( async (file, index, array) => {
        let fdFileDocUpload = await handleUploadMultipleDoc(file);
        docObj.push(fdFileDocUpload);
        itemsProcessed++;
  
        if (itemsProcessed == array.length) {
          handleSubmit(values, docObj);
        }
      });      
    } else {
      handleSubmit(values, docObj);      
    }

  }

  const saveBuildingData = async (data :any) => {
    
    const createBuildingResponse = await buildingAPIs.create(data);
    
    if (createBuildingResponse) {

      let userPreviousBuildings: any[] = [];
      let lastId = createBuildingResponse?.data?._id;
      
      if (userBuildings?.length > 0) {
        userPreviousBuildings = [...userBuildings];
        userPreviousBuildings.push(lastId);
      }else{
        userPreviousBuildings = [lastId];
      }

      let buildingQuery = {
        buildings: userPreviousBuildings
      };
      
      const userUpdateStatus = await userAPIs.updateUser(userId, buildingQuery);
    }

    setLoading(false);
  }

  return (
    <Grid container component="main">
      <Grid item xs={12} md={12} lg={12} sx={{ backgroundColor: "#F9FAFA" }}>
        <PageTitle title="Objekt 0014" sx={{ ml: "1.5rem" }} />
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