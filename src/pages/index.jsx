// deps
import React from "react";
import Dynamic from "next/dynamic";

// import Script from "next/script";

// helpers
import { fetchCompetitions } from "~/src/services/competition";
import { fetchNews } from "~/src/services/news";

// components
import Link from "next/Link";
import HomeStyled from "./home/styled";
import EmptyLoading from "../components/preloaders/EmptyLoader";
import Loading from "../components/preloaders/GlobalLoader";
import NewsLoading from "../components/preloaders/NewsCardLoader";
import CompetitionLoading from "../components/preloaders/CompetitionCardLoader";
import SubHeaderHome from "../components/headers/HomeSubHeader";
import SubHeaderTitle from "../components/headers/SubHeader";
import GAds from "../components/cards/GoogleAds";
import AddCompetitionBox from "../components/boxs/AddCompetitionBox";
import Navbar from "../components/navigations/TransparentNavbar";
import Head from "next/head";

// split components
const NewsBox = Dynamic(import("../components/boxs/NewsBox"), {
  loading: () => <NewsLoading withContainer />,
});
const CompetitionBox = Dynamic(import("../components/boxs/CompetitionBox"), {
  loading: () => <CompetitionLoading withContainer />,
});
const MediapartnerBox = Dynamic(import("../components/boxs/MediapartnerBox"), {
  loading: Loading,
});
const MediaPartnerAds = Dynamic(import("../components/cards/MediaPartnerAds"), {
  loading: EmptyLoading,
});

const Home = ({ competitionPopular, competitionLatest }) => {
  // === initial states ===
  const [respCompPopular, setRespCompPopular] =
    React.useState(competitionPopular);
  const [respCompLatest, setRespCompLatest] = React.useState(competitionLatest);
  const [respCompMP, setRespCompMP] = React.useState({});
  const [respNews, setRespNews] = React.useState({});

  // === initial effects ===

  // componentDidMount
  React.useEffect(() => {
    doFetchCompMP();
    doFetchNews();
  }, []);

  // === initial functions ===

  const doFetchCompMP = async () => {
    if (!respCompMP.status) {
      const ResponseMP = await fetchCompetitions({
        query: { limit: 7, is_mediapartner: true },
      });
      setRespCompMP(ResponseMP);
    }
  };

  const doFetchNews = async () => {
    if (!respNews.status) {
      const ResponseNews = await fetchNews({
        query: { limit: 6 },
      });
      setRespNews(ResponseNews);
    }
  };

  return (
    <HomeStyled>
      <Head>
        <title>Kompetisi Id - Platform Kompetisi Online Indonesia</title>
        <script src="https://unpkg.com/@glidejs/glide@3.3.0/dist/glide.min.js" />
        <link
          rel="stylesheet"
          href="https://unpkg.com/@glidejs/glide@3.3.0/dist/css/glide.core.min.css"
        />
        <link
          rel="stylesheet"
          href="https://unpkg.com/@glidejs/glide@3.3.0/dist/css/glide.theme.min.css"
        />
      </Head>

      <Navbar />

      <div
        style={{ marginTop: 50, borderBottom: "1px solid #e4e4e4" }}
        className="m-b-50"
      >
        <SubHeaderTitle
          title="Kompetisi Id"
          text="Platform online kompetisi, selalu ada hadiah tiap hari di Kompetisi.id."
        />
      </div>
      <div className="col-md-12">
        <SubHeaderHome slider={respCompPopular} />
      </div>

      {/* competition */}
      <AddCompetitionBox />
      <div className="m-b-50" style={{ borderBottom: "1px solid #e4e4e4" }}>
        <SubHeaderTitle
          title="Kompetisi Baru"
          text="Ikuti beragam kompetisi disini sesuai dengan minat kamu."
        />
      </div>

      <div className="col-md-12">
        <GAds
          key={`ads_key`}
          adClient="ca-pub-4468477322781117"
          adSlot={5218613800}
          timeout={1000}
          adTest
        />
      </div>

      <CompetitionBox subtitle={false} {...respCompLatest} />

      <div className="row align-center">
        <Link href="/browse">
          <a className="btn btn-bordergray">JELAJAH KOMPETISI</a>
        </Link>
      </div>

      {/* media partners ads */}
      <div className="container">
        <div className="col-md-12">
          <MediaPartnerAds />
        </div>
      </div>

      {/* end of competition */}

      <div className="m-b-50" />

      {/* news */}
      <div className="m-b-50" style={{ borderBottom: "1px solid #e4e4e4" }}>
        <SubHeaderTitle
          title="Kabar Baru"
          text="Update dengan kabar baru seputar kompetisi di Indonesia."
        />
      </div>

      <NewsBox subtitle={false} {...respNews} />

      <div className="row align-center">
        <Link href="/news">
          <a className="btn btn-bordergray">KABAR BERIKUTNYA</a>
        </Link>
      </div>

      {/* media partners ads */}
      <div className="container">
        <div className="col-md-12">
          <MediaPartnerAds />
        </div>
      </div>

      {/* end of news */}

      <div className="m-b-50" />

      {/* media partner */}
      <MediapartnerBox {...respCompMP} />
    </HomeStyled>
  );
};

Home.getInitialProps = async (ctx) => {
  const competitionPopular = await fetchCompetitions({
    query: { limit: 7, is_popular: true, status: "active" },
  });
  const competitionLatest = await fetchCompetitions({
    query: { limit: 9, status: "active" },
  });
  // const newsLatest = await
  return {
    competitionPopular,
    competitionLatest,
  };
};

export default Home;