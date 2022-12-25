import React from "react";
import { useRouter } from "next/router";
import { getCompetitionStatus } from "@helpers/dateTime";
import { alert } from "@components/Alert";

const BtnJoin = ({ data }) => {
  const Router = useRouter();
  const status = React.useMemo(() => {
    return getCompetitionStatus(data.deadline_at, data.announcement_at);
  }, [data]);

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
      if (data.is_manage_by_ki) {
        return Router.push(
          `/competition/${
            data.id
          }/submission/${data.nospace_title.toLowerCase()}`
        );
      } else {
        return window.open(data.link_join);
      }
    },
    [data]
  );

  return (
    (data.link_join || data.is_manage_by_ki) && (
      <a
        id={data.id}
        style={{ marginRight: "10px" }}
        onClick={joinBtnHandler}
        href="#"
        // href={is_ended || is_waiting ? "#" : data.link_join}
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
