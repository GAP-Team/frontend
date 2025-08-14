export const ADMIN_BASE = "/admin";
export const REAL_ESTATE_BASE = "/real-estate";
export const SERVICE_PROVIDER_BASE = "/service-provider";

export const ROUTES = {
  SERVICE_PROVIDER_HOME: "/",
  LOGIN: "/login",
  REGISTRATION: "/registration",
  ADMIN: {
    DASHBOARD: `${ADMIN_BASE}/dashboard`,
    USERS: `${ADMIN_BASE}/users`,
  },
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
    CONTRACT_DETAILS: (id: string) =>
      `${SERVICE_PROVIDER_BASE}/contracts/${id}`,
    CONTRACT_APPLICATION: (id: string | undefined) =>
      `${SERVICE_PROVIDER_BASE}/contracts/${id}/application`,
    CONTRACT_FILTER_URL: (
      states: string[],
      tenderTypes: string[],
      facilitySubcategories: string[]
    ): string =>
      `${SERVICE_PROVIDER_BASE}/contracts?facilitySubcategories=${facilitySubcategories.join(",")}&tenderTypes=${tenderTypes.join(",")}&states=${states.join(",")}`,
    APPLICATION_DETAILS: (id: string) =>
      `${SERVICE_PROVIDER_BASE}/applications/${id}`,
  },
  BLOGS: {
    BLOGS: "/blogs",
    BLOG_DETAILS: (slug: string) => `/blogs/${slug}`,
  },
  FAQ: "/faq",
  AGB: "/agb",
  SUPPORT: "/support",
  ABOUT_US: "/about-us",
  FUNCTIONS: "/functions",
  IMPRESSUM: "/impressum",
  CONTACT_US: "/contact-us",
  OUR_SERVICE: "/our-service",
  DATA_SECURITY: "/data-security",
  SERVICE_PROVIDER_JOURNEY: "/still-employed-become-a-service-provider",
};
