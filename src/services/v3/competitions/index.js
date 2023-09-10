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

/**
 * service to add new competition
 */
export const createCompetition = (payload) => {
  return fetchModule({
    endpoint: `/v3/competitions`,
    method: "post",
    jsonBody: payload,
  });
};

/**
 * service to update new competition
 */
export const updateCompetition = (payload, competitionId) => {
  return fetchModule({
    endpoint: `/v3/competitions/${competitionId}`,
    method: "put",
    jsonBody: payload,
  });
};
