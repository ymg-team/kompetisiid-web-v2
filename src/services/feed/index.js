import fetchModule from "~/src/helpers/apiCaller";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
const { URL_KI_BE } = publicRuntimeConfig;

export const fetchFeedCompetition = () => {
  return fetchModule({
    host: URL_KI_BE,
    endpoint: "/v2/feed/competition",
  });
};

export const fetchFeedNews = () => {
  return fetchModule({
    host: URL_KI_BE,
    endpoint: "/v2/feed/news",
  });
};
