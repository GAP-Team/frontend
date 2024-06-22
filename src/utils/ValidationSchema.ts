
import * as yup from "yup";

export const loginValidationSchema = yup.object({
    email: yup
      .string()
      .email("Eingabe einer gültigen E-Mail")
      .required("E-Mail ist erforderlich"),
    password: yup
      .string()
      .required("Passwort ist erforderlich")
  });
  
export const registrationValidationSchema = yup.object({
  firstName: yup
    .string()
    .required("Vorname ist erforderlich"),
  lastName: yup
    .string()
    .required("Nachname ist erforderlich"),
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
      "Das Passwort muss Groß- und Kleinbuchstaben, eine Ziffer und ein Sonderzeichen enthalten"
  ),
  confirmPassword: yup.string().oneOf([yup.ref('password'), undefined], 'Passwörter müssen übereinstimmen')
    .required("Passwort bestätigen ist erforderlich"),
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
    houseName: yup
    .string()
    .required("Hausnummer ist erforderlich"),
  pin: yup
    .string()
    .required("Postleitzahl ist erforderlich")
    .matches(
      /^\d{4,5}$/,
      "Postleitzahl muss zwischen 4 und 5 Ziffern lang sein"
    ),
  city: yup
    .string()
    .required("Stadt ist erforderlich"),
  registrationnum: yup.string(),
  bsndoc: yup.string(),
  approvdoc: yup.string(),
  landdoc: yup.string()
}).test(
  'documentRequirement',
  'Entweder bsndoc, registrationnum, approvdoc oder landdoc ist erforderlich',
  function (values) {
    const { bsndoc, registrationnum, approvdoc, landdoc } = values;

    // If any of the four fields is nonempty, return true
    if (bsndoc || registrationnum || approvdoc || landdoc) {
      return true;
    }

    // Otherwise, create an error for each relevant field
    if (!bsndoc && !registrationnum && !approvdoc && !landdoc) {
      return this.createError({
        path: 'registrationnum',
        message: 'Entweder Dokumente oder eine Registrierungsnummer erforderlich',
      });
    }
  }
);
  export const addObjektFormSchema = yup.object().shape({
    buildingName: yup
      .string()
      .required("Gebäudename ist erforderlich.")
      .min(3, "Gebäudename muss mindestens 3 Zeichen lang sein."),
    totalArea: yup.number().typeError("Gesamtfläche muss eine Zahl sein.").required("Gesamtfläche ist erforderlich.").min(1, "Gesamtfläche muss größer als 0 sein."),
    buildingType: yup.string().required("Gebäudetyp ist erforderlich."),
    objektTag: yup.string(),
    contactPerson: yup.array().of(
      yup.object({
        name: yup.string(),
        role: yup.string(),
        email: yup.string().email("Eingabe einer gültigen E-Mail"),
      })
    ).min(1, "Mindestens eine Kontaktperson ist erforderlich."),
    address: yup.string().required("Adresse ist erforderlich."),
    pin: yup
      .string()
      .required("Postleitzahl ist erforderlich")
      .matches(
        /^\d{4,5}$/,
        "Postleitzahl muss zwischen 4 und 5 Ziffern lang sein"
      ),
    city: yup.string().required("Stadt ist erforderlich."),
    state: yup.string().required("Bundesland ist erforderlich."),
    constructionDocs: yup
      .array()
      .of(yup.mixed().required())
      .min(1, "Mindestens ein Baudokument ist erforderlich."),
    floorplanDocs: yup
      .array()
      .of(yup.mixed().required())
      .min(1, "Mindestens ein Grundrissdokument ist erforderlich."),
    otherDocs: yup
      .array()
      .of(yup.mixed().required()),
      // .min(1, "Mindestens ein weiteres Dokument ist erforderlich."),
    serverLink: yup
      .string()
      .url("Server-Link muss eine gültige URL sein."),
  });

  export const addTenderValidationSchema = [
    yup.object().shape({
      clientName: yup.string().required("Required"),
      tenderName: yup.string().required("Required"),
      tenderForm: yup.string().required("Required"), 
      tenderType: yup.string().required("Beschreiben Sie bitte den gewünschten Ausschreibungstyp"),
    }),
    yup.object({
      buildingName: yup.string(),
      equipmentName: yup.string(),
      equipmentType: yup.string().required("Beschreiben Sie bitte den gewünschten Anlagentypenbeschreibung"),
    }),
    yup.object({
      detailDescription: yup.string(),
    }),
    yup.object({
      urgency: yup.string(),
      fromDate: yup.date(),
      toDate: yup.date(),
      safetyWorkRequired: yup.string(),
      freeParkingAvailable: yup.string(),
    }),
    yup.object({
      documentChoice: yup.string(),
      constructionDocs: yup.array().of(yup.mixed()),
      floorplanDocs: yup.array().of(yup.mixed()),
      equipmentDocs: yup.array().of(yup.mixed()),
      serverLink: yup.string(),
    }),
  ];