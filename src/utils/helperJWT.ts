import Cookies from "js-cookie";
import * as jwt from "jsonwebtoken";

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
  const accessToken = getAccessToken();

  return !!accessToken;
};

export const setIsUserVerified = (verified: string): void => {
  Cookies.set("isVerified", verified);
};
export const getIsUserVerified = (): string => {
  return Cookies.get("isVerified") || "";
};
