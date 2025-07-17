"use client";
import Cookies from "js-cookie";
import React, { useState } from "react";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import { Formik, Form, FormikHelpers } from "formik";
import { useRouter } from "next/navigation";
import Snackbar from "@mui/material/Snackbar";
import RegistrationForm from "./RegistrationForm";
import Typography from "@mui/material/Typography";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import userAPI from "@/api/user";
import { RegistrationFormValues } from "./types";
import { DOCUMENT_TYPE, USER_ROLE } from "@/utils/enums";
import PageTitle from "@/components/data-display/label/PageTitle";
import { handleUploadDoc } from "@/utils/uploadToS3";
import BackButton from "@/components/inputs/button/BackButton";
import InfoBanner from "@/components/data-display/InfoBanner";
import EmailVerificationScreen from "@/screens/EmailVerification";
import { registrationValidationSchema } from "@/utils/ValidationSchema";
import { Document } from "@/typings/types";
import emailAPI from "@/api/email";
import { ROUTES } from "@/utils/routes";
import { numOfEmployeesOptions, getRegistrationSteps } from "@/utils/Constants";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>((props, ref) => {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

Alert.displayName = "Alert";

const Registration = (): JSX.Element => {
  const router = useRouter();

  const [newUserId, setNewUserId] = useState("");
  const [activeStep, setActiveStep] = useState(0);
  const [newUserName, setNewUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [isVerificationEmailSent, setIsVerificationEmailSent] =
    useState<boolean>(false);
  const [steps, setSteps] = useState<string[]>(getRegistrationSteps());

  const handleNext = async (
    values: RegistrationFormValues,
    actions: FormikHelpers<RegistrationFormValues>
  ): Promise<void> => {
    const currentSteps = getRegistrationSteps(values.role);
    setSteps(currentSteps);

    if (activeStep === steps.length - 1) {
      const saveData = await uploadAllDocuments(values);
      if (saveData) {
        actions.setSubmitting(false);
      }
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = (): void => {
    if (activeStep === steps.length - 1) {
      setActiveStep(0);
    } else if (activeStep > 0) {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    } else {
      router.push("/login");
    }
  };

  const initialValues: RegistrationFormValues = {
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    role: "",
    country: "Deutschland",
    state: "",
    street: "",
    houseNo: "",
    zip: "",
    city: "",
    password: "",
    telephone: "",
    confirmPassword: "",
    approvalDocument: "",
    registrationNumber: "",
    businessRegistrationDocument: "",
    landRegisterEntryDocument: "",
    personalIdDocument: "",
    businessType: "",
    numOfEmployees: numOfEmployeesOptions[0].value,
    manufacturerExperience: "",
    qualificationDocs: [],
  };

  const onSubmit = async (values: any, docObj: any): Promise<void> => {
    try {
      const addressObj = {
        city: values.city,
        state: values.state,
        street: values.street,
        country: values.country,
        zip: Number(values.zip),
        houseNo: Number(values.houseNo),
      };

      const companyObj = {
        address: addressObj,
        name: values.company,
        phonenumber: Number(values.telephone),
        business: {
          documents: docObj,
          businessType: values.businessType,
          registrationNumber: values.registrationNumber,
        },
      };

      const qualificationDocuments: Document[] = [];
      if (values.qualificationDocs && values.qualificationDocs.length > 0) {
        for (const qualificationDoc of values.qualificationDocs) {
          const file = await handleUploadDoc(qualificationDoc);
          qualificationDocuments.push({
            ...file,
            documentType: DOCUMENT_TYPE.QUALIFICATION_DOCUMENTS,
          });
        }
      }
      const arrangedDataObj = {
        firstName: values.firstName,
        lastName: values.lastName,
        password: values.password,
        email: values.email,
        role: values.role,
        company: companyObj,
        ...(values.role === USER_ROLE.SERVICE_PROVIDER && {
          manufacturerExperience: values.manufacturerExperience,
          numOfEmployees: values.numOfEmployees,
          qualificationDocuments: qualificationDocuments,
        }),
      };

      const res = await userAPI.register(arrangedDataObj);

      if (res.status === 201) {
        setActiveStep(steps.length);
        setNewUserId(res?.data?.id);
        setNewUserEmail(values.email);
        setNewUserName(res?.data?.firstName);

        const sendEmailQuery = { email: values.email };
        const sendStatus = await emailAPI.sendVerificationEmail(sendEmailQuery);

        if (sendStatus.status === 201) {
          setIsVerificationEmailSent(true);
        }
      }
    } catch (error: any) {
      if (
        error.response &&
        error.response?.data?.message === "User already exists"
      ) {
        setOpenSnackbar(true);
        setActiveStep(0);
      }
    }
  };

  const uploadAllDocuments = async (
    values: RegistrationFormValues
  ): Promise<boolean> => {
    try {
      const {
        approvalDocumentFile,
        landRegisterEntryDocumentFile,
        businessRegistrationDocumentFile,
        personalIdDocumentFile,
        qualificationDocs,
      } = values;

      if (
        !approvalDocumentFile &&
        !landRegisterEntryDocumentFile &&
        !businessRegistrationDocumentFile &&
        !personalIdDocumentFile &&
        !qualificationDocs
      ) {
        await onSubmit(values, []);
        return true;
      }

      const docObj: File[] = [];

      if (businessRegistrationDocumentFile) {
        const file = await handleUploadDoc(businessRegistrationDocumentFile);
        docObj.push({
          ...file,
          documentType: DOCUMENT_TYPE.BUSINESS_REGISTRATION,
        });
      }

      if (landRegisterEntryDocumentFile) {
        const file = await handleUploadDoc(landRegisterEntryDocumentFile);
        docObj.push({
          ...file,
          documentType: DOCUMENT_TYPE.LAND_REGISTER_ENTRY,
        });
      }
      if (approvalDocumentFile) {
        const file = await handleUploadDoc(approvalDocumentFile);
        docObj.push({ ...file, documentType: DOCUMENT_TYPE.APPROVAL_DOC });
      }
      if (personalIdDocumentFile) {
        const file = await handleUploadDoc(personalIdDocumentFile);
        docObj.push({ ...file, documentType: DOCUMENT_TYPE.PERSONAL_ID });
      }

      await onSubmit(values, docObj);
      return true;
    } catch (error) {
      throw error;
    }
  };

  const handleSnackbarClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ): void => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  const postVerificationAction = (): void => {
    Cookies.set("isVerified", "true");
  };

  return (
    <Grid container component="main" sx={styles.mainContainer}>
      <Grid item xs={false} md={4} lg={4} sx={styles.infoBannerGrid}>
        <InfoBanner
          title="Where skills are developed"
          subtitle="Gesetzliche Anlagenprüfung"
          copyright={`©${new Date().getFullYear()} GAP GmbH`}
        />
      </Grid>
      <Grid item xs={12} md={8} lg={8} sx={styles.formGrid}>
        <BackButton
          onBack={handleBack}
          sx={{
            visibility: activeStep <= steps.length - 1 ? "visible" : "hidden",
          }}
        />
        <PageTitle title="Registrierung" />
        <Formik
          initialValues={initialValues}
          validationSchema={registrationValidationSchema[activeStep]}
          onSubmit={handleNext}
          enableReinitialize
        >
          {({ handleSubmit }) => (
            <Form>
              <Grid sx={styles.form}>
                {activeStep < steps.length ? (
                  <RegistrationForm
                    activeStep={activeStep}
                    steps={steps}
                    handleBack={handleBack}
                    handleNext={handleSubmit}
                    setActiveStep={setActiveStep}
                  />
                ) : (
                  isVerificationEmailSent && (
                    <EmailVerificationScreen
                      sendMail={false}
                      newUserId={newUserId}
                      newUserName={newUserName}
                      newUserEmail={newUserEmail}
                      postVerificationAction={postVerificationAction}
                    />
                  )
                )}
              </Grid>
            </Form>
          )}
        </Formik>

        <Typography sx={styles.helpText}>
          Hilfe?{" "}
          <Link href={ROUTES.CONTACT_US} color="#1E3137" fontWeight="bold">
            Kontakt Support
          </Link>
        </Typography>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity="error"
            sx={{ width: "100%" }}
          >
            Die E-Mail-Adresse des Benutzers existiert bereits. Bitte loggen Sie
            sich ein.
          </Alert>
        </Snackbar>
      </Grid>
    </Grid>
  );
};

export default Registration;

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
