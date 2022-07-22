import React from "react";
import Link from "next/link";

const NewsAuthorCard = (props) => (
  <div className="author">
    <Link href={`/user/${props.data.username}`}>
      <a>
        <img
          className="avatar"
          src={props.data.avatar.small || "/assets/4.2/img/avatar-default.jpg"}
        />
        diposting oleh <strong>{props.data.username}</strong>
      </a>
    </Link>
    <br />
    <span className="text-muted">{props.data.moto || ""}</span>
  </div>
);

export default NewsAuthorCard;
