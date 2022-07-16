import fetchModule from "~/src/helpers/apiCaller";
import { objToQuery } from "string-manager";

export const fetchCompetitions = (args = {}) => {
  const { query } = args;
  const endpoint = `/v2/competitions?${objToQuery(query)}`;
  return fetchModule({
    endpoint,
    method: "get",
  });
};
