export const ROUTES = {
  SERVICE_PROVIDER_HOME: "/",
  REAL_ESTATE_HOME: "/real-estate",
  LOGIN: "/login",
  REGISTER: "/register",
  REAL_ESTATE: {
    DASHBOARD: "/real-estate/dashboard",
    BUILDING: {
      BUILDINGS: "/real-estate/buildings",
      ADD_BUILDING: "/real-estate/building/add",
      EDIT_BUILDING: (id: string) => `/real-estate/building/edit/${id}`,
    },
    FACILITY: {
      FACILITIES: "/real-estate/facilities",
      ADD_FACILITY: "/real-estate/facility/add",
      EDIT_FACILITY: (id: string) => `/real-estate/facility/edit/${id}`,
    },
    TENDER: {
      TENDERS: "/real-estate/tenders",
      TENDER_DETAILS: (id: string) => `/real-estate/tenders//${id}`,
      ADD_TENDER: "/real-estate/tender/add",
      EDIT_TENDER: (id?: string) => `/real-estate/tender/edit/${id}`,
    },
    COST_SAVING: "/real-estate/cost-saving",
    SETTINGS: {
      USER_PROFILE: "/real-estate/settings/user-profile",
      COMPANY_PROFILE: "/real-estate/settings/company-profile",
      EMAIL_CHANGE: "/real-estate/settings/email-change",
      PASSWORD_CHANGE: "/real-estate/settings/password-change",
      DELETE_ACCOUNT: "/real-estate/settings/delete-account",
    },
  },
  SERVICE_PROVIDER: {
    DASHBOARD: "/service-provider/dashboard",
  },
};
