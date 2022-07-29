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
  headers = {},
}) => {
  return new Promise(async (resolve) => {
    if (typeof fetch !== "undefined") {
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

      if (method.toLowerCase() !== "get") {
        ReqParams.body = JSON.stringify(jsonBody);
      }
      const Res = await fetch(`${host}${endpoint}`, ReqParams);
      const ResText = await Res.text();

      try {
        const ResJson = await Res.json();
        resolve(ResJson);
      } catch (e) {
        resolve(ResText);
      }
    } else {
      // fetch api not available
      resolve({
        status: "500",
        message: "Fetch function not supported",
      });
    }
  }).catch((err) => {
    console.log("ERROR REQ:", err);
  });
};

export default fetchModule;
