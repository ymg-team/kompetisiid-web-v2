import fetchModule from "~/src/helpers/apiCaller";
// import { objToQuery } from "string-manager";

interface SuperLoginArgs {
  username: string;
  password: string;
}

export const superLogin = (args: SuperLoginArgs) => {
  return fetchModule({
    endpoint: `/v2/login`,
    method: "POST",
    jsonBody: args,
  });
};
