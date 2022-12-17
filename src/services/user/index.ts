import fetchModule from "~/src/helpers/apiCaller";

export const fetchUserDetail = (username: any) => {
  return fetchModule({
    endpoint: `/v2/user/${username}`,
    method: "get",
  });
};
