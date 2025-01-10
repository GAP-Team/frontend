import axios from "axios";
import Cookies from "js-cookie";

export const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const api = axios.create({ baseURL: baseUrl });

api.interceptors.request.use(
  (config) => {
    let accessToken = Cookies.get("access_token");
    if (!accessToken) {
      accessToken = "";
    }
    if (accessToken) {
      config.headers!.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (err) => Promise.reject(err)
);
api.interceptors.response.use(
  (response: any) => response,
  async (error: any) => {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 403 &&
      !originalRequest._retry
    ) {
      Cookies.remove("access_token");
    }
    return Promise.reject(error);
  }
);

export default api;
