import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
const { URL_KI_WEB } = publicRuntimeConfig;

import sealMiddleware from "~/src/helpers/seal";

/**
 * function to fetch service
 */
const fetchModule = ({
  host = URL_KI_WEB,
  endpoint,
  method = "get",
  jsonBody = {},
  formData,
  headers = {},
}) => {
  return new Promise(async (resolve) => {
    if (typeof fetch !== "undefined") {
      // get session
      if (typeof window !== "undefined") {
        const Session = window.__STORE__.getState().Session;
        if (Session.status === 200) {
          headers["user_key"] = Session.data.user_key;
        }
      }

      // normalize method
      method = method.toUpperCase();

      // generate headers ars
      headers.Seal = sealMiddleware.generateSeal();

      if (!headers["Content-Type"]) {
        headers["Content-Type"] = "application/json";
      }

      //time to fetch to services
      let ReqParams = {
        method,
        cache: "no-cache",
        headers,
      };

      if (method !== "GET") {
        if (formData) {
          ReqParams.body = formData;
        } else {
          ReqParams.body = JSON.stringify(jsonBody);
        }
      }

      const Res = await fetch(`${host}${endpoint}`, ReqParams);
      const ResText = await Res.text();
      try {
        const ResJson = JSON.parse(ResText);
        return resolve(ResJson);
      } catch (e) {
        return resolve(ResText);
      }
    } else {
      // fetch api not available
      return resolve({
        status: "500",
        message: "Fetch function not supported",
      });
    }
  }).catch((err) => {
    console.log("ERROR REQ:", err);
  });
};

export default fetchModule;
