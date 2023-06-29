import Link from "next/link";

// components
import Loader from "../preloaders/GlobalLoader";
import MediaPartnerCard from "../cards/MediaPartner/index";
import { toSlug } from "string-manager/dist/modules/slug";

const MediaPartnerBox = (props) => {
  const { status, message, data } = props;
  return (
    <>
      <div className="col-md-8 col-md-push-2 col-lg-6 col-lg-push-3 no-padding">
        <div className="row">
          <div className="media-partner align-center">
            <h2 className="big-text">KI sebagai Media Partner</h2>
            <div style={{ paddingBottom: 20 }}>
              KI juga ikut berperan sebagai media partner berbagai kompetisi di
              Indonesia.{" "}
            </div>
          </div>
        </div>
        {status ? (
          status === 200 ? (
            <div className="row">
              {data.competitions.map((n) => {
                n.nospace_title = toSlug(n.title);
                n.author = {
                  username: n.user.username,
                  avatar: {
                    small: "",
                  },
                };
                return <MediaPartnerCard key={n.id} data={n} />;
              })}
            </div>
          ) : (
            <p className="text-muted">{message}</p>
          )
        ) : (
          <Loader />
        )}
      </div>
      <div className="col-md-12">
        <div className="col-md-8 col-md-push-2 col-lg-6 col-lg-push-3">
          <Link href={`/browse?is_mediapartner=1`}>
            <a
              className="btn btn-black btn-fullwidth"
              style={{ marginBottom: 40 }}
            >
              <strong>Selengkapnya</strong>
            </a>
          </Link>
        </div>
      </div>
    </>
  );
};

export default MediaPartnerBox;
