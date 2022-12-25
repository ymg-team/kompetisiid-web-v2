import React from "react";
import Dynamic from "next/dynamic";
import { nl2br } from "../../helpers/string";
import { toCamelCase } from "string-manager";

// config
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
const { URL_KI_WEB } = publicRuntimeConfig;

// helpers
import { getSession } from "@helpers/cookies";

// services
import { fetchCompetitionById } from "@services/competition";

// components
import SEO from "@components/meta/SEO";
import Loading from "@components/preloaders/GlobalLoader";
import Tab from "@components/navigations/TabCompetition";
import CompetitionDetailBox from "@components/boxs/CompetitionDetail";
import CompetitionLoading from "@components/preloaders/CompetitionCardLoader";
import NextPrev from "@components/navigations/NextPrev";
import GAds from "@components/cards/GoogleAds";
import AlertBox from "@components/commons/AlertBox";
import { fetchCompetitionRelatedById } from "@services/competition";
import ErrorCard from "@components/cards/ErrorCard";

const CompetitionBox = Dynamic(import("@components/boxs/CompetitionBox"), {
  loading: CompetitionLoading,
});
const Contacts = Dynamic(import("@components/competition-detail/Contacts"), {
  loading: Loading,
});
const Share = Dynamic(import("@components/competition-detail/Share"), {
  loading: Loading,
});
const Announcements = Dynamic(
  import("@components/competition-detail/Announcements"),
  {
    loading: Loading,
  }
);
const Prizes = Dynamic(import("@components/competition-detail/Prizes"), {
  loading: Loading,
});
const Regulations = Dynamic(
  import("@components/competition-detail/Regulations"),
  {
    loading: Loading,
  }
);
const Discussions = Dynamic(
  import("@components/competition-detail/Discussions"),
  {
    loading: Loading,
  }
);
const Sidebar = Dynamic(import("@components/competition-detail/Sidebar"), {
  loading: Loading,
});
const Submission = Dynamic(
  import("@components/competition-detail/Submission"),
  {
    loading: Loading,
  }
);

const TabNumber = {
  prizes: 0,
  regulations: 1,
  announcements: 2,
  discussions: 3,
  contacts: 4,
  share: 5,
  submission: 6,
};

const AlertBoxData = {
  default: {
    type: "warning",
    title: "Perhatian",
    body: `Di kompetisi ini, <strong>Kompetisi Id </strong> hanya berlaku sebagai <strong>Media Publikasi</strong>. Jika ada pertanyaan lebih lanjut mengenai kompetisi ini silahkan sampaikan langsung ke kontak yang tersedia tab kontak.`,
  },
  mediaPartner: {
    type: "blue",
    body: `Di kompetisi ini, <strong>Kompetisi Id </strong> berlaku sebagai <strong>Media Partner</strong>, jika ada pertanyaan lebih lanjut mengenai kompetisi ini, bisa ditanyakan langsung ke penyelenggara atau melalui tab diskusi.`,
  },
  manage: {
    type: "blue",
    body: `Kompetisi ini bisa diikuti langsung di <strong>Kompetisi Id</strong>, silahkan login dan klik tombol "Join Kompetisi".`,
  },
};

const handleScroll = (e) => {
  if (typeof window !== "undefined") {
    const compEl = document.getElementById("competition-detail");

    if (compEl) {
      const afterScroll = compEl.offsetHeight + 40;
      const tabEl = document.getElementById("container-competition-tab");
      if (window.pageYOffset > afterScroll) {
        tabEl.classList.add("fixed");
        // joinEl.style.opacity = 1
      } else {
        tabEl.classList.remove("fixed");
        // joinEl.style.opacity = 0
      }
    }
  }
};

const CompetitionDetailPage = ({ encid, type, title, serverData }) => {
  // === initial refs ===
  const firstRender = React.useRef(true);

  // === initial states ===
  const [respCompetition, setRespCompetition] = React.useState(
    serverData.competitions || {}
  );
  const [respRelatedCompetition, setRelatedCompetition] = React.useState({});

  let NextPrevProps = {},
    helmetdata = {
      script: [],
    };

  // === initial memos ===

  // initial memos

  const Meta = React.useMemo(() => {
    let title, description, image, url, jsonLd;

    if (respCompetition.status === 200) {
      title = toCamelCase(`${type + " " || ""}${respCompetition.data.title}`);
      description = respCompetition.data.sort;
      image = respCompetition.data.poster.original;
      url = `${URL_KI_WEB}/competition/${
        respCompetition.data.id
      }/regulations/${respCompetition.data.nospace_title.toLowerCase()}`;
      jsonLd = generateJsonld(respCompetition.data, url);
    }

    return {
      title,
      description,
      url,
      image,
      jsonLd,
    };
  }, [respCompetition]);

  // save selected AlertBox data
  const selectedAlertBoxData = React.useMemo(() => {
    const { is_mediapartner, is_manage_by_ki } = respCompetition.data || {};

    return AlertBoxData[
      is_manage_by_ki ? "manage" : is_mediapartner ? "mediaPartner" : "default"
    ];
  }, [respCompetition.data]);

  const ActiveTab = React.useMemo(() => {
    return TabNumber[type] || 0;
  }, [type]);

  React.useEffect(() => {
    fetchData();
    fetchRelatedData();
  }, [encid]);

  React.useEffect(() => {
    if (respCompetition.data) {
      // componentDidMount
      if (typeof window !== "undefined") {
        addEventListener("scroll", handleScroll, true);
      }

      // called on componentWillUnmount
      return () => {
        removeEventListener("scroll", handleScroll, true);
      };
    }
  }, [respCompetition]);

  // === initial functions ===

  const fetchData = React.useCallback(async () => {
    if (firstRender.current) return (firstRender.current = false);
    setRespCompetition({});
    const Resp = await fetchCompetitionById({ id: encid });
    setRespCompetition(Resp);
  }, [encid]);

  const fetchRelatedData = React.useCallback(async () => {
    if (firstRender.current) return (firstRender.current = false);
    setRelatedCompetition({});
    const Resp = await fetchCompetitionRelatedById({ id: encid });
    setRelatedCompetition(Resp);
  }, [encid]);

  return (
    <>
      <div className="competition-detail">
        <SEO {...Meta} />

        {/* detail box competition */}
        {respCompetition.status ? (
          respCompetition.status === 200 ? (
            <>
              <CompetitionDetailBox
                activeTab={ActiveTab}
                data={respCompetition.data}
              />
              <Tab
                active={ActiveTab}
                data={respCompetition.data}
                link={helmetdata.url}
              />

              {/* GAds */}
              <div className="row">
                <div
                  className="col-md-12 align-center"
                  style={{ marginBottom: 30 }}
                >
                  <GAds
                    style={{ marginBottom: 0 }}
                    adClient="ca-pub-4468477322781117"
                    adSlot={9209398500}
                    timeout={1000}
                  />
                </div>
              </div>
              {/* end of GAds */}

              <div className="container">
                <div className="competition-detail--content">
                  <div className="col-md-10 col-md-push-1">
                    {selectedAlertBoxData && (
                      <AlertBox type={selectedAlertBoxData.type}>
                        <strong>Perhatian!&nbsp;</strong>
                        <span
                          dangerouslySetInnerHTML={{
                            __html: selectedAlertBoxData.body,
                          }}
                        />
                      </AlertBox>
                    )}

                    <div className="m-20" />

                    <div className="row">
                      <div className={"col-sm-8"}>
                        {(() => {
                          switch (ActiveTab) {
                            case 1:
                              return (
                                <Regulations
                                  {...{ encid }}
                                  nospace_title={respCompetition.data.nospace_title.toLowerCase()}
                                  link_source={respCompetition.data.link_source}
                                  tags={
                                    respCompetition.data.tag
                                      ? respCompetition.data.tag.split(",")
                                      : []
                                  }
                                  html={respCompetition.data.content}
                                />
                              );
                            case 0:
                              return (
                                <Prizes
                                  html={nl2br(
                                    respCompetition.data.prize.description
                                  )}
                                />
                              );
                            case 2:
                              return (
                                <Announcements
                                  data={
                                    respCompetition.data.announcement
                                      ? respCompetition.data.announcement
                                      : []
                                  }
                                />
                              );
                            case 3:
                              return <Discussions link={helmetdata.url} />;
                            case 4:
                              return (
                                <Contacts
                                  data={
                                    respCompetition.data.contacts
                                      ? respCompetition.data.contacts
                                      : []
                                  }
                                />
                              );
                            case 5:
                              return (
                                <Share
                                  title={respCompetition.data.title}
                                  desc={respCompetition.data.sort}
                                  link={helmetdata.url}
                                />
                              );
                            case 6:
                              return <Submission />;
                            default:
                              return null;
                          }
                        })()}
                      </div>

                      {/* show sidebar info */}
                      <Sidebar {...respCompetition} />
                      {/* end of show sidebar info */}
                    </div>
                  </div>
                </div>
              </div>

              {/*next prev*/}
              <NextPrev {...NextPrevProps} />
              {/* end of next prev */}
            </>
          ) : (
            <ErrorCard
              code={respCompetition.status}
              message={respCompetition.message}
            />
          )
        ) : (
          <Loading style={{ minHeight: 200 }} />
        )}
      </div>

      {/*related competitions*/}
      {respRelatedCompetition && respRelatedCompetition.status === 200 && (
        <>
          <div className="m-20 row" />
          <CompetitionBox
            subtitle={false}
            total={4}
            size="small"
            {...respRelatedCompetition}
          />
        </>
      )}
      {/* end of related competition */}
    </>
  );
};

function generateJsonld(n, url) {
  const now = new Date().getTime();
  const createdAt = new Date(n.created_at * 1000).toISOString();
  return `{
    "@context": "http://schema.org",
    "@type": "Event",
    "name": "${n.title.replace(/\"/g, "")}",
    "description": "${n.sort.replace(/\"/g, "")}",
    "startDate": "${createdAt}",
    "endDate": "${new Date(n.deadline_at * 1000).toISOString()}",
    "url": "${url.replace(/\"/g, "")}",
    "sameAs": "${n.link_source}",
    "eventAttendanceMode": "Online",
    "eventStatus": "${now > n.deadline_at * 1000 ? "Ongoing" : "End"}",
    "image": {
        "@type": "ImageObject",
        "url": "${n.poster.original}",
        "height": "500",
        "width": "500"
    },
    "organizer": {
      "@type": "Organization",
      "name": "${n.organizer.replace(/\"/g, "")}",
      "url": "${n.link_source}",
      "logo": {
          "@type": "ImageObject",
          "url": "https://res.cloudinary.com/dhjkktmal/image/upload/v1528851826/kompetisi-id/email_assets/icon-512x512.png",
          "height": "500",
          "width": "500"
      }
    },
    "location": {
      "@type": "Place",
      "name": "Indonesia",
      "address": "Indonesia"
      
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "IDR",
      "url": "${url.replace(/\"/g, "")}",
      "availability": "${n.link_source}",
      "validFrom": "${createdAt}"
    },
    "performers": "Warga Negara Indonesia"
  }`;
}

CompetitionDetailPage.getInitialProps = async (ctx) => {
  const { id, type, title } = ctx.query;

  let userKey = "";

  if (ctx.req) {
    const SessionData = getSession(ctx.req.cookies);
    userKey = SessionData.status === 200 ? SessionData.data.user_key : "";
  }

  const competitions = (await fetchCompetitionById({ id, userKey })) || {};

  return {
    encid: id,
    type,
    title,
    serverData: {
      competitions,
    },
  };
};

export default CompetitionDetailPage;
