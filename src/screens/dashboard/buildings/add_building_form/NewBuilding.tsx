"use client";
import React,{ useState } from "react";
import Grid from "@mui/material/Grid";
import { useRouter } from "next/navigation";
import { Formik, Form, FormikHelpers, useFormik, FormikErrors } from "formik";
import AddBuildingForm from "./AddBuildingForm";
import { addObjektFormSchema } from "@/utils/ValidationSchema";
import { AddBuildingFormValues } from "./types";
import { ActiveStepItem } from "../../types";
import BuildingInformation from "./BuildingInformation";
import BuildingAddress from "./BuildingAddress";
import BuildingDocumentation from "./BuildingDocumentation";
import BuildingSummary from "./BuildingSummary";
import BackButton from "@/components/button/BackButton";
import PageTitle from "@/components/label/PageTitle";


const NewBuilding = () => {
  const router = useRouter();
  const steps: ActiveStepItem[] = [
    {
      id: 0,
      stepName: "Objektinformation",
      component: BuildingInformation,
    },
    { id: 1, stepName: "Objektanschrift", component: BuildingAddress },
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
    resetForm: FormikHelpers<AddBuildingFormValues>["resetForm"],
    values: AddBuildingFormValues
  ): Promise<void> => {
    const stepFieldsMap: { [key: number]: string[] } = {
      0: ["buildingName", "totalArea", "buildingType", "objektTag", "contactPerson"],
      1: ["address", "plz", "city", "state"],
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
        alert(JSON.stringify(values, null, 2));
        await resetForm();
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
    buildingName: "",
    totalArea: 0,
    buildingType: "",
    objektTag: "",
    contactPerson: [],
    address: "",
    plz: "",
    city: "",
    state: "",
    constructionDocs: [],
    floorplanDocs: [],
    otherDocs: [],
    serverLink: "",
  };
  


  return (
    <Grid container component="main">
      <Grid item xs={12} md={12} lg={12} sx={{ backgroundColor: "#F9FAFA" }}>
        <BackButton onBack={handleBack} sx={{ ml: "1.5rem", mt: 0 }} />
        <PageTitle title="Objekt 0014" sx={{ ml: "1.5rem" }} />
        <Formik
          initialValues={initialValues}
          validationSchema={addObjektFormSchema}
          onSubmit={()=>{}}
          enableReinitialize
        >
          {({ validateForm, setTouched,resetForm, values}) => (
              <Form>
                <Grid sx={styles.form}>
                  <AddBuildingForm
                    activeStep={activeStep}
                    steps={steps}
                    handleBack={handleBack}
                    handleNext={()=>
                      handleNext(validateForm, setTouched,resetForm, values)
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