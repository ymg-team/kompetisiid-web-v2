import fetchModule from "~/src/helpers/apiCaller";
import { objToQuery } from "string-manager";

/**
 * service to fetch list of competition
 */
export const fetchCompetitions = (args) => {
  const { query } = args;
  const endpoint = `/v2/competitions?${objToQuery(query)}`;
  return fetchModule({
    endpoint,
    method: "get",
  });
};

/**
 * service to fetch competition detail by id
 * @param {string} id
 */
export const fetchCompetitionById = ({ id }) => {
  return fetchModule({
    endpoint: `/v2/competition/${id}`,
    method: "get",
  });
};

/**
 * service to fetch related competition by id
 */
export const fetchCompetitionRelatedById = ({ id }) => {
  return fetchModule({
    endpoint: `/v2/competitions/related/${id}`,
    method: "get",
  });
};

/**
 * service to fetch list of competition categories
 */
export const fetchCompetitionCategories = () => {
  return fetchModule({
    endpoint: `/v2/maincategories`,
  });
};
