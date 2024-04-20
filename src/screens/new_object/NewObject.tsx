"use client";
import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import { MdArrowBackIos } from "react-icons/md";
import { useRouter } from "next/navigation";
import BackHeader from "@/components/common/BackHeader";
import SucessPage from "@/components/common/SuccessPage";
import { Formik, Form } from "formik";
import AddObjektForm from "./AddObjektForm";
import { registrationValidationSchema } from "@/utils/ValidationSchema";
import { styles } from "../registration_real_estate/RegistrationRealState";
import {
  ValidateFormFunction,
  SetTouchedFunction,
  SubmitFormFunction,
} from "../registration_real_estate/types";
import { ActiveStepItem, AddObjektFormValues } from "./types";
import ObjektInformation from "./ObjektInformation";
import ObjektAddress from "./ObjektAddress";
import ObjektDocumentation from "./ObjektDocumentation";
import ObjektSummary from "./ObjektSummary";
import SuccessPage from "@/components/common/SuccessPage";

const NewObject = () => {
  const router = useRouter();
const steps: ActiveStepItem[] = [
      {
        id: 0,
        stepName: "Objektinformation",
        component: <ObjektInformation />,
      },
      { id: 1, stepName: "Objektanschrift", component: <ObjektAddress /> },
      {
        id: 2,
        stepName: "Objektdokumentation",
        component: <ObjektDocumentation />,
      },
      {
        id: 3,
        stepName: "Übersicht Objektdaten",
        component: <ObjektSummary />,
        },
    ];

  const [activeStep, setActiveStep] = React.useState<ActiveStepItem>(steps[0]);

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

  const initialValues: AddObjektFormValues = {
    buildingName: "",
    totalArea: "",
    buildingType: "",
    objektTag: "",
    contactPerson: "",
    address: "Deutschland",
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
        <BackHeader
          onBackClick={handleBack}
          title="Objekt 0014"
          sx={{ button: { ml: "1.5rem", mt: 0 }, header: { ml: "1.5rem" } }}
        />
        <Formik
          initialValues={initialValues}
          validationSchema={registrationValidationSchema}
          onSubmit={async (values, { resetForm }) => {
            await onSubmit(values);
            resetForm();
          }}
          enableReinitialize
        >
          {({ validateForm, setTouched, submitForm }) => (
            <Form>
              <Grid sx={styles.form}>
                  <AddObjektForm
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

export default NewObject;
