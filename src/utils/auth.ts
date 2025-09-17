import Cookies from "js-cookie";
import * as jwt from "jsonwebtoken";
import { USER_ROLE } from "./enums";

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
export const getAccessToken = (): string => {
  return Cookies.get("access_token") || "";
};

export const checkIsLoggedIn = (): boolean => {
  return Boolean(getAccessToken());
};

export const setIsUserVerified = (verified: string): void => {
  Cookies.set("isVerified", verified);
};
export const getIsUserVerified = (): string => {
  return Cookies.get("isVerified") || "";
};

export const setIsUserActivated = (activated: string): void => {
  Cookies.set("isActivated", activated);
};
export const getIsUserActivated = (): boolean => {
  return Cookies.get("isActivated") === "true";
};

export const userIsAdmin = (): boolean => {
  const role = Cookies.get("role");
  return role === USER_ROLE.ADMIN;
};
