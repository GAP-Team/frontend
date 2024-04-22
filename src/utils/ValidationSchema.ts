
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

  export const addObjektFormSchema = yup.object().shape({
    buildingName: yup
      .string()
      .required("Gebäudename ist erforderlich.")
      .min(3, "Gebäudename muss mindestens 3 Zeichen lang sein."),
    totalArea: yup.string().required("Gesamtfläche ist erforderlich."),
    buildingType: yup.string().required("Gebäudetyp ist erforderlich."),
    objektTag: yup.string().required("Objekt-Tag ist erforderlich."),
    contactPerson: yup
      .string()
      .required("Kontaktperson ist erforderlich.")
      .min(3, "Kontaktperson muss mindestens 3 Zeichen lang sein."),
    address: yup.string().required("Adresse ist erforderlich."),
    plz: yup
      .string()
      .required("PLZ ist erforderlich.")
      .matches(/^[0-9]{5}$/, "PLZ muss eine gültige fünfstellige Zahl sein."),
    city: yup.string().required("Stadt ist erforderlich."),
    state: yup.string().required("Bundesland ist erforderlich."),
    serverLink: yup
      .string()
      .required("Server-Link ist erforderlich.")
      .url("Server-Link muss eine gültige URL sein."),
  });