// deps
import React from "react";
import Dynamic from "next/dynamic";

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

// actions and store
// import { fetchJelajah } from "../competition/actions";
// import { fetchBerita } from "../news/actions";

const Home = (props) => {
  // initial states
  const [respCompStats, setRespCompStats] = React.useState({});
  const [respCompPopular, setRespCompPopular] = React.useState({});
  const [respCompLatest, setRespCompLatest] = React.useState({});
  const [respCompMP, setRespCompMP] = React.useState({});
  const [respNews, setRespNews] = React.useState({});

  // called on first render like componentDidMount
  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     window.scroll(0, 0)

  //     const competition_popular = kompetisi.data.home_popular || {}
  //     const competition_latest = kompetisi.data.home_latest || {}
  //     const competition_mp = kompetisi.data.home_mediapartner || {}
  //     const news_latest = berita.data.home_latest || {}

  //     // get popular competition
  //     if (!competition_popular.status)
  //       props.dispatch(
  //         fetchJelajah(
  //           { limit: 7, is_popular: true, status: "active" },
  //           "home_popular"
  //         )
  //       )

  //     // get lattest 9 active competition
  //     if (!competition_latest.status)
  //       props.dispatch(
  //         fetchJelajah({ limit: 9, status: "active" }, "home_latest")
  //       )

  //     // get lattest 7 media partner
  //     if (!competition_mp.status)
  //       props.dispatch(
  //         fetchJelajah({ limit: 7, is_mediapartner: true }, "home_mediapartner")
  //       )

  //     // get lattest 6 news
  //     if (!news_latest.status)
  //       props.dispatch(fetchBerita({ limit: 6 }, "home_latest"))
  //   }
  // }, [])

  return (
    <HomeStyled>
      {/* <Helmet
        script={[
          {
            src: "https://unpkg.com/@glidejs/glide@3.3.0/dist/glide.min.js",
            type: "text/javascript",
          },
        ]}
        link={[
          {
            href: "https://unpkg.com/@glidejs/glide@3.3.0/dist/css/glide.core.min.css",
            rel: "stylesheet",
            type: "text/css",
          },
          {
            href: "https://unpkg.com/@glidejs/glide@3.3.0/dist/css/glide.theme.min.css",
            rel: "stylesheet",
            type: "text/css",
          },
        ]}
      /> */}
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
        <SubHeaderHome stats={respCompStats} slider={respCompPopular} />
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

      <NewsBox subtitle={false} {...setRespNews} />

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

// Home.fetchData = ({ store, params, query }) => {
//   const promises = [
//     store.dispatch(
//       fetchJelajah(
//         { limit: 7, is_popular: true, status: "active" },
//         "home_popular"
//       )
//     ),
//     store.dispatch(fetchJelajah({ limit: 9, status: "active" }, "home_latest")),
//     store.dispatch(fetchBerita({ limit: 6 }, "home_latest")),
//     store.dispatch(
//       fetchJelajah({ limit: 7, is_mediapartner: true }, "home_mediapartner")
//     ),
//   ];
//   return Promise.all(promises);
// };

export default Home;
