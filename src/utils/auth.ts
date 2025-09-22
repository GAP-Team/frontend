import Cookies from "js-cookie";
import * as jwt from "jsonwebtoken";
import { USER_ROLE } from "./enums";
import { ROUTES } from "@/utils/routes";

export const verifyJWT = (accessToken: string): any => {
  try {
    let token = null;
    if (!accessToken) token = getAccessToken();

    token = accessToken;
    if (!token) return null;

    const payload = jwt.verify(token, getAccessToken());

    return payload;
  } catch {
    return null;
  }
};
export const setAccessToken = (token: string): void => {
  Cookies.set("access_token", token);
  localStorage.setItem("access_token", token);
};

export const setUserAuthData = (token: string, user: any): void => {
  setAccessToken(token);
  setUserRole(user?.role || "");
  setIsUserVerified(user?.isVerified ? "true" : "false");
  setIsUserActivated(user?.isActive ? "true" : "false");
};
export const getAccessToken = (): string => {
  return Cookies.get("access_token") || "";
};

export const checkIsLoggedIn = (): boolean => {
  return Boolean(getAccessToken());
};

export const setIsUserVerified = (verified: string): void => {
  Cookies.set("isVerified", verified);
};
export const getIsUserVerified = (): boolean => {
  return Cookies.get("isVerified") === "true";
};

export const setIsUserActivated = (activated: string): void => {
  Cookies.set("isActivated", activated);
};
export const getIsUserActivated = (): boolean => {
  return Cookies.get("isActivated") === "true";
};

export const setUserRole = (role: string): void => {
  Cookies.set("role", role);
};

export const getUserRole = (): string => {
  return Cookies.get("role") || "";
};

export const userIsAdmin = (): boolean => {
  const role = getUserRole();
  return role === USER_ROLE.ADMIN;
};

export const getUserDashboard = (): string => {
  const role = getUserRole();
  switch (role) {
    case USER_ROLE.ADMIN:
      return ROUTES.ADMIN.DASHBOARD;
    case USER_ROLE.SERVICE_PROVIDER:
      return ROUTES.SERVICE_PROVIDER.DASHBOARD;
    case USER_ROLE.REAL_ESTATE_OWNER:
      return ROUTES.REAL_ESTATE.DASHBOARD;
    default:
      return ROUTES.REAL_ESTATE.DASHBOARD;
  }
};

export const clearAuthData = (): void => {
  Cookies.remove("access_token");
  Cookies.remove("isVerified");
  Cookies.remove("isActivated");
  Cookies.remove("role");
  localStorage.removeItem("access_token");
};
