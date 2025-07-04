import api from "../axios";

const userAPIs = {
  /* User Registration Routes */
  register: (data: any): any => api.post("/users", data),
  getUserDataById: (id: any): any => api.get(`/users/${id}`),
  verifyEmailToken: (data: any): any =>
    api.post("/users/verify-user-token", data),
  updateUser: (id: string, data: any): any => api.put(`/users/${id}`, data),
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
  deleteUser: (id: string, currentPassword: string): any =>
    api.delete(`/users/${id}`, { data: { currentPassword: currentPassword } }),
  getUsers: (): any => api.get("/users"),
  activateUser: (id: string): any => api.post(`/users/${id}/active`),
  deActivateUser: (id: string): any => api.post(`/users/${id}/deactive`),
};

export default userAPIs;
