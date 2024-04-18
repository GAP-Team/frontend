"use client";
import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import { MdArrowBackIos } from "react-icons/md";
import { useRouter } from "next/navigation";
import RegistrationForm from "./RegistrationForm";
import SucessPage from "./SucessPage";
import InfoBanner from "@/components/common/InfoBanner";
import { Formik, Form } from "formik";
import { registrationValidationSchema } from "@/utils/ValidationSchema";
interface FormErrors {
  [key: string]: string;
}

type ValidateFormFunction = () => Promise<FormErrors>;
type SetTouchedFunction = (touched: {[key: string]: boolean}) => void;
type SubmitFormFunction = () => void;

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
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();


  const handleNext = async (validateForm: ValidateFormFunction,
    setTouched: SetTouchedFunction,
    submitForm: SubmitFormFunction): Promise<void> => {
    // Get the fields to validate for the current step
    const fieldsPerStep: {[key: number]: string[]} = {
      0: ['firstname', 'lastname', 'email', 'telephone', 'company'],
      1: ['state', 'street', 'hausnr', 'plz', 'city'],
      2: ['registrationnum'], // Adjust fields according to what you need for each step
    };
  
    const fieldsToValidate = fieldsPerStep[activeStep];

    // Validate only the fields for the current step
    // First, mark fields as touched to ensure errors are shown
    const touchedUpdates = fieldsToValidate?.reduce((acc, field) => ({
      ...acc,
      [field]: true,
    }), {});
    setTouched(
      touchedUpdates
      );
      
    const formErrors = await validateForm();
    // Check if all these fields are valid
    const isCurrentStepValid = !fieldsToValidate || fieldsToValidate?.every(
      (field) => !formErrors[field]
    );

    if (isCurrentStepValid) {
      if (activeStep === 3 ) {
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

  const initialValues = {
      firstname: "",
      lastname: "",
      email: "",
      telephone: "",
      company: "",
      country:"Deutschland",
      state: "",
      street: "",
      hausnr: "",
      plz: "",
      city: "",
      registrationnum:"",
  }
    
    const onSubmit= (values:any) => {
      try {
        alert(JSON.stringify(values, null, 2));
      } catch (error: any) {
        console.log("Unable to login user, post reqeust failed",error.name, error.message);
      }
    }
    

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <Grid
        item
        xs={false}
        md={4}
        lg={4}
        sx={{
          backgroundImage: `url(/registration-bg.png)`,
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
        }}
      >
        {/* Make this Box a flex container to use Flexbox properties */}
        <InfoBanner
          title="Where skills are developed"
          subtitle="Gesetzliche Anlagenprüfung"
          copyright="©2023 GAP GmbH"
        />
      </Grid>
      <Grid item xs={12} md={8} lg={8} sx={{ backgroundColor: "#F9FAFA" }}>
        <Button
          variant="text"
          sx={{
            display: "flex",
            fontSize: "0.875rem",
            fontWeight: "600",
            alignItems: "center",
            marginLeft: "3.75rem",
            color: "#8D999C",
            marginTop: "2.5rem",
          }}
          onClick={handleBack}
        >
          <MdArrowBackIos />
          Zurück
        </Button>
        <Typography
          variant="h3"
          sx={{
            fontSize: "2rem",
            lineHeight: "2.5rem",
            fontWeight: "700",
            marginLeft: "3.75rem",
            my: "2rem",
          }}
        >
          Registrierung
        </Typography>
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
              <Grid
                sx={{
                  // my: '2rem',
                  marginLeft: "3.75rem",
                  marginRight: "3.5rem",
                  display: "flex",
                  flexDirection: "row",
                  backgroundColor: "white",
                  height: "37.375rem;",
                  padding: "1.5rem",
                  borderRadius: "0.5rem",
                  boxShadow: "0px 8px 24px 0px rgba(30, 49, 55, 0.08)",
                }}
              >
                {activeStep <= 3 ? (
                  <RegistrationForm
                    activeStep={activeStep}
                    steps={steps}
                    handleBack={handleBack}
                    handleNext={() => handleNext(validateForm, setTouched,submitForm)}
                  />
                ) : (
                  <SucessPage />
                )}
              </Grid>
            </Form>
          )}
          </Formik>
        <Typography
          sx={{
            color: "#475A60",
            fontSize: "1rem",
            marginTop: "3rem",
            marginLeft: "3.75rem",
          }}
          >
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
