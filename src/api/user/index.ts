import api from "../axios";

const userAPIs = {
  /* User Registration Routes */
  register: (data: any): any => api.post("/users", data),
  getUserDataById: (id: any): any => api.get(`/users/${id}`),
  verifyEmailToken: (data: any): any =>
    api.post("/users/verify-user-token", data),
  updateUser: (id: string, data: any): any => api.put(`/users/${id}`, data),
  sendVerificationEmail: (data: any): any =>
    api.post("/emails/send-verificaiton-email", data),
  getFilterCreteria: (id: string): any =>
    api.get(`/users/${id}/filter-criteria`),
  getBuildings: (
    userId: string,
    city: string = "",
    state: string = "",
    facilityType: string = ""
  ): any =>
    api.get(
      `/users/${userId}/buildings?city=${city}&state=${state}&facilityType=${facilityType}`
    ),
  getUserTenders: (
    userId: string,
    city: string = "",
    state: string = "",
    facilityType: string = ""
  ): any =>
    api.get(
      `/users/${userId}/tenders?city=${city}&state=${state}&facilityType=${facilityType}`
    ),

  changePassword: (id: string, data: any): any =>
    api.post(`/users/${id}/change-password`, data),
  getUserFacilities: (
    userId: string,
    city: string = "",
    state: string = "",
    facilityType: string = ""
  ): any =>
    api.get(
      `/users/${userId}/facilities?city=${city}&state=${state}&facilityType=${facilityType}`
    ),
  contactUs: (data: any): any => api.post("/emails/contact", data),
};

export default userAPIs;
