import React from "react";
import Styled from "styled-components";
import { connect } from "react-redux";
import { epochToRelativeTime } from "../../../helpers/dateTime";
import { Colors } from "~/src/config/style";
import * as RequestActions from "../../../pages/_super/requests/actions";
import swal from "sweetalert";

// components
import Label from "../../Label";

const RequestListStyled = Styled.div`
  .item {
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid ${Colors.softGray};
    float: left;
    width: 100%;

    h4 {
      margin: 0;
      padding: 0;
    }

    .item__thumbnails {
      float: left;
      width: 100px;
      height: 100px;
      background-size: contain;
      margin-right: 10px;
      background-repeat: no-repeat;
      background-position-x: center;
    }

    .item__right {
      float: left;
      width: calc(100% - 100px - 10px);
    }

  }
`;

function handleAction(accept = true, props) {
  swal({
    title: `${accept ? "Menerima" : "Menolak"} Permintaan`,
    text: "Tulis pesan yang ingin kamu sampaikan kepada pengirim",
    content: "input",
  }).then((value) => {
    if (value) {
      // redux action
      const params = {
        id: props.id,
        note: value,
        status: accept ? "posted" : "reject",
      };

      props.dispatch(RequestActions.actionRequest(params));
    }
  });
}

const RequestRow = (props) => {
  let labelType, labelText;
  switch (props.status) {
    case "posted":
      labelType = "green";
      labelText = "diterima";
      break;

    case "reject":
      labelType = "red";
      labelText = "ditolak";
      break;

    case "waiting":
    default:
      labelType = "yellow";
      labelText = "menunggu";
      break;
  }

  return (
    <RequestListStyled>
      <div className="item">
        <div
          onClick={() => {
            window.open(props.poster.original, "_blank");
          }}
          className="item__thumbnails"
          style={{ backgroundImage: `url(${props.poster.small})` }}
        />
        <div className="item__right">
          <h4>
            <a href={props.link} target="_blank">
              {props.title}
            </a>{" "}
          </h4>
          <p className="text-muted">
            Dipasang oleh <a href={`mailto:${props.email}`}>{props.email}</a>{" "}
            pada {epochToRelativeTime(props.created_at)}
            <br />
            {props.updated_at !== props.created_at
              ? `Kompetisi telah ${
                  props.status === "posted" ? "diterima" : "ditolak"
                } pada ${epochToRelativeTime(
                  props.updated_at
                )} dengan catatan "${props.note || "tidak ada"}"`
              : "Permintaan belum diproses"}
          </p>
          <Label text={labelText} type={labelType} />

          {/* action request */}
          {props.updated_at === props.created_at ? (
            <div className="item__action">
              <small>
                <a
                  style={{ color: Colors.mainGreen }}
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleAction(true, props);
                  }}
                >
                  {" "}
                  <span className="fas fa-check-circle" /> Terima Permintaan
                </a>{" "}
                <a
                  style={{ color: Colors.mainRed }}
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleAction(false, props);
                  }}
                >
                  {" "}
                  <span className="fas fa-times-circle" /> Tolak Permintaan
                </a>
              </small>
            </div>
          ) : null}
        </div>
      </div>
    </RequestListStyled>
  );
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapDispatchToProps)(RequestRow);
