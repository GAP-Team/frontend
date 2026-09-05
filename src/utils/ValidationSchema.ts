import * as yup from "yup";
import { USER_ROLE } from "./enums";

const EMAIL_REGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const NAME_REGEX = /^[\p{L}\s'-]+$/u;

export const loginValidationSchema = yup.object({
  email: yup
    .string()
    .matches(EMAIL_REGEX, "Ungültige Email")
    .required("Email ist erforderlich."),
  password: yup.string().required("Passwort ist erforderlich"),
});

export const registrationValidationSchema = [
  yup.object({
    firstName: yup
      .string()
      .required("Vorname ist erforderlich")
      .min(2, "Vorname muss mindestens 2 Zeichen lang sein")
      .max(50, "Vorname darf maximal 50 Zeichen lang sein")
      .matches(
        NAME_REGEX,
        "Name darf nur Buchstaben, Leerzeichen, Bindestriche und Apostrophe enthalten"
      ),
    lastName: yup
      .string()
      .required("Nachname ist erforderlich")
      .min(2, "Nachname muss mindestens 2 Zeichen lang sein")
      .max(50, "Nachname darf maximal 50 Zeichen lang sein")
      .matches(
        NAME_REGEX,
        "Name darf nur Buchstaben, Leerzeichen, Bindestriche und Apostrophe enthalten"
      ),
    email: yup
      .string()
      .matches(EMAIL_REGEX, "Eingabe einer gültigen E-Mail")
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
    role: yup.string(),
  }),
  yup.object({
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
  }),
  yup
    .object({
      registrationNumber: yup.string(),
      businessRegistrationDocument: yup.string(),
      approvalDocument: yup.string(),
      landRegisterEntryDocument: yup.string(),
      personalIdDocument: yup.string(),
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
          personalIdDocument,
        } = values;

        // If any of the four fields is nonempty, return true
        if (
          businessregistrationDocument ||
          registrationNumber ||
          approvalDocument ||
          landRegisterEntryDocument ||
          personalIdDocument
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
    ),
  yup.object({
    numOfEmployees: yup.string().when("role", {
      is: USER_ROLE.SERVICE_PROVIDER,
      then: (schema) =>
        schema.required("Anzahl der Mitarbeiter ist erforderlich"),
      otherwise: (schema) => schema.notRequired(),
    }),
    manufacturerExperience: yup.string(),
    qualificationDocs: yup.array().when("role", {
      is: USER_ROLE.SERVICE_PROVIDER,
      then: (schema) =>
        schema
          .of(yup.mixed())
          .min(1, "Mindestens ein Qualifikationsdokument ist erforderlich")
          .required("Qualifikationsdokumente sind erforderlich"),
      otherwise: (schema) => schema.notRequired(),
    }),
  }),
];

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

export const ContactPersonSchema = yup.object().shape({
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
    buildingId: yup
      .string()
      .test(
        "not-zero",
        "Sie müssen vorher Gebäude erstellen",
        (value) => value !== "0"
      )
      .required("Bitte wählen Sie ein Gebäude aus"),
    facilityId: yup
      .string()
      .test(
        "not-zero",
        "Sie müssen vorher Anlage erstellen",
        (value) => value !== "0"
      )
      .required("Bitte wählen Sie eine Anlage aus"),
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
    name: yup.string().required("Anlagenname ist erforderlich"),
    facilityType: yup.string().required("Oberbegriff ist erforderlich"),
    numberOfUnits: yup
      .number()
      .required("Anlage Anzahl ist erforderlich")
      .typeError("Anlage Anzahl muss eine Zahl sein")
      .positive("Anlage Anzahl muss eine positive Zahl sein")
      .integer("Anlage Anzahl muss eine Ganzzahl sein")
      .test(
        "not-zero",
        "Anlage Anzahl, um mindestens eine zu haben",
        (value) => value !== 0
      ),
    subcategory: yup.string(),
    selectedBuilding: yup
      .string()
      .test(
        "not-zero",
        "Sie müssen vorher Gebäude erstellen",
        (value) => value !== "0"
      )
      .required("Gebäude Zuordnung ist erforderlich"),
  }),
  yup.object({
    lastCheckDate: yup.date().nullable(),
    nextCheckInYearNumber: yup.number(),
    isPublishCheckAutomatically: yup.boolean(),
    publishCheckAutomaticallyInMonth: yup.number(),
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

const BasicInfoRegistrationSchema =
  registrationValidationSchema[0] as yup.ObjectSchema<any>;

export const UserProfileSchema = yup.object({
  firstName: BasicInfoRegistrationSchema.fields.firstName,
  lastName: BasicInfoRegistrationSchema.fields.lastName,
  position: yup
    .string()
    .matches(
      NAME_REGEX,
      "Beruf darf nur Buchstaben, Leerzeichen, Bindestriche und Apostrophe enthalten"
    ),
});

export const EmailChangeSchema = yup.object({
  email: BasicInfoRegistrationSchema.fields.email,
  password: yup.string().required("Current Passwort ist erforderlich"),
});

export const passwordChangeSchema = yup.object({
  currentPassword: yup.string().required("Current Passwort ist erforderlich"),
  newPassword: yup
    .string()
    .required("New Passwort ist erforderlich")
    .min(8, "Das Current Passwort sollte mindestens 8 Zeichen lang sein")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Das Passwort muss mindestens einen Groß- und einen Kleinbuchstaben, eine Zahl und ein Sonderzeichen enthalten"
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword")], "Passwörter müssen übereinstimmen")
    .required("Passwort bestätigen ist erforderlich"),
});

const AddressRegistrationSchema =
  registrationValidationSchema[1] as yup.ObjectSchema<any>;
export const CompanyProfileSchema = yup.object({
  companyName: BasicInfoRegistrationSchema.fields.company,
  street: AddressRegistrationSchema.fields.street,
  houseNumber: AddressRegistrationSchema.fields.houseNo,
  zip: AddressRegistrationSchema.fields.zip,
  city: AddressRegistrationSchema.fields.city,
  phonenumber: BasicInfoRegistrationSchema.fields.telephone,
  registrationNumber: yup.string(),
});

export const ContactFormSchema = yup.object({
  firstName: (registrationValidationSchema[0] as yup.ObjectSchema<any>).fields
    .firstName,
  lastName: (registrationValidationSchema[0] as yup.ObjectSchema<any>).fields
    .lastName,
  email: (registrationValidationSchema[0] as yup.ObjectSchema<any>).fields
    .email,
  phoneNumber: (registrationValidationSchema[0] as yup.ObjectSchema<any>).fields
    .telephone,
  subject: yup.string().required("Betreff ist erforderlich."),
  message: yup.string().required("Nachricht ist erforderlich."),
  dataPrivacyAccepted: yup
    .boolean()
    .oneOf([true], "Sie müssen die Datenschutzbestimmungen akzeptieren"),
});

export const ContractSearchSchema = yup.object({
  states: yup.array().of(yup.string()).min(1, "Bundesland ist erforderlich"),
  tenderTypes: yup
    .array()
    .of(yup.string())
    .min(1, "Auftragstyp ist erforderlich"),
  facilitySubcategories: yup
    .array()
    .of(yup.string())
    .min(1, "Bitte wählen Sie mindestens eine Anlage aus"),
});

export const DeleteAccountSchema = yup.object({
  password: yup.string().required("Passwort ist erforderlich"),
});

export const applyContractFormSchema = yup.object().shape({
  totalPrice: yup.string().required("Gesamtkosten ist erforderlich"),
  hourlyRate: yup.string().required("Netto-Stundensatz ist erforderlich"),
  zip: yup
    .string()
    .matches(
      /^\d{4,5}$/,
      "Postleitzahl muss zwischen 4 und 5 Ziffern lang sein"
    ),
  desiredDates: yup.array().of(yup.date()),
  termsConditionDoc: yup.string().required("AGB dokument ist erforderlich"),
  offerDoc: yup.string().required("Angebot dokument ist erforderlich"),
});

export const passwordResetValidationSchema = yup.object({
  email: yup
    .string()
    .matches(EMAIL_REGEX, "Ungültige Email")
    .required("Email ist erforderlich."),
});
