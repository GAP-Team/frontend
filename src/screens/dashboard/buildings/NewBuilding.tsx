"use client";
import  { useState } from "react";
import Grid from "@mui/material/Grid";
import { useRouter } from "next/navigation";
import { Formik, Form } from "formik";
import AddBuildingForm from "./AddBuildingForm";
import { addObjektFormSchema } from "@/utils/ValidationSchema";
import { styles } from "../../registration_real_estate/RegistrationRealState";
import {
  ValidateFormFunction,
  SetTouchedFunction,
  SubmitFormFunction,
} from "../../registration_real_estate/types";
import { ActiveStepItem, AddBuildingFormValues } from "./types";
import BuildingInformation from "./BuildingInformation";
import BuildingAddress from "./BuildingAddress";
import BuildingDocumentation from "./BuildingDocumentation";
import BuildingSummary from "./BuildingSummary";
import { useFormikContext } from "formik";
import BackButton from "@/components/button/BackButton";
import PageTitle from "@/components/label/PageTitle";

const NewBuilding = () => {
    const router = useRouter();
    const formik = useFormikContext();
const steps: ActiveStepItem[] = [
      {
        id: 0,
        stepName: "Objektinformation",
        component: <BuildingInformation formik={formik}/>,
      },
      { id: 1, stepName: "Objektanschrift", component: <BuildingAddress formik={formik} /> },
      {
        id: 2,
        stepName: "Objektdokumentation",
        component: <BuildingDocumentation />,
      },
      {
        id: 3,
        stepName: "Übersicht Objektdaten",
        component: <BuildingSummary />,
        },
    ];

  const [activeStep, setActiveStep] = useState<ActiveStepItem>(steps[0]);

  const handleNext = async (
    validateForm: ValidateFormFunction,
    setTouched: SetTouchedFunction,
    submitForm: SubmitFormFunction
  ): Promise<void> => {
    const nextStepId = activeStep.id + 1;
    if (nextStepId < steps.length) {
      setActiveStep(steps[nextStepId]);
    } else {
      // Set an ID that exceeds the steps array to indicate completion
      setActiveStep({ ...activeStep, id: steps.length });
    }
  };

  const handleBack = () => {
    if (activeStep.id > 0) {
      setActiveStep(steps[activeStep.id - 1]);
    } else {
      // If active step is 0, then push to login
      router.push("/login");
    }
  };

  const initialValues: AddBuildingFormValues = {
    buildingName: "",
    totalArea: "",
    buildingType: "",
    objektTag: "",
    contactPerson: "",
    address: "",
    plz: "",
    city: "",
    state: "",
    serverLink: "",
  };

  const onSubmit = (values: any) => {
    try {
      alert(JSON.stringify(values, null, 2));
    } catch (error: any) {
      console.log(
        "Unable to Add Objekt, post reqeust failed",
        error.name,
        error.message
      );
    }
  };

  console.log(activeStep)
  return (
    <Grid container component="main">
      <Grid item xs={12} md={12} lg={12} sx={{ backgroundColor: "#F9FAFA" }}>
        <BackButton onBack={handleBack} sx={{ml: "1.5rem", mt: 0}} />
        <PageTitle title="Objekt 0014" sx={{ ml: "1.5rem"}}/>
        <Formik
          initialValues={initialValues}
          validationSchema={addObjektFormSchema}
          onSubmit={async (values, { resetForm }) => {
            await onSubmit(values);
            resetForm();
          }}
          enableReinitialize
        >
          {({ validateForm, setTouched, submitForm }) => (
            <Form>
              <Grid sx={styles.form}>
                  <AddBuildingForm
                    activeStep={activeStep}
                    steps={steps}
                    handleBack={handleBack}
                    handleNext={() =>
                      handleNext(validateForm, setTouched, submitForm)
                    }
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