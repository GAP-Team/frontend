import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import Cookies from "js-cookie";
import logger from "@/utils/Logger";

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";
const API_KEY = process.env.NEXT_PUBLIC_API_KEY ?? "";
if (!API_KEY) logger.error("NEXT_PUBLIC_API_KEY is not set — API requests will be rejected");

const ACCESS_TOKEN_KEY = "access_token";

const api = axios.create({ baseURL: API_BASE_URL });

// --- Request Interceptor ---
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = Cookies.get(ACCESS_TOKEN_KEY);

    const url = config.url ?? "";

    // Match exactly, not by substring: `includes("/users")` would also
    // strip auth from `/users/:id` and friends.
    const PUBLIC_ENDPOINTS = ["/auth/login", "/users/verify-user-token"];
    const isPublicEndpoint = PUBLIC_ENDPOINTS.some(
      (path) => url === path || url.startsWith(`${path}?`)
    );

    if (token && !isPublicEndpoint) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Always attach API key
    if (API_KEY) {
      config.headers["x-api-key"] = API_KEY;
    }

    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// --- Response Interceptor ---
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response?.status === 403) {
      Cookies.remove(ACCESS_TOKEN_KEY);
    }
    return Promise.reject(error);
  }
);

export default api;
