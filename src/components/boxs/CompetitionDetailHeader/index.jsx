import React from "react";
import { eventFire } from "@helpers/domEvents";
import { getCompetitionStatus } from "@helpers/dateTime";
import copy from "copy-to-clipboard";
import { CompetitionDetailHeaderStyled } from "./styled";

// components
import AddToCalendarModal from "@components/modals/AddToCalendar";
import Link from "next/link";
import BtnJoin from "@components/buttons/BtnJoin";
import { alert } from "@components/Alert";
import BtnLike from "@components/buttons/BtnLikeCompetition";
import Label from "@components/Label";
import Breadcrumb from "@components/navigations/Breadcrumb";
import WinnerBox from "@components/boxs/CompetitionWinner";

const hashtagGenerators = (tags) => {
  if (tags) {
    let hashtag = "";
    tags.split(",").map((n) => {
      // remove all whitespace on string
      hashtag += ` #${n.replace(/\s/gm, "")}`;
    });

    return `${hashtag}.`;
  } else {
    return null;
  }
};

const CompetitionDetailBox = ({ data, submissionFields }) => {
  const link_competition = `https://kompetisi.id/c/${data.id}`;

  const BreadcrumbData = [
    {
      title: "Home",
      link: "/",
    },
    {
      title: "Jelajah Kompetisi",
      link: "/browse?status=active",
    },
    {
      title: data.title,
      link: `/c/${data.id}`,
    },
  ];

  const { is_ended, is_waiting } = getCompetitionStatus(
    data.deadline_at,
    data.announcement_at
  );

  return (
    <CompetitionDetailHeaderStyled
      id="competition-detail"
      className="container"
    >
      <div className="row">
        <div className="row m-30" />

        <div className="col-md-12">
          <Breadcrumb breadcrumb={BreadcrumbData} />
        </div>

        <div className="col-md-12">
          <div className="competition-author">
            <Link
              href={`/user/${data.author.username}`}
              title={`ke profil ${data.author.username}`}
            >
              <a>
                <img
                  style={{ float: "left", marginRight: "10px" }}
                  src={
                    data.author.avatar.small ||
                    "/assets/4.2/img/avatar-default.jpg"
                  }
                />
              </a>
            </Link>
            <p>
              dipasang oleh{" "}
              <Link href={`/user/${data.author.username}`}>
                <a>{data.author.username}</a>
              </Link>
              <br />
              <small>
                {data.created_in} di{" "}
                <a href={`/browse/${data.main_category.name}`}>
                  <strong>{data.main_category.name}</strong>
                </a>
                ,
                <a
                  href={`/browse/${data.main_category.name}/${data.sub_category.name}`}
                >
                  <strong>{data.sub_category.name}</strong>
                </a>
              </small>
            </p>
          </div>

          <div className="row competition-detail--meta">
            <div className="col-sm-6 align-center poster competition-detail__left">
              <img
                data-mediabox="my-gallery-name"
                data-title="Sample image"
                alt={data.title}
                className="poster image-modal-target"
                src={data.poster.original}
              />
            </div>
            <div className="col-sm-6 count competition-detail__right">
              <div className="only-mobile m-30" />
              {/* competition status */}
              <div style={{ marginBottom: "20px" }}>
                {is_ended ? (
                  <Label type="red" size="large">
                    <i className="fa fa-check" /> Kompetisi telah berakhir
                  </Label>
                ) : null}

                {is_waiting ? (
                  <Label type="yellow" size="large">
                    <i className="fa fa-flag" /> Kompetisi sedang berlangsung
                  </Label>
                ) : null}
              </div>

              <div className="competition-detail--title">
                <h1>{data.title}</h1>

                <div className="m-20" />

                <p className="text-muted">
                  <span
                    className="small-stats-icon"
                    title="Penyelenggara kompetisi"
                  >
                    <i className="far fa-building" /> {data.organizer}
                  </span>{" "}
                  <span className="small-stats-icon" title="Total views">
                    <i className="far fa-eye" /> {data.stats.views || 0}
                  </span>
                  {data.is_manage_by_ki && (
                    <span className="small-stats-icon" title="Total joined">
                      <i className="fas fa-users" /> {data.stats.joined || 0}
                    </span>
                  )}
                </p>
                <div className="m-20" />
                <p>
                  {data.sort}
                  {hashtagGenerators(data.tag)}
                </p>
              </div>
              <div className="m-30" />

              {/* winner, only show if competition manage by ki and ended */}
              {data.is_manage_by_ki && is_ended && (
                <WinnerBox competition_id={data.id} />
              )}

              {/* end of winner */}

              {/* button to join competition */}
              <BtnJoin {...{ submissionFields }} competitionData={data} />
              {/* end of button to join competition */}

              {/* subscribe button */}
              {/* <BtnSubscribe
                authData={props.authData}
                dispatch={props.dispatch}
                data={data}
              /> */}
              {/* end if subscribe button */}

              {/* like button */}
              <BtnLike
                competition_id={data.id}
                isLiked={data.is_liked}
                total={data.stats.likes || 0}
              />
              {/* end of like button */}

              {/* more menus */}
              <div className="dropdown">
                <a
                  className="fa fa-ellipsis-h dropdown-button btn"
                  data-target="action-competition"
                  style={{ fontSize: 25, padding: "5px 10px" }}
                />
                <div className="dropdown-items" id="action-competition">
                  <ul>
                    <li>
                      <a
                        onClick={(e) => {
                          e.preventDefault();
                          modal("open", "save-to-calendar");
                        }}
                        href="#"
                        title="simpan ke kalender"
                      >
                        Tambahkan ke Kalender
                      </a>
                    </li>
                    <li>
                      <a
                        className="scopy-button"
                        onClick={(e) => {
                          e.preventDefault();
                          handleCopyLink(link_competition);
                        }}
                        href="#"
                      >
                        Copy Link Kompetisi
                      </a>
                    </li>
                    <li>
                      <a
                        className="scopy-button"
                        onClick={(e) => {
                          e.preventDefault();
                          handleCopyInstagramCaption(data);
                        }}
                        href="#"
                      >
                        Copy Instagram Caption
                      </a>
                    </li>
                    <li>
                      <a
                        target="_blank"
                        href={`https://docs.google.com/forms/d/e/1FAIpQLSdmsHkJdGctVkWYFhhLC10YYVbtNIi5IF8X0mbdd2DjS-N1eQ/viewform?entry.559533126=${link_competition}`}
                        rel="noreferrer noopener"
                      >
                        Laporkan Kompetisi
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              {/* end of more menus */}
            </div>
          </div>
        </div>
      </div>

      {/* modal save to calendar */}
      <AddToCalendarModal data={data} />
    </CompetitionDetailHeaderStyled>
  );
};

// function to handle copy link
function handleCopyLink(link) {
  // trigger to click body
  eventFire(document.getElementsByTagName("body")[0], "click");
  // copy
  copy(link);
  // alert if link has copied
  alert(true, "Link telah berhasil di copy.", "success");
}

// function to copy instagram caption
function handleCopyInstagramCaption(data) {
  // trigger to click body
  eventFire(document.getElementsByTagName("body")[0], "click");

  let hashtags = "";
  let mention = "";

  if (data.tag) {
    data.tag.split(",").map((n) => {
      hashtags += `#${n.replace(/ /g, "")} `;
    });
  }

  if (data.contacts && data.contacts.length > 0) {
    data.contacts.map((n) => {
      if (n.type == 4) {
        let username = n.value.replace("https://www.instagram.com/", "");
        username = username.replace("/", "");
        mention += `@${username}`;
      }
    });
  }

  const caption = `Ada Kompetisi nih "${data.title}" ${data.sort} kunjungi https://kompetisi.id/c/${data.id} ${hashtags} ${mention}`;

  copy(caption);

  alert(true, "Caption telah berhasil di copy.", "success");
}

export default CompetitionDetailBox;
