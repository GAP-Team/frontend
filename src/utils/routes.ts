export const REAL_ESTATE_BASE = "/real-estate";
export const SERVICE_PROVIDER_BASE = "/service-provider";

export const ROUTES = {
  SERVICE_PROVIDER_HOME: "/", // This is the default route

  LOGIN: "/login",
  REGISTER: "/register",
  CONTACT_US: "/contact-us",
  REAL_ESTATE: {
    DASHBOARD: `${REAL_ESTATE_BASE}/dashboard`,
    BUILDING: {
      BUILDINGS: `${REAL_ESTATE_BASE}/buildings`,
      ADD_BUILDING: `${REAL_ESTATE_BASE}/buildings/add`,
      EDIT_BUILDING: (id: string) => `${REAL_ESTATE_BASE}/buildings/edit/${id}`,
    },
    FACILITY: {
      FACILITIES: `${REAL_ESTATE_BASE}/facilities`,
      ADD_FACILITY: `${REAL_ESTATE_BASE}/facilities/add`,
      EDIT_FACILITY: (id: string) =>
        `${REAL_ESTATE_BASE}/facilities/edit/${id}`,
    },
    TENDER: {
      TENDERS: `${REAL_ESTATE_BASE}/tenders`,
      ADD_TENDER: `${REAL_ESTATE_BASE}/tenders/add`,
      TENDER_DETAILS: (id: string) => `${REAL_ESTATE_BASE}/tenders//${id}`,
      EDIT_TENDER: (id?: string) => `${REAL_ESTATE_BASE}/tenders/edit/${id}`,
    },
    COST_SAVING: `${REAL_ESTATE_BASE}/cost-savings`,
    SETTINGS: {
      USER_PROFILE: `${REAL_ESTATE_BASE}/settings/user-profile`,
      EMAIL_CHANGE: `${REAL_ESTATE_BASE}/settings/email-change`,
      DELETE_ACCOUNT: `${REAL_ESTATE_BASE}/settings/delete-account`,
      COMPANY_PROFILE: `${REAL_ESTATE_BASE}/settings/company-profile`,
      PASSWORD_CHANGE: `${REAL_ESTATE_BASE}/settings/password-change`,
    },
  },
  SERVICE_PROVIDER: {
    DASHBOARD: `${SERVICE_PROVIDER_BASE}/dashboard`,
    APPLICATIONS: `${SERVICE_PROVIDER_BASE}/applications`,
    MESSAGES: `${SERVICE_PROVIDER_BASE}/messages`,
    CONTRACTS: `${SERVICE_PROVIDER_BASE}/contracts`,
  },
};
