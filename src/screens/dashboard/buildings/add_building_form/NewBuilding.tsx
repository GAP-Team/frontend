"use client";
import Grid from "@mui/material/Grid";
import React,{ useState } from "react";
import { useRouter } from "next/navigation";
import { Formik, Form, FormikHelpers, useFormik, FormikErrors } from "formik";  

import buildingAPIs from "@/api/building";
import { ActiveStepItem } from "../../types";
import AddBuildingForm from "./AddBuildingForm";
import { AddBuildingFormValues } from "./types";
import BuildingAddress from "./BuildingAddress";
import BuildingSummary from "./BuildingSummary";
import { SubmitFormFunction } from "@/typings/types";
import PageTitle from "@/components/label/PageTitle";
import BuildingInformation from "./BuildingInformation";
import BackButton from "@/components/button/BackButton";
import BuildingDocumentation from "./BuildingDocumentation";
import { addObjektFormSchema } from "@/utils/ValidationSchema";
import { handleUploadDoc, handleUploadMultipleDoc } from "@/utils/uploadToS3";


const NewBuilding = () => {

  const router = useRouter();

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
        await handleSubmit(values);
        submitForm();
        // console.log("From Next: ---------> ", values);
        // await handleSubmit(values);
        // alert(JSON.stringify(values, null, 2));
        
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

    constructionDocs: [],
    floorplanDocs: [],
    otherDocs: [],
    serverLink: "",
  };
  
  const handleSubmit = async (values: any) => {
    try {
      
      let docObj: any[] = [];
  
      let selectedOtherDocsFiles = values?.otherDocs;
      let selectedFloorplanDocsFiles = values?.floorplanDocs;
      let selectedConstructionFiles = values?.constructionDocs;
  
      if (selectedOtherDocsFiles.length > 0) {
        selectedOtherDocsFiles.forEach( async (odFiles: any) => {
          let odFileDocUpload = await handleUploadMultipleDoc(odFiles);
          
          docObj.push(odFileDocUpload);
        });
      }
      if (selectedFloorplanDocsFiles.length > 0) {
        selectedFloorplanDocsFiles.forEach( async (fdFiles: any) => {
          let fdFileDocUpload = await handleUploadMultipleDoc(fdFiles);
          
          docObj.push(fdFileDocUpload);
        });
      }
      if (selectedConstructionFiles.length > 0) {
        selectedConstructionFiles.forEach( async (cdFiles: any) => {
          let cdFileDocUpload = await handleUploadMultipleDoc(cdFiles);
          
          docObj.push(cdFileDocUpload);
  
        });
      }
  
      let addressObj = {
        zip: values.zip,
        city: values.city,
        state: values.state,
        street: values.street,
        country: values.country,
        houseNumber: values.houseNumber,
      }
      
      let currentDate = new Date();
      const isoString = currentDate.toISOString();
      const formateDate = isoString.slice(0, 11) + '00:00:00.000Z';
  
      delete values.zip;
      delete values.city;
      delete values.state;
      delete values.street;
      delete values.country;
      delete values.otherDocs;
      delete values.houseNumber;
      delete values.floorplanDocs;
      delete values.constructionDocs;
  
      values.documents = docObj;
      values.address = addressObj;
      values.createdAt = formateDate;
      values.documentUploadType = "app";
  
      const createBuildingResponse = await buildingAPIs.create(values);

    } catch (error: any) {
      console.log(
        "Unable to create a new building, post reqeust failed",
        error.name,
        error.message
      );
    }

  }

  return (
    <Grid container component="main">
      <Grid item xs={12} md={12} lg={12} sx={{ backgroundColor: "#F9FAFA" }}>
        <BackButton onBack={handleBack} sx={{ ml: "1.5rem", mt: 0 }} />
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