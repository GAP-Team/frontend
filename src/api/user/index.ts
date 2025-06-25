import api from "../axios";

const userAPI = {
  /* User Routes */
  register: (user: any): any => api.post("/users", user),
  getUserById: (id: any): any => api.get(`/users/${id}`),
  verifyEmailToken: (verificationPayload: any): any =>
    api.post("/users/verify-user-token", verificationPayload),
  update: (userId: string, user: any): any => api.put(`/users/${userId}`, user),
  getFilterCreteria: (userId: string): any =>
    api.get(`/users/${userId}/filter-criteria`),
  getBuildings: (
    userId: string,
    city: string = "",
    state: string = "",
    facilityType: string = ""
  ): any =>
    api.get(
      `/users/${userId}/buildings?city=${city}&state=${state}&facilityType=${facilityType}`
    ),
  getTendersOfUser: (
    userId: string,
    city: string = "",
    state: string = "",
    facilityType: string = ""
  ): any =>
    api.get(
      `/users/${userId}/tenders?city=${city}&state=${state}&facilityType=${facilityType}`
    ),

  changePassword: (userId: string, passwordPayload: any): any =>
    api.post(`/users/${userId}/change-password`, passwordPayload),
  getFacilitiesOfUser: (
    userId: string,
    city: string = "",
    state: string = "",
    facilityType: string = ""
  ): any =>
    api.get(
      `/users/${userId}/facilities?city=${city}&state=${state}&facilityType=${facilityType}`
    ),
  delete: (userId: string, currentPassword: string): any =>
    api.delete(`/users/${userId}`, {
      data: { currentPassword: currentPassword },
    }),
};

export default userAPI;
