import fetchModule from "~/src/helpers/apiCaller";

/**
 * function to get competition submission
 */
export const fetchCompetitionSubmission = ({
  competition_submission_fields_id,
}) => {
  return fetchModule({
    endpoint: `/v2/competition-submissions/${competition_submission_fields_id}`,
    method: "get",
  });
};

/**
 * function to submition competition submission
 */
export const submitCompetitionSubmission = (fields) => {
  return fetchModule({
    endpoint: `/v2/competition-submissions/${fields.competition_submission_fields_id}`,
    method: "post",
    jsonBody: fields,
  });
};

/**
 * function to withdraw competition submission
 */
export const withdrawCompetitionSubmission = ({
  competition_submission_id,
}) => {
  return fetchModule({
    endpoint: `/v2/competition-submission/${competition_submission_id}`,
    method: "delete",
  });
};
