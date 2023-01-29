import fetchModule from "~/src/helpers/apiCaller";

export const fetchCompetitionWinners = ({ competition_id }) => {
  return fetchModule({
    endpoint: `/v2/competition-winners/${competition_id}`,
    method: "get",
  });
};
