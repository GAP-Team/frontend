export enum Urgency {
  URGENT = "Dringend",
  NOT_URGENT = "Nicht Dringend",
  DEADLINE_BUILDING_AUTHORITY = "Frist Bauamt",
  OPENING_DATE = "Eröffnungstermin",
  HANDOVER = "Übergabe an Bauherren/Kunden",
}
export enum USER_ROLE {
  ADMIN = "ADMIN",
  SERVICE_PROVIDER = "SERVICE_PROVIDER",
  REAL_ESTATE_OWNER = "REAL_ESTATE_OWNER",
}

export enum BUSINESS_TYPE {
  BUSINESS = "BUSINESS",
  PRIVATE = "PRIVATE",
}

export enum TENDER_FORM {
  CRAFTSMAN = "CRAFTSMAN",
  EXPERT = "EXPERT",
}

export enum TenderStatusEnum {
  OPEN = "OPEN",
  ACTIVE = "ACTIVE",
  DONE = "DONE",
  REVIEW_REQUIRED = "REVIEW_REQUIRED",
}

export enum DOCUMENT_TYPE {
  CHECK_REPORTS = "BERICHTE PRÜFEN",
  FLOOR_PLANS = "GRUNDRISSE",
  OTHER = "SONSTIGE",
  CONSTRUCTION_DOCUMENTS = "BAUUNTERLAGEN",
  BUSINESS_REGISTRATION = "GEWERBEANMELDUNG",
  LAND_REGISTER_ENTRY = "GRUNDBUCHEINTRAG",
  APPROVAL_DOC = "GENEHMIGUNGSUNTERLAGEN",
  PERSONAL_ID = "PERSONALAUSWEIS",
  QUALIFICATION_DOCUMENTS = "FACH QUALIFIKATION",
  OFFER_DOCUMENTS = "ANGEBOTSUNTERLAGEN",
  TERMS_AND_CONDITIONS = "ALLGEMEINE GESCHÄFTSBEDINGUNGEN",
}

export enum DocumentChoice {
  UPLOAD_NOW = "Jetzt hochladen Empfohlen",
  NO_DOCUMENTS = "Keine Dokumente vorhanden",
  PER_EMAIL = "Per email versenden",
  SERVER_LINK = "Server verküpfung",
  ON_SITE = "Dokumente vor Ort zur Verfügung stellen",
}

export enum FilterPanelLabels {
  STATE = "Bundesland",
  TENDER_TYPE = "Auftragstyp",
  FACILITY_SUBCATEGORY = "Anlagentyp",
}

export enum FORM_ACTION_TYPE {
  CREATE = "CREATE",
  UPDATE = "UPDATE",
}

export enum USER_ROLE_IN_GERMAN {
  SERVICE_PROVIDER = "Dienstleister",
  REAL_ESTATE_OWNER = "Immobilienbetreiber",
}
