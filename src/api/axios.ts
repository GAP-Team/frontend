import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import Cookies from "js-cookie";

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";
export const API_KEY = process.env.NEXT_PUBLIC_API_KEY ?? "";
if (!API_KEY) logger.error("NEXT_PUBLIC_API_KEY is not set — API requests will be rejected");

const ACCESS_TOKEN_KEY = "access_token";

const api = axios.create({ baseURL: API_BASE_URL });

// --- Request Interceptor ---
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = Cookies.get(ACCESS_TOKEN_KEY);

    // Normalize the request URL (path only)
    const url = config.url ?? "";

    // These endpoints are hit pre-authentication, so any stale cookie token
    // would be rejected rather than ignored by the backend.
    const isPublicEndpoint = PUBLIC_ENDPOINTS.includes(config.url ?? "");

    if (token && !isAuthEndpoint) {
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
    return Promise.reject(error);
  }
);

export default api;
