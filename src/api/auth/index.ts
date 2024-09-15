import api from "../axios";

const authAPIs = {
  /* Authentication Routes */
  login: (data: any): any => api.post("/auth/login", data),
  logout: (userId: any): any => api.post("/auth/logout", userId),
};

export default authAPIs;
