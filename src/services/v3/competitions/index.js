import { objToQuery } from "string-manager";
import fetchModule from "~/src/helpers/apiCaller";

/**
 * service to fetch related competition by id
 */
export const fetchListCompetitions = ({ query }) => {
  return fetchModule({
    endpoint: `/v3/competitions?${objToQuery(query)}`,
    method: "get",
    query,
  });
};
