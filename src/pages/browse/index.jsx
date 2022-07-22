import React from "react";
import { useRouter } from "next/router";
import Dynamic from "next/dynamic";

import StaticSpecialTags from "~/src/config/consts/staticData/specialTags";

// services
import {
  fetchCompetitionCategories,
  fetchCompetitions,
} from "~/src/services/competition";

// components
import CompetitionLoading from "@components/preloaders/CompetitionCardLoader";
import Modal from "@components/modals";
import MediaPartnerAds from "@components/cards/MediaPartnerAds";
import GlobalLoading from "@components/preloaders/GlobalLoader";
import { FilterJelajahStyled } from "@components/filters/Filter.styled";
import Breadcrumb from "@components/navigations/Breadcrumb";
import Head from "next/head";

const CompetitionBox = Dynamic(import("@components/boxs/CompetitionBox"), {
  loading: () => <CompetitionLoading withContainer />,
});
const SpecialTags = Dynamic(import("@components/boxs/SpecialTags"), {
  loading: GlobalLoading,
});

// === consts ===
const DEFAULT_REQ_QUERY_COMPETITIONS = {
  status: "all",
  limit: 9,
};

const SortText = {
  time_dsc: "Terbaru",
  prize_dsc: "Hadiah terbesar",
};

const FilterStatus = {
  active: "Masih berlangsung",
};

const BreadcrumbData = [
  {
    title: "Home",
    link: "/",
  },
  {
    title: "Jelajah Kompetisi",
    link: "/browse?status=active",
  },
];

const BrowseCompetition = ({
  mainkat,
  subkat,
  username,
  tag,
  serverData = {},
}) => {
  const Router = useRouter();

  // === initial ref ===

  const firstRender = React.useRef(true);

  // === initial states ===

  const [loading, setLoading] = React.useState(false);
  const [categories, setCategories] = React.useState({});
  const [sort, setSort] = React.useState("time_dsc");
  const [status, setStatus] = React.useState("");
  const [respCompetition, setRespCompetition] = React.useState(
    serverData.competitions || {}
  );

  // === initial memos ===

  const Meta = React.useMemo(() => {
    let Title = Router.query.search
      ? `Pencarian \"${Router.query.search}\"`
      : "Jelajah Kompetisi";
    let Description = Router.query.search
      ? `Pencarian \"${Router.query.search}\"`
      : "Jelajahi kompetisi dari berbagai macam kategori di Kompetisi Id";
    let Keywords =
      "jelajah kompetisi,kompetisiid, kumpulan kompetisi,info kompetisi";

    //jelajah kompetisi by tag
    if (tag) {
      // ref: https://stackoverflow.com/a/20792617/2780875
      Title += ` berdasarkan tag ${tag}`;
      Description = ` berdasarkan tag ${tag}`;
    }

    //jelajah kompetisi by username
    if (username) {
      Title += ` Dipasang oleh "${username}"`;
      Description = `Jelajahi kompetisi yang dipasang oleh "${username}"`;
    }

    // jelajah media partner
    if (Router.query.mediapartner == 1) {
      Title += ` Media Partner`;
      Description = `Jelajahi kompetisi yang menjadikan Kompetisi.id sebagai media partner`;
    }

    // jelajah berdasarkan kategori
    if (mainkat) {
      Title += ` Kategori ${mainkat}`;
      Description += ` di kategori ${mainkat}`;
    }

    // jelajah berdasarkan kategori
    if (subkat) {
      Title += ` Sub Kategori ${subkat}`;
      Description += ` di sub kategori ${subkat}`;
    }

    return {
      Title,
      Description,
      Keywords,
    };
  }, [Router.query]);

  const SelectedSpecialTag = React.useMemo(() => {
    return tag
      ? StaticSpecialTags.find((n) => n.tag === tag.toLowerCase()) || {}
      : {};
  }, [tag]);

  const subkategories = React.useMemo(() => {
    if (mainkat && categories.status) {
      const SelCategory = categories.data.find((n) => n.name === mainkat) || {};
      console.log(SelCategory);
      return SelCategory.subkategories || [];
    }

    return [];
  }, [mainkat]);

  // === initial effects ===
  React.useEffect(() => {
    fetchCategories();
  }, []);

  React.useEffect(() => {
    setRespCompetition(serverData.competitions);
  }, [serverData]);

  React.useEffect(() => {
    const {
      mainkat: mainkatQuery,
      subkat: subkatQuery,
      // mediapartner,
      // berakhir,
      // garansi,
      // q,
      orderby: orderbyQuery,
      status: statusQuery,
    } = Router.query;

    // state sort state
    if (orderbyQuery !== sort) setSort(orderbyQuery);

    // set status state
    if (statusQuery !== status) setStatus(statusQuery);

    // if (username) query.username = username;

    // fetchData();
  }, [Router.query]);

  // === initial functions ===

  const fetchCategories = React.useCallback(async () => {
    const Res = await fetchCompetitionCategories();
    setCategories(Res);
  });

  const fetchDataMore = React.useCallback(async () => {
    setLoading(true);
    let currResponse = { ...respCompetition };

    if (respCompetition.data && respCompetition.data.length > 0) {
      const ResLength = respCompetition.data.length;
      const lastid = respCompetition.data[ResLength - 1].id;
      const Res = await fetchCompetitions({
        query: {
          ...DEFAULT_REQ_QUERY_COMPETITIONS,
          ...Router.query,
          ...{ lastid },
        },
      });

      // join currentResponse and newResponse
      currResponse.status = Res.status;
      currResponse.message = Res.message;
      currResponse.count = Res.count;
      if (Res.data) currResponse.data = [...currResponse.data, ...Res.data];

      setRespCompetition(currResponse);

      setLoading(false);
    }
  }, [Router.query, respCompetition]);

  return (
    <>
      <div id="browse-container">
        <Head>
          <title>{Meta.Title}</title>
          <meta name="description" content={Meta.Description} />
          <meta name="keywords" content={Meta.keywords} />
        </Head>

        {/*filter*/}
        {SelectedSpecialTag && SelectedSpecialTag.tag ? (
          <SpecialTags {...SelectedSpecialTag} />
        ) : (
          <FilterJelajahStyled className="col-md-12 filter-jelajah">
            <div className="container">
              {/* filter by main category and sub category */}
              <div className="row">
                {/* breadcrumbs */}
                <div className="col-md-12">
                  <Breadcrumb breadcrumb={BreadcrumbData} />
                </div>
                {/* end of breadcrumbs */}

                <div className="col-md-12">
                  <h1>
                    {" "}
                    {Router.query.search
                      ? ` Pencarian "${Router.query.search}"`
                      : "Jelajah"}
                    {Router.query.mediapartner == 1 ? " Media Partner" : ""}{" "}
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        modal("open", "select-main-kat");
                      }}
                    >
                      {mainkat || "Semua Kategori"}
                      <i className="fa fa-angle-down" />
                    </a>
                    {mainkat && (
                      <span>
                        {" "}
                        dan{" "}
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            modal("open", "select-sub-kat");
                          }}
                        >
                          {subkat || "Semua subkategori"}
                          <i className="fa fa-angle-down" />
                        </a>
                      </span>
                    )}
                  </h1>
                </div>
              </div>

              <div className="row">
                <div className="col-md-12">
                  <h1>
                    {/* sortby */}
                    Urutkan{" "}
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        modal("open", "sort-by");
                      }}
                    >
                      {SortText[sort] || "Terbaru"}
                      <i className="fa fa-angle-down" />
                    </a>{" "}
                    {/* filter by status */}
                    Tampilkan{" "}
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        modal("open", "filter-by-status");
                      }}
                    >
                      {FilterStatus[status] || "Semua"}
                      <i className="fa fa-angle-down" />
                    </a>
                    {tag ? ` Tag "${tag}"` : ""}
                  </h1>
                  {/* filter by status */}
                </div>
              </div>

              <div className="row no-margin">
                <div className="col-md-8">
                  <p className="text-muted" style={{ marginBottom: 0 }}>
                    Gunakan filter diatas untuk menemukan kompetisi yang sesuai
                    dengan minat kamu
                  </p>
                </div>
              </div>
            </div>
          </FilterJelajahStyled>
        )}
        {/*end of filter*/}

        {/* media partner ads*/}
        <div className="container">
          <div className="col-md-12">
            <MediaPartnerAds />
          </div>
        </div>
        {/* end of media partner */}

        {/*content*/}
        <CompetitionBox
          style={{ padding: "10px 15px" }}
          subtitle={true}
          {...respCompetition}
        />
        {/*end of content*/}

        {/* loader */}
        {loading && <GlobalLoading />}

        {/* button loadMore */}
        {!loading && respCompetition.status == 200 && (
          <div className="row align-center">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                fetchDataMore();
              }}
              className="btn btn-bordergray"
            >
              KOMPETISI BERIKUTNYA
            </a>
          </div>
        )}

        {/*modal*/}
        <>
          {/* modal select main category */}
          <Modal id="select-main-kat">
            <div className="container">
              <div className="modal-title">
                Pilih Kategori dibawah ini
                <a
                  className="btn btn-white btn-close-modal btn-sm fas fa-times"
                  href="#"
                  onClick={(e) => e.preventDefault()}
                />
              </div>
              <hr />
              {categories.status && categories.status === 200 ? (
                <ul className="vertical-menu list-categories">
                  <li>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        modal("close", "select-main-kat");
                        Router.push({
                          pathname: `/browse`,
                          query: {
                            ...Router.query,
                            ...{ mainkat: "", subkat: "" },
                          },
                        });
                      }}
                      className="text-muted"
                    >
                      semua kategori
                    </a>
                  </li>
                  {categories.data.map((n, key) => {
                    return (
                      <li key={key}>
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            modal("close", "select-main-kat");
                            Router.push({
                              pathname: `/browse/${n.name}`,
                              query: {
                                ...Router.query,
                                ...{ mainkat: n.name, subkat: "" },
                              },
                            });
                          }}
                          className="text-muted"
                        >
                          {n.name}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                "loading..."
              )}
            </div>
          </Modal>

          {/* modal to set sub category */}
          <Modal id="select-sub-kat">
            <div className="container">
              <div className="modal-title">
                Pilih sub kategori dibawah ini
                <a className="btn btn-white btn-close-modal btn-sm fas fa-times" />
              </div>
              <hr />
              <ul className="vertical-menu list-categories">
                <li>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      modal("close", "select-sub-kat");
                      Router.push({
                        pathname: `/browse/${mainkat}`,
                        query: { ...Router.query, ...{ subkat: "" } },
                      });
                    }}
                    className="text-muted"
                  >
                    Semua subkategori
                  </a>
                </li>
                {subkategories.length > 0
                  ? subkategories.map((n, key) => {
                      return (
                        <li key={key}>
                          <a
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              modal("close", "select-sub-kat");
                              Router.push({
                                pathname: `/browse/${mainkat}/${n.name}`,
                                query: {
                                  ...Router.query,
                                  ...{ subkat: n.name },
                                },
                              });
                            }}
                            className="text-muted"
                          >
                            {n.name}
                          </a>
                        </li>
                      );
                    })
                  : null}
              </ul>
            </div>
          </Modal>

          {/* modal sort-by */}
          <Modal id="sort-by">
            <div className="container">
              <div className="modal-title">
                Urutkan kompetisi berdasarkan
                <a
                  className="btn btn-white btn-close-modal btn-sm fas fa-times"
                  href="#"
                  onClick={(e) => e.preventDefault()}
                />
              </div>
              <hr />
              <ul className="vertical-menu list-categories">
                <li>
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      modal("close", "sort-by");
                      Router.push({
                        pathname: location.pathname,
                        query: { ...Router.query, ...{ orderby: "time_dsc" } },
                      });
                    }}
                    href="#"
                  >
                    Terbaru
                  </a>
                </li>
                <li>
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      modal("close", "sort-by");
                      Router.push({
                        pathname: location.pathname,
                        query: { ...Router.query, ...{ orderby: "prize_dsc" } },
                      });
                    }}
                    href="#"
                  >
                    Hadiah Terbesar
                  </a>
                </li>
              </ul>
            </div>
          </Modal>

          {/* modal filter-by-status */}
          <Modal id="filter-by-status">
            <div className="container">
              <div className="modal-title">
                Menampilkan kompetisi dengan status
                <a
                  className="btn btn-white btn-close-modal btn-sm fas fa-times"
                  href="#"
                  onClick={(e) => e.preventDefault()}
                />
              </div>
              <hr />
              <ul className="vertical-menu list-categories">
                <li>
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      modal("close", "filter-by-status");
                      Router.push({
                        pathname: location.pathname,
                        query: { ...Router.query, ...{ status: "all" } },
                      });
                    }}
                    href="#"
                  >
                    Semua
                  </a>
                </li>
                <li>
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      modal("close", "filter-by-status");
                      Router.push({
                        pathname: location.pathname,
                        query: { ...Router.query, ...{ status: "active" } },
                      });
                    }}
                    href="#"
                  >
                    Masih berlangsung
                  </a>
                </li>
              </ul>
            </div>
          </Modal>
        </>
        {/*end of modal*/}
      </div>
    </>
  );
};

BrowseCompetition.getInitialProps = async (ctx) => {
  const { query = {} } = ctx || {};

  const NextQuery = { ...DEFAULT_REQ_QUERY_COMPETITIONS, ...query };

  const competitions = await fetchCompetitions({ query: NextQuery });

  return {
    mainkat: query.mainkat ? query.mainkat.replace(/%20/g, " ") : "",
    subkat: query.subkat ? query.subkat.replace(/%20/g, " ") : "",
    tag: query.tag,
    username: query.username,
    serverData: {
      competitions,
    },
  };
};

export default BrowseCompetition;
