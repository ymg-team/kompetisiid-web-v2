import React from "react";
import Link from "next/link";
import Styled from "styled-components";
import {
  epochToRelativeTime,
  getCompetitionStatus,
} from "../../helpers/dateTime";
import { nominalToText } from "../../helpers/number";
import { Colors } from "~/src/config/style";

// components
import Label from "../Label";

export const CardCompetitionStyled = Styled.div`
  .card-competition {
    border: 1px solid #FFF;
    margin-bottom: 50px;
    background-color: #FFF;

    &:hover {
      cursor: pointer;
      border: 1px solid #FFF;
      box-shadow: 1px 4px 4px ${Colors.softGray};
    }
    
    a {
      text-decoration: none;
    }

    .card-competition--inside {
      padding: 20px;
      h3 {
        font-weight: 500;
        margin: 10px 0 10px;
        height: 4.1em;
        overflow: hidden;
      }
      progress {
        width: 100%;
        margin: 20px 0;
        height: 5px;
        &[value] {
          -webkit-appearance: none;
          appearance: none;
          &::-webkit-progress-value {
            background-color: ${Colors.mainGreen};
          }
          &::-webkit-progress-bar {
            background-color: #eee;
            border-radius: 2px;
          }
        }
      }
      .types {
        min-height: 2em;
      }
      .meta > p {
        margin: 0;
      }
    } 

    progress.ended {
      &[value] {
          -webkit-appearance: none;
          appearance: none;
          &::-webkit-progress-value {
            background-color: ${Colors.mainRed};
          }
        }
    }  

    progress.waiting {
      &[value] {
          -webkit-appearance: none;
          appearance: none;
          &::-webkit-progress-value {
            background-color: ${Colors.mainYellow};
          }
        }
    }   

    .card-competition--poster {
      height: 200px;
      overflow: hidden;
      background-size: cover;
      background-position: center top;
      background-color: #f4f4f4;
      border-radius: 18px;
      img {
        max-width: 100%;
      }
    }

    .card-competition__author {
      display: flex;
      align-items: center;
      .card-competition__author__avatar {
        width: 40px;
        height: 40px;
        margin-right: 10px;
        img {
          border-radius: 50%;
          width: 40px;
          height: 40px;
        }
        
      }
    }
    

  }

  /* responsiveness */
  /* small */
  @media only screen and (max-width: 543px) {
    /* padding-left: 0 !important; */
    /* padding-right: 0 !important; */
    .card-competition { 
      .card-competition--inside { 
        padding: 20px 0;
      }
    }
  }

  /* medium screen */
  @media only screen and (min-width: 544px) and (max-width: 767px) {
    /* padding-left: 0 !important; */
    /* padding-right: 0 !important; */
    .card-competition { 
      .card-competition--inside { 
        padding: 20px 0;
      }
    }
  }
`;

const LabelEnd = () => (
  <div
    style={{
      position: "absolute",
      background: "#e64b3b",
      top: "85px",
      margin: 0,
      left: -58,
      marginLeft: "50%",
      padding: "10px",
      color: "#FFF",
      opacity: "1",
      fontWeight: "bold",
      textTransform: "uppercase",
      letterSpacing: "1.1px",
      zIndex: 1,
    }}
  >
    Berakhir
  </div>
);

const LabelDraft = () => (
  <div
    style={{
      position: "absolute",
      background: "#f4f4f4",
      top: "85px",
      margin: 0,
      left: -58,
      marginLeft: "50%",
      padding: "10px",
      color: "grey",
      opacity: "1",
      width: "25%",
      textAlign: "center",
      fontWeight: "bold",
      textTransform: "uppercase",
      letterSpacing: "1.1px",
      zIndex: 1,
    }}
  >
    draft
  </div>
);

const CompetitionListCard = (props) => {
  // convert today midnight timestamp to seconds ref "https://stackoverflow.com/questions/3894048/what-is-the-best-way-to-initialize-a-javascript-date-to-midnight?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
  const { n, size } = props;
  const { now, deadline_at, is_ended, is_waiting } = getCompetitionStatus(
    n.deadline_at,
    n.announcement_at
  );
  const target = `/competition/${n.id}/regulations/${n.nospace_title}`;

  return (
    <CardCompetitionStyled
      className={size === "large" ? "col-md-4 col-xs-6" : "col-md-3 col-xs-6"}
    >
      {n.is_draft ? <LabelDraft /> : is_ended ? <LabelEnd /> : null}
      <div
        style={{ opacity: n.is_draft || is_ended ? 0.5 : 1 }}
        className="card-competition"
      >
        <Link href={target}>
          <a>
            <div
              className="card-competition--poster"
              style={{ backgroundImage: `url(${n.poster.small})` }}
            />
          </a>
        </Link>
        <div className="card-competition--inside">
          <div className="categories">
            <Link href={`/browse/${n.main_category.name}`}>
              <a className="muted">{n.main_category.name}</a>
            </Link>
            ,&nbsp;
            <Link
              className="muted"
              href={`/browse/${n.main_category.name}/${n.sub_category.name}`}
            >
              <a>{n.sub_category.name}</a>
            </Link>
          </div>
          <Link href={target}>
            <a>
              <h3>{n.title}</h3>
            </a>
          </Link>
          <progress
            className={is_ended ? "ended" : is_waiting ? "waiting" : ""}
            value={setProgressBar(n.deadline_at)}
            max={100}
          />
          <div className="types">
            {n.is_garansi ? (
              <Label
                title="kompetisi sudah diverifikasi keberadaannya oleh kru KI"
                type="green"
              >
                Garansi
              </Label>
            ) : null}
            {n.is_mediapartner ? (
              <Label
                title="KI berlaku sebagai media partner di kompetisi ini"
                type="blue"
              >
                Media Partner
              </Label>
            ) : null}
            {n.is_manage_by_ki ? (
              <Label title="Kompetisi ini bisa diikuti melalui KI" type="blue">
                <i className="fa fa-check" />
              </Label>
            ) : null}
            {is_ended ? (
              <Label title="kompetisi ini telah berakhir" type="red">
                <i className="fa fa-times" />
              </Label>
            ) : null}
            {is_waiting ? (
              <Label title="Kompetisi ini sedang berlangsung" type="yellow">
                <i className="fa fa-flag" />
              </Label>
            ) : null}
          </div>
          {props.size != "small" ? (
            <div className="meta">
              <p>
                <strong>{nominalToText(n.prize.total)}</strong>
                &nbsp;total hadiah
              </p>

              {/* competition status */}
              {is_ended ? (
                <p>
                  <strong>Kompetisi telah berakhir</strong>
                </p>
              ) : null}

              {is_waiting ? (
                <p>
                  <strong>{epochToRelativeTime(n.announcement_at)}</strong>{" "}
                  Pengumuman
                </p>
              ) : null}

              {deadline_at > now ? (
                <p>
                  <strong>{epochToRelativeTime(n.deadline_at)}</strong> Deadline
                  Pendaftaran
                </p>
              ) : null}
              {/* end of competition status */}

              {deadline_at === now ? (
                <p>
                  <strong>hari ini</strong>{" "}
                  <span className="text-muted">Deadline</span>
                </p>
              ) : null}
            </div>
          ) : null}
          <br />
          {/* author */}
          <div className="card-competition__author">
            <Link href={`/user/${n.author.username}`}>
              <a className="card-competition__author__avatar">
                <img
                  src={
                    n.author.avatar.small ||
                    `/assets/4.2/img/avatar-default.jpg`
                  }
                  alt={`avatar ${n.author.username}`}
                />
              </a>
            </Link>
            <div style={{ lineHeight: "17px" }}>
              <small>
                Diposting&nbsp;
                <Link href={`/user/${n.author.username}`}>
                  <a>{n.author.username}</a>
                </Link>{" "}
                {epochToRelativeTime(n.created_at)}
                <br />
                penyelenggara {n.organizer} <br />
                {n.stats.views || 1} views &nbsp;•&nbsp;
                {n.stats.likes || 0} likes
              </small>
            </div>
          </div>
          {/* end of author */}
        </div>
      </div>
    </CardCompetitionStyled>
  );
};

export function setProgressBar(deadline) {
  let today, interval, progress;

  // set interval days
  today = new Date();
  interval = deadline * 1000 - today.getTime();
  interval = Math.ceil(interval / (1000 * 3600 * 24));

  //set progress precentage
  if (interval > 0 && interval <= 100) {
    progress = 100 - interval;
  } else if (interval > 100) {
    progress = 1;
  } else {
    progress = 100;
  }

  return progress;
}

export default CompetitionListCard;
