import React from "react";

// components
import SubmissionList from "@components/cards/_manage/SubmissionList";
import GlobalLoader from "@components/preloaders/GlobalLoader";
import Button from "@components/buttons";

import { alert } from "@components/alert/Base";

// services
import {
  fetchCompetitionSubmission,
  withdrawCompetitionSubmission,
} from "@services/competition_submission";

const SubmissionListBox = ({
  userData,
  submissionFields,
  setState,
  setSelectedSubmission,
  competitionData,
}) => {
  // initial states
  const [response, setResponse] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  // initial memos
  const isDisabledCreateSubmission = React.useMemo(() => {
    return (
      (response?.data?.submissions?.length > 0 &&
        submissionFields?.submit_type === "single") ||
      loading
    );
  }, [response, submissionFields, loading]);

  const isCompetitionEnded = React.useMemo(() => {
    const Now = new Date().getTime();
    const Deadline = competitionData.deadline_at * 1000;

    return Now > Deadline;
  }, [competitionData]);

  // initial effects
  React.useEffect(() => {
    if (userData?.data?.user_key && submissionFields?.id) {
      fetchSubmission();
    }
  }, [userData, submissionFields]);

  // initial functions
  const fetchSubmission = async () => {
    setLoading(true);
    const Response = await fetchCompetitionSubmission({
      competition_submission_fields_id: submissionFields.id,
    });
    setResponse(Response);
    setLoading(false);
  };

  const deleteHandler = async ({ id }) => {
    const accept = confirm(
      "Submission yang di hapus tidak bisa di kembalikan lagi!"
    );
    if (accept) {
      setLoading(true);
      const Response = await withdrawCompetitionSubmission({
        competition_submission_id: id,
      });

      // do remove submission
      alert(
        true,
        Response.message,
        Response.status === 200 ? "success" : "error"
      );
      if (Response.status === 200) {
        fetchSubmission();
      } else {
        setLoading(false);
      }
    }
  };

  const viewHandler = ({ id }) => {
    const selectedData = response.data.submissions.find((n) => n.id === id);
    if (selectedData) {
      setSelectedSubmission(selectedData.submission);
      setState("view");
    } else {
      alert(true, "Data submission tidak ditemukan", "error");
    }
  };

  return (
    <>
      {!response.status || loading ? (
        <GlobalLoader />
      ) : response.status === 200 ? (
        <>
          {response.data.submissions.map((n) => (
            <SubmissionList
              key={n.id}
              data={n}
              onView={viewHandler}
              onDelete={deleteHandler}
              {...{ isCompetitionEnded }}
            />
          ))}
        </>
      ) : (
        <p>{response.message}</p>
      )}

      {!isCompetitionEnded && (
        <Button
          disabled={isDisabledCreateSubmission}
          onClick={() => setState("create")}
          text="Submission Baru"
          size="large"
          fullWidth
        />
      )}
    </>
  );
};

SubmissionListBox.defaultProps = {
  userData: {},
  competitionData: {},
  submissionData: {},
};

export default SubmissionListBox;
