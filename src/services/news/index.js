import fetchModule from "~/src/helpers/apiCaller";
import { objToQuery } from "string-manager";

/**
 * function to fetch news list
 * @param {*} args
 * @returns
 */
export const fetchNews = (args = {}) => {
  const { query = {} } = args;
  const endpoint = `/v2/news?${objToQuery(query)}`;
  return fetchModule({
    endpoint,
    method: "get",
  });
};

/**
 * function to fetch news detail
 * @param {string} id id of news
 */
export const fetchNewsDetail = ({ id }) => {
  return fetchModule({
    endpoint: `/v2/news/${id}`,
    method: "get",
  });
};
