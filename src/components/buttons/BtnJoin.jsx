import React from "react";
import { useRouter } from "next/router";
import { getCompetitionStatus } from "@helpers/dateTime";
import { alert } from "@components/Alert";
import { epochToDMY } from "../../helpers/dateTime";

const BtnJoin = ({ competitionData, submissionFields }) => {
  const Router = useRouter();

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

      // competition is manage on KI
      if (competitionData.is_manage_by_ki) {
        // competition submission field not available
        if (!submissionFields.open_registration_at)
          return alert(
            true,
            "Penyelenggara belum membuat submission field",
            "error"
          );
        console.log(submissionFields);

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
        return Router.push(
          `/competition/${
            competitionData.id
          }/submission/${competitionData.nospace_title.toLowerCase()}`
        );
      } else {
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
          status.is_ended || status.is_waiting ? "btn-gray" : "btn-green"
        }`}
      >
        {status.is_ended || status.is_waiting
          ? "Pendaftaran Ditutup"
          : "Join Kompetisi"}
      </a>
    )
  );
};

export default BtnJoin;
