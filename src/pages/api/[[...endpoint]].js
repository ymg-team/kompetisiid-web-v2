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
  const { method, query, headers, body, files } = req;
  const { seal } = headers;

  if (!seal) {
    return res.json({ status: 403, message: "Access Forbidden" });
  } else {
    // seal validation
    const { is_valid } = sealMiddleware.validate(seal);
    if (is_valid) {
      // const endpoint = `/${req.query.endpoint.join("/")}`;
      const endpoint = req.url.replace("/api", "");

      delete query.endpoint;

      const URL_TARGET = `${URL_KI_BE}${endpoint}`;

      let headers = {};

      let ReqArgs = {
        method,
        headers,
      };

      if (method.toLowerCase() !== "get" && body) {
        ReqArgs.headers["Content-Type"] = "application/json";
        ReqArgs.body = JSON.stringify(body);
      }

      console.log(`REQ LOG: ${method} ${URL_TARGET}`);

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
