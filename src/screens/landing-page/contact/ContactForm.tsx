import { useFormik } from "formik";
import emailAPI from "@/api/email";
import { ContactFormProps } from "./types";
import { useAppDispatch } from "@/lib/hooks";
import GTextInput from "@/components/inputs/GTextInput";
import { showSnackbar } from "@/components/feedback/snackbar";
import { ContactFormSchema } from "@/utils/ValidationSchema";
import {
  Grid,
  Typography,
  Checkbox,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import LabelWithAsterisk from "@/components/data-display/label/LabelWithAsterisk";
import GPhoneInput from "@/components/inputs/GPhoneInput";

const ContactForm = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const initialValues: ContactFormProps = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    subject: "",
    message: "",
    dataPrivacyAccepted: false,
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: ContactFormSchema,

    onSubmit: async (values) => {
      const contactPayload = {
        firstName: values?.firstName,
        lastName: values?.lastName,
        email: values?.email,
        phoneNumber: Number(values?.phoneNumber),
        subject: values?.subject,
        message: values?.message,
        dataPrivacyAccepted: values?.dataPrivacyAccepted,
      };

      const response = await emailAPI.contactUs(contactPayload);
      if (response?.data?.status === 201) {
        formik?.resetForm();
        dispatch(
          showSnackbar({
            type: "success",
            message:
              "Vielen Dank für Ihre Nachricht. Ihre E-Mail wurde erfolgreich gesendet. Wir melden uns in Kürze bei Ihnen.",
          })
        );
      } else {
        dispatch(
          showSnackbar({
            type: "error",
            message:
              "Leider konnte Ihre E-Mail nicht gesendet werden. Versuchen Sie es bitte später noch einmal.",
          })
        );
      }
    },
  });

  return (
    <>
      <form
        onSubmit={formik.handleSubmit}
        style={{
          ...styles.form,
          paddingLeft: isMobile ? "0.25rem" : "1rem",
          paddingRight: isMobile ? "0.25rem" : 0,
        }}
      >
        <Grid container spacing={2} sx={styles.formInnerContainer}>
          {/* Contact Form */}
          <Typography
            variant="body1"
            sx={{
              ...styles.formHeading,
              fontSize: isMobile ? "1rem" : isTablet ? "1.1rem" : "1.3rem",
            }}
          >
            BITTE FÜLLEN SIE DAS FOLGENDE KONTAKTFORMULAR AUS:
          </Typography>
          <Typography
            variant="body1"
            sx={{
              ...styles.formInformation,
              fontSize: isMobile ? "0.9rem" : "17px",
            }}
          >
            <span style={{ color: "red" }}>*</span> Pflichtfelder
          </Typography>

          {/* Form */}
          <Grid
            sx={{
              ...styles.textFieldContainer,
              flexDirection: isMobile ? "column" : "row",
            }}
          >
            <Grid sx={styles.textFieldHolder}>
              <LabelWithAsterisk>Vorname</LabelWithAsterisk>
              <GTextInput
                id="firstName"
                name="firstName"
                value={formik?.values?.firstName}
                onChange={formik?.handleChange}
                onBlur={formik?.handleBlur}
                helperText={
                  formik?.touched?.firstName && formik?.errors?.firstName
                }
                error={
                  formik?.touched?.firstName &&
                  Boolean(formik?.errors?.firstName)
                }
              />
            </Grid>
            <Grid sx={styles.textFieldHolder}>
              <LabelWithAsterisk>Nachname</LabelWithAsterisk>
              <GTextInput
                id="lastName"
                name="lastName"
                value={formik?.values?.lastName}
                onChange={formik?.handleChange}
                onBlur={formik?.handleBlur}
                helperText={
                  formik?.touched?.lastName && formik?.errors?.lastName
                }
                error={
                  formik?.touched?.lastName && Boolean(formik?.errors?.lastName)
                }
              />
            </Grid>
          </Grid>
          <Grid
            sx={{
              ...styles.textFieldContainer,
              flexDirection: isMobile ? "column" : "row",
            }}
          >
            <Grid sx={styles.textFieldHolder}>
              <LabelWithAsterisk>Telefonnummer</LabelWithAsterisk>
              <GPhoneInput
                id="phoneNumber"
                name="phoneNumber"
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.phoneNumber &&
                  Boolean(formik.errors.phoneNumber)
                }
                helperText={
                  formik.touched.phoneNumber && formik.errors.phoneNumber
                }
              />
            </Grid>
            <Grid sx={styles.textFieldHolder}>
              <LabelWithAsterisk>Email</LabelWithAsterisk>
              <GTextInput
                id="email"
                name="email"
                value={formik?.values?.email}
                onChange={formik?.handleChange}
                onBlur={formik?.handleBlur}
                helperText={formik?.touched?.email && formik?.errors?.email}
                error={formik?.touched?.email && Boolean(formik?.errors?.email)}
              />
            </Grid>
          </Grid>
          <Grid sx={styles.textFieldHolder}>
            <LabelWithAsterisk>Betreff</LabelWithAsterisk>
            <GTextInput
              id="subject"
              name="subject"
              value={formik?.values?.subject}
              onChange={formik?.handleChange}
              onBlur={formik?.handleBlur}
              helperText={formik?.touched?.subject && formik?.errors?.subject}
              error={
                formik?.touched?.subject && Boolean(formik?.errors?.subject)
              }
            />
          </Grid>
          <Grid sx={styles.textFieldHolder}>
            <LabelWithAsterisk>Nachricht</LabelWithAsterisk>
            <GTextInput
              id="message"
              placeholder="Bitte schreiben Sie hier Ihre Nachricht"
              multiline
              rows={isMobile ? 6 : 8}
              variant="outlined"
              fullWidth
              name="message"
              value={formik?.values?.message}
              onChange={formik?.handleChange}
              onBlur={formik?.handleBlur}
              error={
                formik?.touched?.message && Boolean(formik?.errors?.message)
              }
              helperText={formik?.touched?.message && formik?.errors?.message}
            />
          </Grid>

          {/* Send Button */}
          <Grid>
            <LabelWithAsterisk>Datenschutz</LabelWithAsterisk>
            <Grid
              sx={{
                ...styles.textFieldContainer,
                alignItems: "flex-start",
              }}
            >
              <Checkbox
                name="dataPrivacyAccepted"
                onChange={(e) => {
                  formik?.setFieldValue(
                    "dataPrivacyAccepted",
                    e.target.checked
                  );
                }}
                checked={formik?.values?.dataPrivacyAccepted}
              />
              <Typography
                variant="body1"
                sx={{
                  ...styles.agreeDescription,
                  fontSize: isMobile ? "0.8rem" : "1rem",
                }}
              >
                Ich willige ein, dass meine Kontaktdaten an alle in der
                Datenschutzerklärung genannten {isMobile ? "" : <br />}
                Gesellschaften weitergeleitet wird. Meine Einwilligung kann ich
                jederzeit ohne Angaben von {isMobile ? "" : <br />}
                Gründen widerrufen.
              </Typography>
            </Grid>
            <Button
              size="small"
              type="submit"
              disabled={!formik?.values?.dataPrivacyAccepted}
              component="button"
              sx={{
                ...styles.submitButton,
                fontSize: isMobile ? "1rem" : "1.2rem",
                padding: isMobile ? "0.5rem" : "0.7rem",
                paddingRight: isMobile ? "1.2rem" : "1.7rem",
                paddingLeft: isMobile ? "1.2rem" : "1.7rem",
                marginTop: isMobile ? "3rem" : "5rem",
              }}
              className="block px-5 py-2 mt-4 text-center rounded-lg text-md"
            >
              Absenden
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default ContactForm;

const styles = {
  form: {
    paddingLeft: "1rem",
  },
  formInnerContainer: {
    display: "flex",
    textAlign: "left",
    flexDirection: "column",
  },
  textFieldContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  formHeading: {
    fontSize: "1.3rem",
    fontWeight: "900",
    marginBottom: "10px",
  },
  formInformation: {
    marginBottom: "25px",
    fontSize: "17px",
  },
  textFieldHolder: {
    width: "100%",
    marginLeft: "2.5px",
    marginRight: "2.5px",
    marginBottom: "1.2rem",
  },
  submitButton: {
    background: "#cc0000",
    color: "#FFFFFF",
    padding: "0.7rem",
    paddingRight: "1.7rem",
    paddingLeft: "1.7rem",
    borderRadius: "10px",
    fontSize: "1.2rem",
    textTransform: "none",
    whiteSpace: "pre",
    marginTop: "5rem",
    cursor: "pointer",
    "&:hover": {
      background: "#eb5959",
    },
    "&:disabled": {
      color: "#FFFFFF",
      background: "#ffd1d1",
      cursor: "not-allowed",
    },
  },
  heroTextHolder: {
    marginLeft: "5rem",
  },
  agreeDescription: {},
};
