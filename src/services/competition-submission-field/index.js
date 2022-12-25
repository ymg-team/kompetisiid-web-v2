import fetchModule from "~/src/helpers/apiCaller";

export const fetchCompetitionSubmissionField = ({ competition_id }) => {
  return fetchModule({
    endpoint: `/v2/competition-submission-field/${competition_id}`,
    method: "get",
  });
};
