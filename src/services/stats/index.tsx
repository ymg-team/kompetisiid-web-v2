import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
const { URL_KI_BE } = publicRuntimeConfig;

import fetchModule from "@helpers/apiCaller";

export const fetchStatsSuper = () => {
  return fetchModule({
    // host: URL_KI_BE,
    endpoint: "/v2/counter/super-sidebar",
  });
};
