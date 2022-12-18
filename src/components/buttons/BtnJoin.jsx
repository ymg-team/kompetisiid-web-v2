import React from "react";
import { getCompetitionStatus } from "../../helpers/dateTime";
import { alert } from "../Alert";

const BtnJoin = (props) => {
  const { is_ended, is_waiting } = getCompetitionStatus(
    props.data.deadline_at,
    props.data.announcement_at
  );
  return (
    (props.data.link_join || is_ended || is_waiting) && (
      <a
        id={props.id}
        style={{ marginRight: "10px" }}
        onClick={(e) => {
          if (is_ended || is_waiting) {
            e.preventDefault();
            alert(true, "Pendaftaran sudah ditutup", "error");
          }
        }}
        href={is_ended || is_waiting ? "#" : props.data.link_join}
        target="_blank"
        rel="noreferrer noopener"
        className={`btn btn-join btn-lg ${
          is_ended || is_waiting ? "btn-gray" : "btn-green"
        }`}
      >
        {is_ended || is_waiting ? "Pendaftaran Ditutup" : "Ikuti Kompetisi"}
      </a>
    )
  );
};

export default BtnJoin;
