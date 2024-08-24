import Cookies from "js-cookie";
import * as jwt from "jsonwebtoken";

export const verifyJWT = (access_token: string) => {
  try {
    let token = null;
    if (!access_token) token = getAccessToken();

    token = access_token;
    if (!token) return null;

    const payload = jwt.verify(token, getAccessToken());

    return payload;
  } catch {
    return null;
  }
};
export function setAccessToken(token: string) {
  Cookies.set("access_token", token);
  localStorage.setItem("access_token", token);
}
export function getAccessToken() {
  return Cookies.get("access_token") || "";
}
export function getAccessTokenSecret() {
  return "gap_access";
}

export function checkIsLoggedIn() {
  let access_token = getAccessToken();

  if (access_token) {
    return true;
  } else {
    return false;
  }
}
