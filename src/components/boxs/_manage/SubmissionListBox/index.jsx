// components
import SubmissionList from "@components/cards/_manage/SubmissionList";
import GlobalLoader from "@components/preloaders/GlobalLoader";

const SubmissionListBox = ({ competitionData, userData, submissionData }) => {
  return (
    <>
      {!submissionData.status && <GlobalLoader />}
      <SubmissionList />
    </>
  );
};

SubmissionListBox.defaultProps = {
  userData: {},
  competitionData: {},
  submissionData: {},
};

export default SubmissionListBox;
