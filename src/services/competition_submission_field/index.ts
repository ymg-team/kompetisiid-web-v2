import fetchModule from "~/src/helpers/apiCaller";

type fetchCompetitionSubmissionFieldType = {
  competition_id: string;
};

export const fetchCompetitionSubmissionField = ({
  competition_id,
}: fetchCompetitionSubmissionFieldType) => {
  return fetchModule({
    endpoint: `/v2/competition-submission-field/${competition_id}`,
    method: "get",
  });
};
