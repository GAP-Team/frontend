"use client";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import { useRouter } from "next/navigation";
import RegistrationForm from "./RegistrationForm";
import SuccessPage from "@/components/common/SuccessPage";
import InfoBanner from "@/components/common/InfoBanner";
import { Formik, Form } from "formik";
import { registrationValidationSchema } from "@/utils/ValidationSchema";
import {
  ValidateFormFunction,
  SetTouchedFunction,
  SubmitFormFunction,
} from "../../typings/types";
import { RegistrationFormValues } from "./types";
import BackButton from "@/components/button/BackButton";
import PageTitle from "@/components/label/PageTitle";

function getSteps() {
  return [
    "Grundinformation",
    "Adresse der Firma",
    "Gewerbeanmeldung",
    "Zusammenfassung",
  ];
}

const RegistrationRealState = () => {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();

  const handleNext = async (
    validateForm: ValidateFormFunction,
    setTouched: SetTouchedFunction,
    submitForm: SubmitFormFunction
  ): Promise<void> => {
    // Get the fields to validate for the current step
    const fieldsPerStep: { [key: number]: string[] } = {
      0: ["firstname", "lastname", "email", "password", "confirmPassword", "telephone", "company"],
      1: ["state", "street", "hausnr", "plz", "city"],
      2: ["registrationnum", "bsndoc", "landdoc", "approvdoc"], // Adjust fields according to what you need for each step
    };

    const fieldsToValidate = fieldsPerStep[activeStep];

    // Validate only the fields for the current step
    // First, mark fields as touched to ensure errors are shown
    const touchedUpdates = fieldsToValidate?.reduce(
      (acc, field) => ({
        ...acc,
        [field]: true,
      }),
      {}
    );
    setTouched(touchedUpdates);

    const formErrors = await validateForm();
    // Check if all these fields are valid
    const isCurrentStepValid =
      !fieldsToValidate ||
      fieldsToValidate?.every((field) => !formErrors[field]);

    if (isCurrentStepValid) {
      if (activeStep === 3) {
        // If this is the last step and it's valid, submit the form
        submitForm();
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      } else {
        // Not the last step, just move to the next step
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    }
  };

  const handleBack = () => {
    if (activeStep > 3) {
      //If user has registered then redirect to new registration
      setActiveStep(0);
    } // Check if the active step is already 0 before updating the state
    else if (activeStep > 0) {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    } else {
      // If active step is 0, then push to login
      router.push("/login");
    }
  };

  const initialValues: RegistrationFormValues = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
    company: "",
    telephone: "",
    country: "Deutschland",
    state: "",
    street: "",
    hausnr: "",
    plz: "",
    city: "",
    bsndoc: "",
    landdoc: "",
    approvdoc: "",
    registrationnum: "",
  };

  const onSubmit = (values: any) => {
    try {
    } catch (error: any) {
      console.log(
        "Unable to login user, post reqeust failed",
        error.name,
        error.message
      );
    }
  };

  return (
    <Grid container component="main" sx={styles.mainContainer}>
      <Grid item xs={false} md={4} lg={4} sx={styles.infoBannerGrid}>
        {/* Make this Box a flex container to use Flexbox properties */}
        <InfoBanner
          title="Where skills are developed"
          subtitle="Gesetzliche Anlagenprüfung"
          copyright="©2023 GAP GmbH"
        />
      </Grid>
      <Grid item xs={12} md={8} lg={8} sx={styles.formGrid}>
        <BackButton
          onBack={handleBack}
          sx={{ visibility: activeStep <= 3 ? "visible" : "hidden" }}
        />
        <PageTitle title="Registrierung" />
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
                {activeStep <= 3 ? (
                  <RegistrationForm
                    activeStep={activeStep}
                    steps={steps}
                    handleBack={handleBack}
                    handleNext={() =>
                      handleNext(validateForm, setTouched, submitForm)
                    }
                    setActiveStep={setActiveStep}
                  />
                ) : (
                  <SuccessPage
                    title="Registrierung abgeschlossen!"
                    description="You have been added to the project team and permitted to receive any project news and updates."
                    buttonLabel="Go to Dashboard"
                    redirectUrl="/dashboard"
                  />
                )}
              </Grid>
            </Form>
          )}
        </Formik>
        <Typography sx={styles.helpText}>
          Hilfe?{" "}
          <Link href="#" color="#1E3137" fontWeight="bold">
            Kontakt Support
          </Link>
        </Typography>
      </Grid>
    </Grid>
  );
};

export default RegistrationRealState;

// css design
export const styles = {
  mainContainer: { height: "100vh" },
  infoBannerGrid: {
    backgroundImage: `url(/images/registration-bg.png)`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: {
      xs: "none",
      sm: "none",
      md: "block",
      lg: "block",
      xl: "block",
    },
    height: "100%",
  },
  formGrid: {
    backgroundColor: "#F9FAFA",
  },
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
  helpText: {
    color: "#475A60",
    fontSize: "1rem",
    marginTop: "3rem",
    marginLeft: "3.75rem",
  },
};
