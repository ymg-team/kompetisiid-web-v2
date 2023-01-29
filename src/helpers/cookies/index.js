import Cookies from "js-cookie";
import JWT from "jsonwebtoken";

// config
import {
  COOKIES_CONF,
  COOKIES_NAME_SESSION,
  JWT_PRIVATE_KEY,
} from "@configs/cookies";

/**
 * function to get auth session
 * @return {Object}
 */
export const getSession = (serverCookies = {}) => {
  try {
    // ref: https://github.com/auth0/node-jsonwebtoken#jwtverifytoken-secretorpublickey-options-callback
    const Token =
      typeof window === "undefined"
        ? serverCookies[COOKIES_NAME_SESSION]
        : Cookies.get(COOKIES_NAME_SESSION);

    if (Token) {
      return JWT.verify(Token, JWT_PRIVATE_KEY) || {};
    } else {
      return {};
    }
  } catch (e) {
    console.error("Error Get Session", e);
    return {};
  }
};

/**
 * function to set auth session
 * @param {String} userData
 * @return
 */
export const setSession = (userData) => {
  // ref: https://github.com/auth0/node-jsonwebtoken#jwtsignpayload-secretorprivatekey-options-callback
  // Synchronous Sign with default (HMAC SHA256)
  const Token = JWT.sign(userData, JWT_PRIVATE_KEY);

  return Cookies.set(COOKIES_NAME_SESSION, Token, COOKIES_CONF);
};

/**
 * function to clear session
 */
export const clearSession = () => {
  return Cookies.remove(COOKIES_NAME_SESSION);
};
