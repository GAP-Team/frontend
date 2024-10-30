import api from "../axios";

const userAPIs = {
  /* User Registration Routes */
  getAllUser: (): any => api.get("/users"),
  register: (data: any): any => api.post("/users", data),
  getUserDataById: (id: any): any => api.get(`/users/${id}`),
  getUserData: (data: any): any => api.post("/users/email", data),
  verifyEmail: (data: any): any => api.post("/users/verify-user-token", data),
  updateUser: (id: string, data: any): any => api.patch(`/users/${id}`, data),
  sendVerificationEmail: (data: any): any => api.post("/emails/send", data),
  getFilterCreteria: (id: string): any =>
    api.get(`/users/${id}/filter-criteria`),
  getBuildings: (
    userId: string,
    city: string,
    state: string,
    facilityType: string
  ): any =>
    api.get(
      `/users/${userId}/buildings?city=${city}&state=${state}&facilityType=${facilityType}`
    ),
};

export default userAPIs;
