import React, { useEffect, useRef } from "react";
import Dynamic from "next/dynamic";
import Styled from "styled-components";
import { pushScript } from "@helpers/domEvents";
import { topLoading } from "@components/preloaders";
import { epochToRelativeTime } from "@helpers/dateTime";
import { textParser } from "@helpers/string";

import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
const { URL_KI_WEB } = publicRuntimeConfig;

// components
import Link from "next/link";
import Loading from "@components/preloaders/GlobalLoader";
// import Helmet from "@components/Helmet";
import Author from "@components/cards/NewsAuthorCard";
import ErrorCard from "@components/cards/ErrorCard";
import Preloader from "@components/preloaders/NewsDetail";
import GAds from "@components/cards/GoogleAds";
import Share from "@components/boxs/Share";
import Breadcrumb from "@components/navigations/Breadcrumb";

const NewsBox = Dynamic(import("@components/boxs/NewsBox"), {
  loading: Loading,
});

const NewsDetailStyled = Styled.div`

.breadcrumb {
  margin-top: 30px;
}

.news-detail {
  .image {
    padding: 0 15px;
  }
  .author {
    margin: 0 0 30px;
    a {
      text-decoration: none;
    }
    .avatar {
      width: 45px;
      float: left;
      margin: 0 10px 0 0;
    }
    .text-muted {
      display: flex;
    }
  }

  .image {
    text-align: center;
    margin: 20px auto;
    img {
      max-width: 100%;
      border-radius: 40px;
    }
  }

  .meta {
    letter-spacing: 0;
    .meta--item {
      margin-right: 20px;
    }
  }

  .content {
    letter-spacing: 0.8px;
    font-size: 1.1em;
    line-height: 1.7;
    iframe {
      display: block; 
      margin: 40px auto;
      width: 100%;
    }
    h1 {
      font-size: 3em;
      line-height: 1.2;
    }
    h2, h3, h4 {
      margin: 60px 0 20px;
    }
    p, ul > li, a {
      font-size: 1em;
    }
    img {
      text-align: center;
      margin: 40px auto;
      max-width: 100%;
      display: block;
    }
  }
}

.news-other {
  padding: 30px 0;
}
`;

// consts

const generateTags = (tags = []) => {
  tags = tags.split(",");
  if (tags && tags.length > 0) {
    return tags.map((n, key) => {
      return (
        <span key={key}>
          <Link className="btn btn-white" to={`/news/tag/${n}`}>
            {n}
          </Link>{" "}
        </span>
      );
    });
  }

  return null;
};

const NewsDetail = ({ encid, title }) => {
  // initial states
  const [respNews, setRespNews] = React.useState({});

  // initial memos

  const url = `${URL_KI_WEB}/news/${encid}/${title}`;

  const { encid, title } = props.match.params;

  const NewsData = props.berita.detail[encid] || {};

  const firstRender = useRef(true);

  // breadcrumb generator
  const BreadcrumbData = [
    {
      title: "Home",
      link: "/",
    },
    {
      title: "Kabar",
      link: "/news",
    },
  ];

  // function to reset disquss box after change url
  const resetDisquss = (props) => {
    const url = `${URL_KI_WEB}/news/${encid}/${title}`;

    setTimeout(() => {
      // disquss reset after 1000ms
      if (window.DISQUS)
        DISQUS.reset({
          reload: true,
          config: function () {
            this.page.identifier = url;
            this.page.url = url;
          },
        });

      // reset disqus count
      if (window.DISQUSWIDGETS) DISQUSWIDGETS.getCount({ reset: true });
    }, 1000);
  };

  // function to fetch new data
  const reqData = (props) => {
    const { encid } = props.match.params;
    const data = props.berita.NewsData || {};
    if (!data.status) {
      topLoading(true);
      props.dispatch(BeritaActions.fetchBeritaDetail(encid));
    }
  };

  // watch route changes
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    window.scrollTo(0, 0);
    resetDisquss(props);
    reqData(props);
  }, [encid]);

  // called on componentDidMount and componentWillUnmount
  useEffect(() => {
    // componentDidMount
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
      pushScript("https://kompetisiindonesia.disqus.com/embed.js");
      pushScript("https://kompetisiindonesia.disqus.com/count.js", {
        id: "dsq-count-scr",
      });

      // fetch data from api
      reqData(props);

      // get all image inside .competition-regulator
      setTimeout(() => {
        const ImgEl = document.querySelectorAll(".news-detail .content img");
        // ref: https://developer.mozilla.org/en-US/docs/Web/API/NodeList
        for (let n of ImgEl) {
          n.className = "image-modal-target";
        }
      }, 1000);
    }

    // componentWillUnmount
    return () => {};
  }, []);

  // helmet data generator
  let helmetdata = {
    title: "Kabar Kompetisi",
    description: "Kabar terbaru seputar kompetisi dari Kompetisi Id",
    url: `${URL_KI_WEB}/news/${encid}/${title}`,
    script: [],
  };

  if (NewsData.status && NewsData.status === 200) {
    BreadcrumbData.push({
      title: NewsData.data.title,
      link: `/news/${NewsData.data.id}/${NewsData.data.nospace_title}`,
    });

    helmetdata = Object.assign(helmetdata, {
      title: NewsData.data.title,
      description: NewsData.data.contenttext,
      url: `https://kompetisi.id/news/${NewsData.data.id}/${NewsData.data.nospace_title}`,
      image: NewsData.data.image.original,
    });

    //add jsonld
    helmetdata.script.push({
      type: "application/ld+json",
      innerHTML: generateJsonld(NewsData.data, helmetdata.url),
    });
  }
  // end of helmet data generator

  return (
    <NewsDetailStyled>
      {/* <Helmet {...helmetdata} /> */}

      {NewsData && NewsData.status ? (
        parseInt(NewsData.status) === 200 ? (
          <>
            <div className="col-md-6 col-md-push-3 col-md-pull-3">
              <div className="row">
                {/* breadcrumb */}
                <Breadcrumb breadcrumb={BreadcrumbData} />
                {/* end of breadcrumb */}

                {/* start news detail wrapper */}
                <div className="news-detail">
                  <Author data={NewsData.data.author} />
                  <article className="content">
                    <h1>{NewsData.data.title}</h1>
                    <p className="meta">
                      <span className="meta--item">
                        <i className="fa fa-calendar" />{" "}
                        {epochToRelativeTime(NewsData.data.created_at)}
                      </span>
                      <span className="meta--item">
                        <a
                          href="#"
                          title="komentar"
                          onClick={(e) => {
                            e.preventDefault();
                            document
                              .getElementById("disqus_thread")
                              .scrollIntoView({ behavior: "smooth" });
                          }}
                        >
                          <i className="far fa-comment" />{" "}
                          <span
                            className="disqus-comment-count"
                            data-disqus-url={url}
                          >
                            0
                          </span>
                        </a>
                      </span>
                    </p>
                  </article>
                </div>
              </div>
            </div>

            <div className="col-md-12">
              <>
                <div className="row">
                  <div className="news-detail">
                    <div className="image">
                      <figure>
                        <img
                          src={NewsData.data.image.original}
                          className="image-modal-target"
                        />
                      </figure>
                    </div>
                  </div>
                </div>
                {/* Google Ads */}
                <div className="col-md-12 align-center">
                  <GAds
                    style={{ marginTop: 0 }}
                    adClient="ca-pub-4468477322781117"
                    adSlot={1270681813}
                    timeout={1000}
                  />
                </div>
                {/* end of Google Ads */}
              </>
            </div>

            <div className="col-md-6 col-md-push-3 col-md-pull-3">
              <div className="row">
                <div className="news-detail">
                  <article
                    className="content"
                    dangerouslySetInnerHTML={{
                      __html: textParser(NewsData.data.content),
                    }}
                  />
                  <div style={{ margin: "50px 0 0" }}>
                    {generateTags(NewsData.data.tag)}
                  </div>
                </div>

                <br />

                {/* share button */}
                <Share url={url} />
                {/* end of share button */}

                <br />
              </div>
            </div>

            {/* related news */}
            <div className="col-md-12 no-padding">
              <NewsBox
                subtitle={false}
                data={NewsData.related}
                status={NewsData.status}
                size="small"
              />
            </div>
            {/* end of related news */}
          </>
        ) : (
          <ErrorCard code={NewsData.status} message={NewsData.message} />
        )
      ) : (
        <div className="fullheight">
          <Preloader />
        </div>
      )}
      {NewsData && NewsData.status && NewsData.is_loading ? (
        <Preloader />
      ) : null}
      {/* comment section */}
      <div
        style={{
          display:
            NewsData && NewsData.status && NewsData.status == 200
              ? "block"
              : "none",
        }}
        className="col-md-6 col-md-push-3 col-md-pull-3"
      >
        <div
          style={{ padding: "50px 0" }}
          className="row comments"
          id="disqus_thread"
        />
      </div>
      {/* end of comment section */}
    </NewsDetailStyled>
  );
};

function generateJsonld(n, url) {
  return `{
        "@context": "https://schema.org",
        "@type": "Article",
        "publisher": {
            "@type": "Organization",
            "name": "Id+More",
            "logo": {
                "@type": "ImageObject",
                "url": "https://res.cloudinary.com/dhjkktmal/image/upload/v1528851826/kompetisi-id/email_assets/icon-512x512.png",
                "height": "500",
                "width": "500"
            }
        },
        "author": {
            "@type": "Person",
            "name": "${n.author.username}",
            "image": "https://kompetisi.id/assets/4.2/img/avatar-default.jpg",
            "url": "https://kompetisi.id/user/${n.author.username}",
            "sameAs": [
                ""
            ],
            "description": "${n.author.moto}"
        },
        "headline": "${n.title}",
        "url": "${url}",
        "datePublished": "${new Date(n.created_at * 1000).toISOString()}",
        "dateModified": "${new Date(n.updated_at * 1000).toISOString()}",
        "image": {
            "@type": "ImageObject",
            "url": "${n.image.original}",
            "height": "500",
            "width": "500"
        },
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": "${url}"
        },
        "keywords": "${n.tag}",
        "description": "${n.title}"
    }`;
}

NewsDetail.getInitialProps = (ctx) => {
  const { query = {} } = ctx || {};

  return {
    encid: query.id,
    title: query.title,
  };
};

export default NewsDetail;
