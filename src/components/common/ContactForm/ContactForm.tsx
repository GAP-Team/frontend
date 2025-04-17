import { useFormik } from "formik";
import emailAPIs from "@/api/email";
import { ContactFormProps } from "./types";
import { useAppDispatch } from "@/lib/hooks";
import GTextInput from "@/components/input/GTextInput";
import { showSnackbar } from "@/components/root-snackbar";
import { ContactFormSchema } from "@/utils/ValidationSchema";
import { Grid, Typography, Checkbox, Button } from "@mui/material";
import LabelWithAsterisk from "@/components/label/LabelWithAsterisk";

const ContactForm = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const initialValues: ContactFormProps = {
    email: "",
    message: "",
    lastName: "",
    firstName: "",
    phoneNumber: 0,
    dataPrivacyAccepted: false,
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: ContactFormSchema,

    onSubmit: async (values) => {
      const response = await emailAPIs.contactUs(values);
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
      <form onSubmit={formik.handleSubmit} style={styles.form}>
        <Grid container spacing={2} sx={styles.formInnerContainer}>
          {/* Contact Form */}
          <Typography variant="body1" sx={styles.formHeading}>
            BITTE FÜLLEN SIE DAS FOLGENDE KONTAKTFORMULAR AUS:
          </Typography>
          <Typography variant="body1" sx={styles.formInformation}>
            <span style={{ color: "red" }}>*</span> Pflichtfelder
          </Typography>

          {/* Form */}
          <Grid sx={styles.textFieldContainer}>
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
          <Grid sx={styles.textFieldContainer}>
            <Grid sx={styles.textFieldHolder}>
              <LabelWithAsterisk>Telefonnummer</LabelWithAsterisk>
              <GTextInput
                id="phoneNumber"
                name="phoneNumber"
                type="number"
                value={formik?.values?.phoneNumber}
                onChange={formik?.handleChange}
                onBlur={formik?.handleBlur}
                helperText={
                  formik?.touched?.phoneNumber && formik?.errors?.phoneNumber
                }
                error={
                  formik?.touched?.phoneNumber &&
                  Boolean(formik?.errors?.phoneNumber)
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
            <LabelWithAsterisk>Nachricht</LabelWithAsterisk>
            <GTextInput
              id="message"
              placeholder="Bitte schreiben Sie hier Ihre Nachricht"
              multiline
              rows={8}
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
            <Grid sx={styles.textFieldContainer}>
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
              <Typography variant="body1" sx={styles.agreeDescription}>
                Ich willige ein, dass meine Kontaktdaten an alle in der
                Datenschutzerklärung genannten <br />
                Gesellschaften weitergeleitet wird. Meine Einwilligung kann ich
                jederzeit ohne Angaben von <br />
                Gründen widerrufen.
              </Typography>
            </Grid>
            <Button
              size="small"
              type="submit"
              disabled={!formik?.values?.dataPrivacyAccepted}
              component="button"
              sx={styles.submitButton}
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
