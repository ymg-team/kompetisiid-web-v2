import React from "react";
import Link from "next/link";

const NextPrev = (props) => {
  const { next, prev } = props;
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-10 col-md-push-1 m-t-b-20">
          <div className="competition-nextprev">
            <div
              className={`col-md-4 align-right ${prev ? "btn-nextprev" : ""}`}
            >
              {prev ? (
                <Link legacyBehavior href={prev.link}>
                  <a>
                    <h4>sebelumnya</h4>
                    {prev.title}
                  </a>
                </Link>
              ) : (
                <p />
              )}
            </div>
            <div className="col-md-4">
              <p />
            </div>
            <div
              className={`col-md-4 align-left ${next ? "btn-nextprev" : ""}`}
            >
              {next ? (
                <Link legacyBehavior href={next.link}>
                  <a>
                    <h4>berikutnya</h4>
                    {next.title}
                  </a>
                </Link>
              ) : (
                <p />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NextPrev;
