import fetchModule from "~/src/helpers/apiCaller";

/**
 * service to do login
 * @param {string} username
 * @param {string} password
 */
export const login = ({ username, password }: any) => {
  const endpoint = `/v2/login`;
  return fetchModule({
    endpoint,
    method: "post",
    jsonBody: {
      username,
      password,
    },
  });
};
