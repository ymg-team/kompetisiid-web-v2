import fetchModule from "~/src/helpers/apiCaller";

/**
 * service to fetch list of competition
 */
export const sendCompetition = ({ jsonBody }) => {
  return fetchModule({
    endpoint: "/v2/request/send",
    method: "post",
    jsonBody,
  });
};
