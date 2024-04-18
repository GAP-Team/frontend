
import * as yup from "yup";

export const loginValidationSchema = yup.object({
    email: yup
      .string()
      .email("Eingabe einer gültigen E-Mail")
      .required("E-Mail ist erforderlich"),
    password: yup
      .string()
      .required("Passwort ist erforderlich")
      .min(8, "Das Passwort sollte mindestens 8 Zeichen lang sein")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Das Passwort muss mindestens einen Großbuchstaben, einen Kleinbuchstaben, eine Ziffer und ein Sonderzeichen enthalten"
      ),
  });
  
  export const registrationValidationSchema = yup.object({
    firstname: yup
      .string()
      .required("Vorname ist erforderlich"),
    lastname: yup
      .string()
      .required("Nachname ist erforderlich"),
    email: yup
      .string()
      .email("Eingabe einer gültigen E-Mail")
      .required("E-Mail ist erforderlich"),
    telephone: yup
      .string()
      .required("Telefonnummer ist erforderlich")
      .matches(
        /^(\+?\d{1,3}[- ]?)?\d{10}$/,
        "Telefonnummer muss gültig sein"
      ),
    company: yup
      .string()
      .required("Firmenname ist erforderlich"),
    state: yup
      .string()
      .required("Bundesland ist erforderlich"),
    street: yup
      .string()
      .required("Straßenname ist erforderlich"),
    hausnr: yup
      .string()
      .required("Hausnummer ist erforderlich"),
    plz: yup
      .string()
      .required("Postleitzahl ist erforderlich")
      .matches(
        /^\d{4,5}$/,
        "Postleitzahl muss zwischen 4 und 5 Ziffern lang sein"
      ),
    city: yup
      .string()
      .required("Stadt ist erforderlich"),
    registrationnum: yup
      .string()
  });