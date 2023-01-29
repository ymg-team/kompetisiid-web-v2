import React from "react";
import { truncate } from "string-manager";

// components
import MediaPartnerCardStyled from "./index.styled";
import Link from "next/link";

const MediaParnerCard = ({ data }) => {
  return (
    <MediaPartnerCardStyled
      key={data.id}
      className="card-mediapartner col-lg-12 col-xs-6"
    >
      <div
        className="thumbnails"
        style={{ backgroundImage: `url(${data.poster.small})` }}
      />
      <div className="details">
        <div className="categories">
          <Link href={`/browse/${data.main_category.name}`}>
            <a className="muted">{data.main_category.name}</a>
          </Link>
          ,&nbsp;
          <Link
            href={`/browse/${data.main_category.name}/${data.sub_category.name}`}
          >
            <a className="muted">{data.sub_category.name}</a>
          </Link>
        </div>
        <Link
          href={`/competition/${
            data.id
          }/regulations/${data.nospace_title.toLowerCase()}`}
        >
          <a>
            <h3>{data.title}</h3>
          </a>
        </Link>
        <small>
          Dipasang{" "}
          <Link href={`/user/${data.author.username}`}>
            <a>{data.author.username}</a>
          </Link>
        </small>
        <span className="hide-mobile">
          <br />
          <span>{truncate(data.sort, 300, "...")}</span>
        </span>
      </div>
    </MediaPartnerCardStyled>
  );
};

export default MediaParnerCard;
