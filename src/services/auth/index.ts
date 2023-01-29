import fetchModule from "~/src/helpers/apiCaller";

/**
 * service to do login
 * @param {string} username
 * @param {string} password
 */
export const login = ({ username, password }: any) => {
  return fetchModule({
    endpoint: `/v2/login`,
    method: "post",
    jsonBody: {
      username,
      password,
    },
  });
};

/**
 * service to do register
 * @param {string} fullname
 * @param {string} username
 * @param {string} email
 * @param {string} phone
 * @param {string} password
 */
export const register = (params: any) => {
  return fetchModule({
    endpoint: "/v2/register",
    method: "post",
    jsonBody: params,
  });
};
