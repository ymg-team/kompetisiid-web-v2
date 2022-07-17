import fetchModule from "~/src/helpers/apiCaller";
import { objToQuery } from "string-manager";

export const fetchNews = (args = {}) => {
  const { query = {} } = args;
  const endpoint = `/v2/news?${objToQuery(query)}`;
  return fetchModule({
    endpoint,
    method: "get",
  });
};
