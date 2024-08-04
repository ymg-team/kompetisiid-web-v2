import { objToQuery } from "string-manager";
import fetchModule from "~/src/helpers/apiCaller";

/**
 * service to fetch related competition by id
 */
export const fetchListNews = ({ query }) => {
  return fetchModule({
    endpoint: `/v3/news?${objToQuery(query)}`,
    query,
  });
};

/**
 * service to fetch detail competition by id
 */
