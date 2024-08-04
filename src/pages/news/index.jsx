import React, { useRef } from "react";
import Dynamic from "next/dynamic";

// services
import { fetchListNews } from "@services/v3/news/index";

// components
import SEO from "@components/meta/SEO";
import Subheader from "@components/Subheader";
import NewsLoading from "@components/preloaders/NewsCardLoader";
import GAds from "@components/cards/GoogleAds";
import { useRouter } from "next/router";

const DEFAULT_REQ_QUERY_NEWS = {
  limit: 6,
  status: "published",
};

const Newsbox = Dynamic(import("@components/boxs/NewsBox"), {
  loading: () => <NewsLoading style={{ marginTop: "20px" }} withContainer />,
});

const NewsList = ({ tag, serverData = {} }) => {
  const Router = useRouter();

  // === initial refs ===
  const pageRef = useRef(1);

  // === initial states ===
  const [respNews, setRespNews] = React.useState(serverData.news || {});
  const [loading, setLoading] = React.useState(false);

  // === initial meta ===
  const Meta = React.useMemo(() => {
    let title = "Kabar Kompetisi";
    let description = "Kabar terbaru seputar kompetisi dari Kompetisi Id";

    const breadcrumb = [
      {
        link: "/",
        title: "Home",
      },
      {
        link: "/news",
        title: "Kabar",
      },
    ];

    if (tag) {
      title += ` berdasarkan tag "${tag}"`;
      description += ` berdasarkan tag "${tag}"`;
      breadcrumb.push({
        link: `/news?tag=${tag}`,
        title: `Tag: ${tag}`,
      });
    }

    return {
      title,
      description,
      breadcrumb,
    };
  }, [tag]);

  // === initial function ===

  const fetchDataMore = async () => {
    setLoading(true);

    const news = respNews?.data?.news || [];
    const nextPage = pageRef.current + 1;
    pageRef.current = nextPage;

    if (news && news?.length > 0) {
      const Res = await fetchListNews({
        query: {
          ...DEFAULT_REQ_QUERY_NEWS,
          ...Router.query,
          ...{ page: nextPage },
        },
      });

      // join currentResponse and newResponse
      const currResponse = { ...respNews };
      currResponse.status = Res.status;
      currResponse.message = Res.message;
      currResponse.data.total = Res.data.total;
      if (Res?.data?.news) {
        currResponse.data.news = [...currResponse.data.news, ...Res.data.news];
      }

      setRespNews(currResponse);

      setLoading(false);
    }
  };

  return (
    <div id="list-news">
      <SEO {...Meta} />

      <Subheader
        breadcrumb={Meta.breadcrumb}
        title={Meta.title}
        desc={Meta.description}
      />
      {/* Google Ads */}
      <div className="col-md-12 align-center">
        {/* GA channel news list */}
        <GAds
          adSlot={7348028908}
          timeout={1000}
          dataAdFormat="auto"
          dataFullWidthResponsive={true}
          style={{ marginBottom: 0 }}
        />
        {/* end of GA channel news list */}
      </div>
      {/* end of Google Ads */}
      <Newsbox {...respNews} />

      {!loading && respNews.status == 200 && (
        <div className="row align-center">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              fetchDataMore();
            }}
            className="btn btn-bordergray"
          >
            KABAR BERIKUTNYA
          </a>
        </div>
      )}
    </div>
  );
};

NewsList.getInitialProps = async (ctx) => {
  const { query = {} } = ctx || {};

  const ResponseNews = await fetchListNews({
    query: { ...query, ...DEFAULT_REQ_QUERY_NEWS },
  });

  return {
    tag: query.tag,
    serverData: {
      news: ResponseNews,
    },
  };
};

export default NewsList;
