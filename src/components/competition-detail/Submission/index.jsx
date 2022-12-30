import React from "react";

// helpers
import { setStorage } from "@helpers/localStorage";
import { epochToDMY } from "@helpers/dateTime";

// components
import Loading from "@components/preloaders/GlobalLoader";
import HeaderDashboard from "@components/headers/HeaderDashboard";
import Spacer from "@components/boxs/Spacer";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import Dynamic from "next/dynamic";

const SubmissionListBox = Dynamic(
  () => import("@components/boxs/_manage/SubmissionListBox"),
  {
    loading: Loading,
  }
);
const SubmissionForm = Dynamic(
  () => import("@components/fields/_manage/SubmissionForm"),
  {
    loading: Loading,
  }
);

const SubmissionCompetition = ({ submissionFields, competitionData }) => {
  // initial global
  const Router = useRouter();
  const Session = useSelector((state) => state.Session || {});

  // initial states

  // current state, one of "list" | "create" | "edit", use this because not use custom page
  const [state, setState] = React.useState("list");
  const [selectedSubmission, setSelectedSubmission] = React.useState({});

  const loginRegisterHandler = React.useCallback(
    (e, href) => {
      e.preventDefault();
      // save current path to history after login
      setStorage("history_back", Router.asPath);
      Router.push(href);
    },
    [Session, Router]
  );

  return (
    <div id="competition-submission">
      <Spacer size="medium" />
      <HeaderDashboard
        title="Kompetisi Submission"
        text='Siap mengikuti kompeisi, yuk submit disini, setiap kamu melakukan submission, status akan menjadi "checking" untuk di cek ulang oleh panitia. '
      />

      {Session.status !== 200 ? (
        <p>
          {/* user not success login */}
          Silahkan{" "}
          <a
            href="#"
            data-target="/login"
            onClick={(e) => loginRegisterHandler(e, "/login")}
          >
            <strong>Login</strong>
          </a>{" "}
          /{" "}
          <a
            href="#"
            data-target="/register"
            onClick={(e) => loginRegisterHandler(e, "/register")}
          >
            <strong>Register</strong>
          </a>
          &nbsp; terlebih dahulu untuk mengikuti kompetisi ini.
        </p>
      ) : (
        <>
          {submissionFields.open_registration_at ? (
            <>
              {new Date().getTime() <
              submissionFields.open_registration_at * 1000 ? (
                <p className="text-muted">{`Pendaftaran belum dibuka. Silahkan melakukan pendaftaran pada ${epochToDMY(
                  submissionFields.open_registration_at * 1000
                )}`}</p>
              ) : (
                <>
                  {state === "list" && (
                    <SubmissionListBox
                      userData={Session}
                      {...{
                        setState,
                        setSelectedSubmission,
                        submissionFields,
                        competitionData,
                      }}
                    />
                  )}
                  {(state === "create" || state === "view") && (
                    <SubmissionForm
                      onBack={() => setState("list")}
                      userData={Session}
                      submissionData={selectedSubmission}
                      {...{ submissionFields, state }}
                    />
                  )}
                </>
              )}
            </>
          ) : (
            <p className="text-muted">
              Penyelenggara belum membuat field submission, silahkan kunjungi
              beberapa saat lagi.
            </p>
          )}
        </>
      )}
    </div>
  );
};

SubmissionCompetition.defaultProps = {
  submissionFields: {},
  competitionData: {},
};

export default SubmissionCompetition;
