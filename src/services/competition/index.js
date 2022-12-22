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
export const fetchCompetitionById = ({ id, userKey }) => {
  return fetchModule({
    endpoint: `/v2/competition/${id}`,
    method: "get",
    userKey,
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

/**
 * service to like competition by logged in user
 * @param {string} competition_id
 */
export const likeDislikeCompetition = ({ competition_id }) => {
  return fetchModule({
    endpoint: `/v2/competition/like/${competition_id}`,
    method: "POST",
  });
};
