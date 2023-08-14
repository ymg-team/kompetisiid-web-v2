import React from "react";
import Link from "next/link";

const CompetitionTags = (props) => {
  return (
    <span>
      {props.tags ? (
        props.tags.map((n, key) => {
          return (
            <Link legacyBehavior href={`/browse/tag/${n.trim()}`} key={key}>
              <a className="btn btn-white">{n.trim()}</a>
            </Link>
          );
        })
      ) : (
        <small className="text-muted">tidak ada tags tersedia</small>
      )}
    </span>
  );
};

export default CompetitionTags;
