"use client";
import bcrypt from "bcryptjs";
import Cookies from "js-cookie";
import React, { useState } from "react";
import moment from "moment-timezone";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import { Formik, Form } from "formik";
import { useRouter } from "next/navigation";
import Snackbar from "@mui/material/Snackbar";
import RegistrationForm from "./RegistrationForm";
import Typography from "@mui/material/Typography";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import {
  SetTouchedFunction,
  SubmitFormFunction,
  ValidateFormFunction,
} from "../../typings/types";
import userAPIs from "@/api/user";
import { RegistrationFormValues } from "./types";

import {
  sendVerificationEmail,
  getNewVerificationCode,
} from "@/utils/helperEmail";
import PageTitle from "@/components/label/PageTitle";
import { handleUploadDoc } from "@/utils/uploadToS3";
import BackButton from "@/components/button/BackButton";
import InfoBanner from "@/components/common/InfoBanner";
import EmailTemplate from "@/components/EmailTemplate/Template";
import { registrationValidationSchema } from "@/utils/ValidationSchema";
import EmailVerification from "../../components/email/EmailVerification";

function getSteps(): string[] {
  return [
    "Grundinformation",
    "Adresse der Firma",
    "Gewerbeanmeldung",
    "Zusammenfassung",
  ];
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>((props, ref) => {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

Alert.displayName = "Alert";



const RegistrationRealState = (): JSX.Element => {
  const steps = getSteps();
  const router = useRouter();

  const [newUserId, setNewUserId] = useState("");
  const [activeStep, setActiveStep] = useState(0);
  const [newUserName, setNewUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [isVerificationEmailSent, setIsVerificationEmailSent] =
    useState<boolean>(false);

  const handleNext = async (
    validateForm: ValidateFormFunction,
    setTouched: SetTouchedFunction,
    submitForm: SubmitFormFunction
  ): Promise<void> => {
    const fieldsPerStep: { [key: number]: string[] } = {
      0: [
        "firstName",
        "lastName",
        "email",
        "password",
        "confirmPassword",
        "telephone",
        "company",
        "role",
      ],
      1: ["state", "street", "houseNo", "zip", "city"],
      2: [
        "registrationNumber",
        "business_registration_doc",
        "land_register_entry_document",
        "approval_document",
      ],
    };

    const fieldsToValidate = fieldsPerStep[activeStep];

    const touchedUpdates = fieldsToValidate?.reduce(
      (acc, field) => ({
        ...acc,
        [field]: true,
      }),
      {}
    );
    setTouched(touchedUpdates);

    const formErrors = await validateForm();

    const isCurrentStepValid =
      !fieldsToValidate ||
      fieldsToValidate?.every((field) => !formErrors[field]);

    if (isCurrentStepValid) {
      if (activeStep === steps.length - 1) {
        submitForm();
      } else {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    }
  };

  const handleBack = (): void => {
    if (activeStep > 3) {
      //If user has registered then redirect to new registration
      setActiveStep(0);
    } // Check if the active step is already 0 before updating the state
    else if (activeStep > 0) {
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
    businessType: "",
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
        numberOfEmployees: null,
        phonenumber: Number(values.telephone),
        business: {
          documents: docObj,
          businessType: values.businessType,
          registrationNumber: values.registrationNumber,
        },
      };

      const currentDate = new Date().toLocaleString("de-DE", {
        timeZone: "Europe/Berlin",
        hour12: false,
      });

      const formateDate = moment(currentDate, "DD.MM.YYYY, HH:mm:ss").format(
        "YYYY-MM-DDTHH:mm:ss.SSS[Z]"
      );

      const hashedPassword = await bcrypt.hash(values.password, 10);

      const arrangedDataObj = {
        firstName: values.firstName,
        lastName: values.lastName,
        password: hashedPassword,
        email: values.email,
        role: values.role,
        company: companyObj,
        manufacturerExperience: null,
        registeredAt: formateDate,
        updatedAt: null,
      };

      const res = await userAPIs.register(arrangedDataObj);

      // If registration is successful, move to email verification step
      if (res.status === 201) {
        setActiveStep(steps.length);
        setNewUserId(res?.data?._id);
        setNewUserEmail(values.email);
        setNewUserName(res?.data?.firstName);
        const code = getNewVerificationCode();
        const element = (
          <EmailTemplate name={newUserName} verificationCode={code} />
        );
        const sendStatus = await sendVerificationEmail(
          values.firstName,
          values.email,
          res?.data?._id,
          element,
          code
        );

        if (sendStatus.status === 201) {
          setIsVerificationEmailSent(true);
        }
      }
    } catch (error: any) {
      if (
        error.response &&
        error.response?.data?.error === "User already exists"
      ) {
        setOpenSnackbar(true);
        setActiveStep(0);
      } else {
        console.log(
          "Unable to register user, post request failed",
          error.name,
          error.message
        );
      }
    }
  };

  const uploadAllDocuments = async (
    values: any,
    type: string
  ): Promise<void> => {
    const docObj: any[] = [];
    const allFiles: any[] = [];

    if (
      values?.approval_document_file ||
      values?.land_register_entry_document_file ||
      values?.business_registration_doc_file
    ) {
      if (type === "business") {
        const selectedBusinessRegFiles = values?.business_registration_doc_file;

        const fdFileDocUpload = await handleUploadDoc(selectedBusinessRegFiles);
        docObj.push(fdFileDocUpload);

        onSubmit(values, docObj);
      } else {
        const selectedApprovalDocsFiles = values?.approval_document_file;
        const selectedLandRegDocsFiles =
          values?.land_register_entry_document_file;

        allFiles.push(selectedApprovalDocsFiles, selectedLandRegDocsFiles);

        let itemsProcessed = 0;

        allFiles.forEach(async (file, index, array) => {
          const fdFileDocUpload = await handleUploadDoc(file);
          docObj.push(fdFileDocUpload);
          itemsProcessed++;

          if (itemsProcessed === array.length) {
            onSubmit(values, docObj);
          }
        });
      }
    } else {
      onSubmit(values, []);
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
          copyright="©2023 GAP GmbH"
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
          validationSchema={registrationValidationSchema}
          onSubmit={async (values) => {
            await uploadAllDocuments(values, values?.businessType);
          }}
          enableReinitialize
        >
          {({ validateForm, setTouched, submitForm }) => (
            <Form>
              <Grid sx={styles.form}>
                {activeStep < steps.length ? (
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
                  isVerificationEmailSent && (
                    <EmailVerification
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
          <Link href="#" color="#1E3137" fontWeight="bold">
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

export default RegistrationRealState;

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
