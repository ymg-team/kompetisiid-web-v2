import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
const { URL_KI_BE } = publicRuntimeConfig;

import sealMiddleware from "~/src/helpers/seal";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "3mb", // Set desired value here
    },
  },
};

const IndexApi = async (req, res) => {
  const { query, headers = {}, body, files } = req;
  let { method } = req;
  const { seal } = headers;

  if (!seal) {
    return res.json({ status: 403, message: "Access Forbidden" });
  } else {
    // seal validation
    const { is_valid } = sealMiddleware.validate(seal);
    if (is_valid) {
      // normalize method
      method = method.toUpperCase();

      // const endpoint = `/${req.query.endpoint.join("/")}`;
      const endpoint = req.url.replace("/api", "");

      delete query.endpoint;

      const URL_TARGET = `${URL_KI_BE}${endpoint}`;

      let ReqArgs = {
        method,
        headers,
      };

      if (method !== "GET" && body) {
        ReqArgs.headers["Content-Type"] = "application/json";
        ReqArgs.body = JSON.stringify(body);
      }

      ReqArgs.headers.user_key = headers.userkey;

      console.log("reqargs", ReqArgs);

      const Res = await fetch(URL_TARGET, ReqArgs);
      const ResText = await Res.text();
      try {
        const ResJson = JSON.parse(ResText);
        return res.json(ResJson);
      } catch (e) {
        return res.send(ResText);
      }
    } else {
      return res.json({ status: 403, message: "Access Forbidden" });
    }
  }
};

export default IndexApi;
