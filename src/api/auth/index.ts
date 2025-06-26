import api from "../axios";

const authAPI = {
  /* Authentication Routes */
  // FIXME: Add proper types for the parameters and response
  login: (userCredential: any): any => api.post("/auth/login", userCredential),
  logout: (userId: any): any => api.post("/auth/logout", userId),
};

export default authAPI;
