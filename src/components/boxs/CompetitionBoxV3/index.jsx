import React from "react";

// components
import GAds from "@components/cards/GoogleAds";
import Card from "@components/cards/CompetitionListCard";
import Loader from "@components/preloaders/CompetitionCardLoader";
import { toSlug } from "string-manager";

function generateList(size, n) {
  return n.map((n, key) => {
    // normalize from apiV3 to apiV2
    n = {
      ...n,
      ...{
        nospace_title: toSlug(n.title),
      },
    };

    if (key % 15 === 0 && key !== 0) {
      return [
        <div
          key={`ads_${key}`}
          className="col-md-12 align-center"
          style={{ margin: "0 0 40px", textAlign: "center" }}
        >
          <GAds
            key={`ads_${key}`}
            adSlot={2722581701}
            timeout={1000}
            // adTest={true}
          />
        </div>,
        <Card size={size} key={key} n={n} />,
      ];
    } else {
      return <Card size={size} key={key} n={n} />;
    }
  });
}

const CompetitionBoxV3 = (props) => {
  let { data, status, message, is_loading, subtitle, size, meta, style } =
    props;
  if (typeof subtitle == "undefined") subtitle = true;
  if (typeof size == "undefined") size = "large";

  return (
    <div id="competition-container">
      <div className="container">
        <div className="no-margin">
          {/* header total show competition */}
          {data?.competitions && status && subtitle ? (
            <div className="col-md-12">
              <br />
              menampilkan <strong>
                {" "}
                {data?.competitions.length || 0}
              </strong>{" "}
              dari <strong>{data.total > 5000 ? "banyak" : data.total}</strong>{" "}
              kompetisi
              <br />
            </div>
          ) : null}
          {subtitle && <div className="row m-10" />}
          {/* end of header total show competition */}

          {/* competition literation */}
          {status && data ? (
            !data?.competitions ? (
              <p className="text-muted align-center">
                Kompetisi Tidak Ditemukan
              </p>
            ) : (
              generateList(size, data.competitions)
            )
          ) : null}
          {/* end of competition literation */}

          {(is_loading || !status) && (
            <Loader size={props.size} total={props.total} />
          )}
        </div>
      </div>
    </div>
  );
};

export default CompetitionBoxV3;
