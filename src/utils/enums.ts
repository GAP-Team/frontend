export enum Urgency {
  URGENT = "Dringend",
  NOT_URGENT = "Nicht Dringend",
  DEADLINE_BUILDING_AUTHORITY = "Frist Bauamt",
  OPENING_DATE = "Eröffnungstermin",
  HANDOVER = "Übergabe an Bauherren/Kunden",
}
export enum USER_ROLE {
  REAL_ESTATE_OWNER = "REAL_ESTATE_OWNER",
  SERVICE_PROVIDER = "SERVICE_PROVIDER",
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
}

export enum DocumentChoice {
  UPLOAD_NOW = "Jetzt hochladen Empfohlen",
  NO_DOCUMENTS = "Keine Dokumente vorhanden",
  PER_EMAIL = "Per email versenden",
  SERVER_LINK = "Server verküpfung",
  ON_SITE = "Dokumente vor Ort zur Verfügung stellen",
}
