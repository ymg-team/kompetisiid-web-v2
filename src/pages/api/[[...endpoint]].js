import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
const { URL_KI_BE } = publicRuntimeConfig;

import sealMiddleware from "~/src/helpers/seal";

import fetchModule from "~/src/helpers/apiCaller";
import { objToQuery } from "string-manager";

const IndexApi = async (req, res) => {
  const { method, query, headers } = req;
  const { seal } = headers;

  if (!seal) {
    return res.json({ status: 403, message: "Access Forbidden" });
  } else {
    // seal validation
    const { is_valid } = sealMiddleware.validate(seal);
    if (is_valid) {
      const endpoint = `/${req.query.endpoint.join("/")}`;

      delete query.endpoint;

      const ReqArgs = {
        host: URL_KI_BE,
        method,
        endpoint: `${endpoint}?${objToQuery(query || {})}`,
      };

      console.log("REQ LOG:", ReqArgs);

      const Response = await fetchModule(ReqArgs);
      return res.json(Response);
    } else {
      return res.json({ status: 403, message: "Access Forbidden" });
    }
  }
};

export default IndexApi;
