import * as yup from "yup";

const EMAIL_REGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const loginValidationSchema = yup.object({
  email: yup
    .string()
    .email("Eingabe einer gültigen E-Mail")
    .required("E-Mail ist erforderlich"),
  password: yup.string().required("Passwort ist erforderlich"),
});

export const registrationValidationSchema = yup
  .object({
    firstName: yup.string().required("Vorname ist erforderlich"),
    lastName: yup.string().required("Nachname ist erforderlich"),
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
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwörter müssen übereinstimmen")
      .required("Passwort bestätigen ist erforderlich"),
    telephone: yup
      .string()
      .required("Telefonnummer ist erforderlich")
      .matches(
        /^\d{10,14}$/,
        "Telefonnummer muss nur Zahlen enthalten und zwischen 10 und 14 Ziffern lang sein"
      ),
    company: yup.string().required("Firmenname ist erforderlich"),
    state: yup.string().required("Bundesland ist erforderlich"),
    street: yup.string().required("Straßenname ist erforderlich"),
    houseNo: yup
      .number()
      .typeError("Hausnummer muss eine Zahl sein.")
      .required("Hausnummer ist erforderlich.")
      .positive("Hausnummer muss größer als 0 sein.")
      .integer("Hausnummer muss eine ganze Zahl sein."),
    zip: yup
      .string()
      .required("Postleitzahl ist erforderlich")
      .matches(
        /^\d{4,5}$/,
        "Postleitzahl muss zwischen 4 und 5 Ziffern lang sein"
      ),
    city: yup.string().required("Stadt ist erforderlich"),
    registrationNumber: yup.string(),
    businessRegistrationDocument: yup.string(),
    approvalDocument: yup.string(),
    landRegisterEntryDocument: yup.string(),
  })
  .test(
    "documentRequirement",
    "Either business registration doc, registration number, approval document, or land register entry document is required.",
    function (values) {
      const {
        businessRegistrationDocument: businessregistrationDocument,
        registrationNumber,
        approvalDocument: approvalDocument,
        landRegisterEntryDocument: landRegisterEntryDocument,
      } = values;

      // If any of the four fields is nonempty, return true
      if (
        businessregistrationDocument ||
        registrationNumber ||
        approvalDocument ||
        landRegisterEntryDocument
      ) {
        return true;
      }
      // If none of the fields are nonempty, return an error
      return this.createError({
        path: "registrationNumber",
        message:
          "Entweder Dokumente oder eine Registrierungsnummer sind erforderlich.",
      });
    }
  );

export const addObjektFormSchema = yup
  .object()
  .shape({
    name: yup.string().required("Gebäudename ist erforderlich."),
    totalArea: yup.number().typeError("Gesamtfläche muss eine Zahl sein."),
    buildingType: yup.string().required("Gebäudetyp ist erforderlich."),
    buildingAbbreviation: yup.string(),
    contactPerson: yup.array().of(
      yup.object({
        lastName: yup.string(),
        firstName: yup.string(),
        phoneNumber: yup.string(),
        email: yup.string().email("Eingabe einer gültigen E-Mail"),
      })
    ),
    street: yup.string().required("STRAßE ist erforderlich."),
    houseNumber: yup
      .number()
      .typeError("Hausnummer muss eine Zahl sein.")
      .required("Hausnummer ist erforderlich.")
      .positive("Hausnummer muss größer als 0 sein.")
      .integer("Hausnummer muss eine ganze Zahl sein."),
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
    constructionDocs: yup.array().of(yup.mixed()),
    floorplanDocs: yup.array().of(yup.mixed()),
    otherDocs: yup.array().of(yup.mixed()),
    serverLink: yup
      .string()
      .test("requiredLink", "Server link ist erforderlich.", function (value) {
        const { documentChoice } = this.parent;
        if (documentChoice === "Server verküpfung") {
          return !!value;
        }
        return true;
      })
      .url("Server-Link muss eine gültige URL sein."),
  })
  .test(
    "documentRequirement",
    "At least one document is required.",
    function (values) {
      const {
        constructionDocs: constructionDocs,
        floorplanDocs: floorplanDocs,
        otherDocs: otherDocs,
        documentChoice,
      } = values;

      if (documentChoice === "Jetzt hochladen Empfohlen") {
        if (
          (constructionDocs && constructionDocs.length > 0) ||
          (floorplanDocs && floorplanDocs.length > 0) ||
          (otherDocs && otherDocs.length > 0)
        ) {
          return true;
        }

        // If none of the arrays contain documents, return an error
        return this.createError({
          path: "otherDocs",
          message: "Mindestens ein Dokument ist erforderlich.",
        });
      }
    }
  );

export const newContactSchema = yup.object().shape({
  firstName: yup.string().required("Vorname ist erforderlich."),
  lastName: yup.string().required("Nachname ist erforderlich."),
  email: yup
    .string()
    .matches(EMAIL_REGEX, "Ungültige Email")
    .required("Email ist erforderlich."),
  phoneNumber: yup
    .string()
    .nullable()
    .test(
      "is-valid-phone",
      "Telefonnummer muss eine gültige Nummer sein.",
      (value) => !value || /^\d+$/.test(value)
    ),
});

export const addTenderValidationSchema = [
  yup.object().shape({
    clientName: yup.string().required("Name des Auftraggeber ist erforderlich"),
    tenderForm: yup.string().required("Ausschreibungsart ist erforderlich"),
    tenderType: yup
      .string()
      .required("Beschreiben Sie bitte den gewünschten Ausschreibungstyp"),
  }),
  yup.object({
    name: yup.string(),
    facilityName: yup.string(),
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
];

export const addFacilityValidationSchema = [
  yup.object({
    name: yup.string(),
    genericTerm: yup.string().required("Oberbegriff ist erforderlich"),
    subcategory: yup.string(),
    buildingName: yup.string().required("Gebäude Zuordnung ist erforderlich"),
  }),
  yup.object({
    lastCheckDate: yup.date().nullable(),
    nextCheckInYearNumber: yup.number(),
    isPublishAutomatically: yup.boolean(),
    publishAutomaticallyInMonth: yup.number(),
    reminderInMonth: yup.number(),
    isEmailNotificationEnable: yup.boolean(),
    emailNotificationList: yup
      .array()
      .of(
        yup
          .string()
          .email("Eingabe einer gültigen E-Mail")
          .matches(EMAIL_REGEX, "Ungültige Email")
      ),
  }),
  yup.object({
    lastMaintenanceDate: yup.date().nullable(),
    nextMaintenanceInMonth: yup.number(),
    isPublishMaintenanceAutomatically: yup.boolean(),
    publishMaintenanceAutomaticallyInMonth: yup.number(),
    maintenanceReminderInMonth: yup.number(),
    isMaintenanceEmailNotificationEnable: yup.boolean(),
    maintenanceEmailNotificationList: yup
      .array()
      .of(
        yup
          .string()
          .email("Eingabe einer gültigen E-Mail")
          .matches(EMAIL_REGEX, "Ungültige Email")
      ),
    isPublishAutomatically: yup.boolean(),
    publishAutomaticallyInMonth: yup.number(),
    reminderInMonth: yup.number(),
    isEmailNotificationEnable: yup.boolean(),
    emailNotificationList: yup
      .array()
      .of(
        yup
          .string()
          .email("Eingabe einer gültigen E-Mail")
          .matches(EMAIL_REGEX, "Ungültige Email")
      ),
  }),
  yup
    .object({
      documentChoice: yup.string(),
      checkReports: yup.array().of(yup.mixed()),
      floorplanDocs: yup.array().of(yup.mixed()),
      otherDocs: yup.array().of(yup.mixed()),
      serverLink: yup
        .string()
        .test(
          "requiredLink",
          "Server link ist erforderlich.",
          function (value) {
            const { documentChoice } = this.parent;
            if (documentChoice === "Server verküpfung") {
              return !!value;
            }
            return true;
          }
        )
        .url("Server-Link muss eine gültige URL sein."),
    })
    .test(
      "documentRequirement",
      "At least one document is required.",
      function (values) {
        const {
          checkReports: checkReports,
          floorplanDocs: floorplanDocs,
          otherDocs: otherDocs,
          documentChoice,
        } = values;

        if (documentChoice === "Jetzt hochladen Empfohlen") {
          if (
            (checkReports && checkReports.length > 0) ||
            (floorplanDocs && floorplanDocs.length > 0) ||
            (otherDocs && otherDocs.length > 0)
          ) {
            return true;
          }

          // If none of the arrays contain documents, return an error
          return this.createError({
            path: "otherDocs",
            message: "Mindestens ein Dokument ist erforderlich.",
          });
        }
      }
    ),
];
