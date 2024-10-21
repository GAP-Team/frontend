import api from "../axios";

const userAPIs = {
  /* User Registration Routes */
  getAllUser: (): any => api.get("/users"),
  register: (data: any): any => api.post("/users/register", data),
  getUserDataById: (id: any): any => api.get(`/users/by-id/${id}`),
  getUserData: (data: any): any => api.post("/users/by-email", data),
  verifyEmail: (data: any): any => api.post("/users/verify-user-token", data),
  updateUser: (id: string, data: any): any => api.patch(`/users/${id}`, data),
  sendVerificationEmail: (data: any): any =>
    api.post("/emails/send-email", data),
};

export default userAPIs;
