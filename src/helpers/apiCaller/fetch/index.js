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
}) => {
  return new Promise(async (resolve) => {
    if (typeof fetch !== "undefined") {
      let headers = {
        "Content-Type": "application/json",
        Seal: sealMiddleware.generateSeal(),
      };

      //time to fetch to services
      let ReqParams = {
        method,
        cache: "no-cache",
        headers,
      };

      if (method.toLowerCase() !== "get") {
        ReqParams.body = JSON.stringify(jsonBody);
      }
      const Req = await fetch(`${host}${endpoint}`, ReqParams);
      const ResJson = await Req.json();

      resolve(ResJson);
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
