import fetchModule from "~/src/helpers/apiCaller";

/**
 * service to fetch list of competition
 */
export const sendCompetition = ({ formData }) => {
  return fetchModule({
    endpoint: "/v2/request/send",
    method: "post",
    formData,
  });
};
