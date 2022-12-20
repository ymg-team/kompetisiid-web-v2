import React from "react";
import Link from "next/link";
import { CardCompetitionStyled } from "./CompetitionListCard";
import { epochToRelativeTime } from "../../helpers/dateTime";

const LabelDraft = () => (
  <div
    style={{
      position: "absolute",
      background: "#f4f4f4",
      top: "85px",
      margin: "0 auto",
      padding: "10px",
      color: "grey",
      opacity: "1",
      width: "25%",
      textAlign: "center",
      left: "25%",
      marginLeft: "14%",
      fontWeight: "bold",
      textTransform: "uppercase",
      letterSpacing: "1.1px",
      zIndex: 1,
    }}
  >
    draft
  </div>
);

const NewsListCard = (props) => {
  const { n } = props;
  const target = `/news/${n.id}/${n.nospace_title}`;
  return (
    <CardCompetitionStyled
      className={
        props.size == "small" ? "col-md-3 col-xs-12" : "col-md-4 col-xs-12"
      }
    >
      <div
        className="card-competition"
        style={{ opacity: n.is_draft ? 0.5 : 1 }}
      >
        {n.is_draft ? <LabelDraft /> : null}
        <Link href={target}>
          <a>
            <div
              className="card-competition--poster"
              style={{
                backgroundImage: `url(${
                  n.image
                    ? n.image.small
                    : `/assets/4.2/img/slider/slider-2.png`
                })`,
              }}
            />
          </a>
        </Link>
        <div className="card-competition--inside">
          <Link href={target}>
            <a>
              <h3>{n.title}</h3>
            </a>
          </Link>
          <br />
          <Link href={`/user/${n.author.username}`}>
            <a className="card-competition__author">
              <img
                className="card-competition__author__avatar"
                src={
                  n.author.avatar.small || `/assets/4.2/img/avatar-default.jpg`
                }
                alt={`avatar ${n.author.username}`}
              />
              <div style={{ lineHeight: "17px" }}>
                <small>
                  oleh {n.author.username}
                  <br />
                  {epochToRelativeTime(n.created_at)}
                </small>
              </div>
            </a>
          </Link>
        </div>
      </div>
    </CardCompetitionStyled>
  );
};

export default NewsListCard;
