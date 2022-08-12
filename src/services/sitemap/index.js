import fetchModule from "~/src/helpers/apiCaller";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
const { URL_KI_BE } = publicRuntimeConfig;

export const fetchSitemapCompetition = () => {
  return fetchModule({
    host: URL_KI_BE,
    endpoint: "/v2/sitemap/competition",
  });
};

export const fetchSitemapNews = () => {
  return fetchModule({
    host: URL_KI_BE,
    endpoint: "/v2/sitemap/news",
  });
};
