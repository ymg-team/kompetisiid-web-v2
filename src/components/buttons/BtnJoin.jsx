import React from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { alert } from "@components/alert/Base";

// helpers
import { setStorage } from "@helpers/localStorage";
import { epochToDMY } from "@helpers/dateTime";
import { getCompetitionStatus } from "@helpers/dateTime";

const BtnJoin = ({ competitionData, submissionFields }) => {
  const Router = useRouter();
  const Session = useSelector((State) => State.Session);

  // competition status generator
  const status = React.useMemo(() => {
    return getCompetitionStatus(
      competitionData.deadline_at,
      competitionData.announcement_at
    );
  }, [competitionData]);

  /**
   * @return function to handling on btn join
   */
  const joinBtnHandler = React.useCallback(
    (e) => {
      e.preventDefault();

      // check is ended or is on progress
      if (status.is_ended || status.is_waiting) {
        return alert(true, "Pendaftaran sudah ditutup", "error");
      }

      if (competitionData.is_manage_by_ki) {
        const submissionPage = `/competition/${
          competitionData.id
        }/submission/${competitionData.nospace_title.toLowerCase()}#competition-submission`;

        // competition is manage by ki

        // check is login or not
        if (Session.status !== 200) {
          // save submission page as back history
          setStorage("history_back", Router.asPath);

          // redirect to login page
          Router.push("/login");
          return alert(
            true,
            "Silahkan login Terlebih Dahulu untuk mengikuti kompetisi ini",
            "error"
          );
        }

        // competition submission field not available
        if (!submissionFields.open_registration_at)
          return alert(
            true,
            "Penyelenggara belum membuat submission field",
            "error"
          );

        // check is registration open
        const openRegistrationAtToMs =
          submissionFields.open_registration_at * 1000;
        if (new Date().getTime() < openRegistrationAtToMs) {
          const openRegDate = epochToDMY(openRegistrationAtToMs);
          return alert(
            true,
            `Pendaftaran belum dibuka. Silahkan melakukan pendaftaran pada ${openRegDate}`,
            "error"
          );
        }

        // registration already open
        return Router.push(submissionPage);
      } else {
        // competition not manage by ki
        return window.open(competitionData.link_join);
      }
    },
    [competitionData, submissionFields]
  );

  return (
    (competitionData.link_join || competitionData.is_manage_by_ki) && (
      <a
        id={competitionData.id}
        style={{ marginRight: "10px" }}
        onClick={joinBtnHandler}
        href="#"
        // href={is_ended || is_waiting ? "#" : competitionData.link_join}
        target="_blank"
        rel="noreferrer noopener"
        className={`btn btn-join btn-lg ${
          status.is_closed ? "btn-gray" : "btn-green"
        }`}
      >
        {status.is_closed ? "Pendaftaran Ditutup" : "Join Kompetisi"}
      </a>
    )
  );
};

export default BtnJoin;
