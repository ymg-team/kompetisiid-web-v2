import fetchModule from "~/src/helpers/apiCaller";
import { objToQuery } from "string-manager";

/**
 * service to fetch list of competition
 */
export const fetchDataCalendar = (args) => {
  const { query } = args;
  const endpoint = `/v2/competitions?${objToQuery(query)}`;
  return fetchModule({
    endpoint,
    method: "get",
  });
};
