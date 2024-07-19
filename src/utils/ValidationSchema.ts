
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
  houseNo: yup
    .string()
    .required("Hausnummer ist erforderlich"),
  zip: yup
    .string()
    .required("Postleitzahl ist erforderlich")
    .matches(
      /^\d{4,5}$/,
      "Postleitzahl muss zwischen 4 und 5 Ziffern lang sein"
    ),
  city: yup
    .string()
    .required("Stadt ist erforderlich"),
  registrationNumber: yup.string(),
  business_registration_doc: yup.string(),
  approval_document: yup.string(),
  land_register_entry_document: yup.string()
}).test(
  'documentRequirement',
  'Entweder business registration doc, registrationNumber, approval document oder land register entry document ist erforderlich',
  function (values) {
    const { business_registration_doc, registrationNumber, approval_document, land_register_entry_document } = values;

    // If any of the four fields is nonempty, return true
    if (business_registration_doc || registrationNumber || approval_document || land_register_entry_document) {
      return true;
    }

    // Otherwise, create an error for each relevant field
    if (!business_registration_doc && !registrationNumber && !approval_document && !land_register_entry_document) {
      return this.createError({
        path: 'registrationNumber',
        message: 'Entweder Dokumente oder eine Registrierungsnummer erforderlich',
      });
    }
  }
);
  export const addObjektFormSchema = yup.object().shape({
    name: yup
      .string()
      .required("Gebäudename ist erforderlich.")
      .min(3, "Gebäudename muss mindestens 3 Zeichen lang sein."),
    totalArea: yup.number().typeError("Gesamtfläche muss eine Zahl sein.").required("Gesamtfläche ist erforderlich.").min(1, "Gesamtfläche muss größer als 0 sein."),
    buildingType: yup.string().required("Gebäudetyp ist erforderlich."),
    // buildingAbbreviation: yup.string(),
    contactPerson: yup.array().of(
      yup.object({
        lastName: yup.string(),
        firstName: yup.string(),
        phoneNumber: yup.string(),
        email: yup.string().email("Eingabe einer gültigen E-Mail"),
      })
    ).min(0, "Mindestens eine Kontaktperson ist erforderlich."),
    street: yup.string().required("STRAßE ist erforderlich."),
    houseNumber: yup.string().required("HAUSNR ist erforderlich."),
    zip: yup
      .string()
      .required("Postleitzahl ist erforderlich")
      .matches(
        /^\d{4,5}$/,
        "Postleitzahl muss zwischen 4 und 5 Ziffern lang sein"
      ),
    city: yup.string().required("Stadt ist erforderlich."),
    state: yup.string().required("Bundesland ist erforderlich."),
    documentChoice: yup.string(),
    constructionDocs: yup
      .array()
      .of(yup.mixed()),
    floorplanDocs: yup
      .array()
      .of(yup.mixed()),
    otherDocs: yup
      .array()
      .of(yup.mixed()),
    serverLink: yup
      .string()
      .test('requiredLink', 'Server link ist erforderlich.', function (value) {
        const { documentChoice } = this.parent;
        if (documentChoice === 'Server verküpfung') {
          return !!value;
        }
        return true;
      })
      .url('Server-Link muss eine gültige URL sein.'),
  }).test('requiredDocs', 'Laden Sie mindestens ein Dokument hoch', function (values) {
    const { documentChoice, constructionDocs, floorplanDocs, otherDocs } = values;
    if (documentChoice == 'Jetzt hochladen Empfohlen') {
      if (
        (!constructionDocs || constructionDocs.length == 0) &&
        (!floorplanDocs || floorplanDocs.length == 0) &&
        (!otherDocs || otherDocs.length == 0)
      ) {
        return this.createError({
          path: 'constructionDocs',
          message: 'Laden Sie mindestens ein Dokument hoch',
        });
      }
    }
    return true;
  });

  export const addTenderValidationSchema = [
    yup.object().shape({
      clientName: yup.string().required("Auftraggebers ist erforderlich"),
      tenderName: yup.string().required("Ausschreibung ist erforderlich"),
      tenderForm: yup.string().required("Ausschreibungsart ist erforderlich"),
      tenderType: yup.string().required("Beschreiben Sie bitte den gewünschten Ausschreibungstyp"),
    }),
    yup.object({
      name: yup.string(),
      equipmentName: yup.string(),
      equipmentType: yup.string().required("Beschreiben Sie bitte den gewünschten Anlagentypenbeschreibung"),
    }),
    yup.object({
      detailDescription: yup.string(),
    }),
    yup.object({
      urgency: yup.string(),
      fromDate: yup.date().nullable(),
      toDate: yup.date().nullable(),
      safetyWorkRequired: yup.boolean(),
      freeParkingAvailable: yup.boolean(),
    }),
    yup.object().shape({
      documentChoice: yup.string(),
      constructionDocs: yup.array().of(yup.mixed()),
      floorplanDocs: yup.array().of(yup.mixed()),
      equipmentDocs: yup.array().of(yup.mixed()),
      serverLink: yup.string()
      .test('requiredLink', 'Server link ist erforderlich.', function (value) {
        const { documentChoice } = this.parent;
        if (documentChoice === 'Server verküpfung') {
          return !!value;
        }
        return true;
      })
      .url('Server-Link muss eine gültige URL sein.'),
    }).test('requiredDocs', 'Laden Sie mindestens ein Dokument hoch', function (values) {
      const { documentChoice, constructionDocs, floorplanDocs, equipmentDocs } = values;
      if (documentChoice == 'Jetzt hochladen Empfohlen') {
        if (
          (!constructionDocs || constructionDocs.length == 0) &&
          (!floorplanDocs || floorplanDocs.length == 0) &&
          (!equipmentDocs || equipmentDocs.length == 0)
        ) {
          return this.createError({
            path: 'constructionDocs',
            message: 'Laden Sie mindestens ein Dokument hoch',
          });
        }
      }
      return true;
    }),
  ];