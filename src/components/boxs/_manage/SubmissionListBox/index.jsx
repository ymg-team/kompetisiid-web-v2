import React from "react";

// components
import SubmissionList from "@components/cards/_manage/SubmissionList";
import GlobalLoader from "@components/preloaders/GlobalLoader";

import { alert } from "@components/alert/Base";

const Now = new Date().getTime();

// services
import { withdrawCompetitionSubmission } from "@services/competition_submission";

const SubmissionListBox = ({
  setState,
  setSelectedSubmission,
  submissionData,
  reloadHandler,
  type,
}) => {
  // initial states
  const [loading, setLoading] = React.useState(false);

  const deleteHandler = async ({ id }) => {
    const accept = confirm(
      "Submission yang di hapus tidak bisa di kembalikan lagi!"
    );
    if (accept) {
      setLoading(true);
      const Response = await withdrawCompetitionSubmission({
        competition_submission_id: id,
      });

      setLoading(false);

      // do remove submission
      alert(
        true,
        Response.message,
        Response.status === 200 ? "success" : "error"
      );
      if (Response.status === 200) {
        reloadHandler();
      }
    }
  };

  const viewHandler = ({ id }) => {
    const selectedData = submissionData.data.submissions.find(
      (n) => n.id === id
    );
    if (selectedData) {
      setSelectedSubmission(selectedData.submission);
      setState("view");
    } else {
      alert(true, "Data submission tidak ditemukan", "error");
    }
  };

  return (
    <>
      {!submissionData.status || loading ? (
        <GlobalLoader />
      ) : submissionData.status === 200 ? (
        <>
          {submissionData.data.submissions.map((n) => {
            const isCompetitionEnded = Now > n.competition.deadline_at * 1000;

            return (
              <SubmissionList
                key={n.id}
                data={n}
                onView={viewHandler}
                onDelete={deleteHandler}
                {...{ isCompetitionEnded, type }}
              />
            );
          })}
        </>
      ) : (
        <p>{submissionData.message}</p>
      )}
    </>
  );
};

SubmissionListBox.defaultProps = {
  userData: {},
  competitionData: {},
  submissionData: {},
  isReadOnly: false,
  type: "competition-detail",
  reloadHandler: () => {},
};

export default SubmissionListBox;
