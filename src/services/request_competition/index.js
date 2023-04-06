import fetchModule from "~/src/helpers/apiCaller";
import { objToQuery } from "string-manager";

/**
 * service to fetch list request add competition
 */
export const fetchListRequestCompetition = async ({ query = {} }) => {
  return fetchModule({
    endpoint: `/v2/request?${objToQuery(query)}`,
    method: "get",
  });
};

/**
 * service to do action approve/reject competition
 */
export const actionRequestCompetition = async ({ payload = {}, id }) => {
  return fetchModule({
    endpoint: `/v2/request/action/${id}`,
    method: "put",
    jsonBody: payload,
  });
};
