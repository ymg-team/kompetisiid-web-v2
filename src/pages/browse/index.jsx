import React from "react";
import { useRouter } from "next/router";
import Dynamic from "next/dynamic";

import StaticSpecialTags from "~/src/config/consts/staticData/specialTags";

// services
import { fetchCompetitionCategories } from "~/src/services/competition";
import { fetchListCompetitions as fetchListCompetitionsV3 } from "@services/v3/competitions";

// components
import CompetitionLoading from "@components/preloaders/CompetitionCardLoader";
import Modal from "@components/modals/Base";
import MediaPartnerAds from "@components/cards/MediaPartnerAds";
import GlobalLoading from "@components/preloaders/GlobalLoader";
import { FilterJelajahStyled } from "@components/filters/Filter.styled";
import Breadcrumb from "@components/navigations/Breadcrumb";
import Head from "next/head";
// import { queryToObj } from "string-manager";

const CompetitionBoxV3 = Dynamic(import("@components/boxs/CompetitionBoxV3"), {
  loading: () => <CompetitionLoading withContainer />,
});
const SpecialTags = Dynamic(import("@components/boxs/SpecialTags"), {
  loading: GlobalLoading,
});

// === consts ===
const DEFAULT_REQ_QUERY_COMPETITIONS = {
  status: "all",
  limit: 9,
  is_draft: "0",
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
    link: "/browse",
  },
];

const BrowseCompetition = ({
  main_category,
  sub_category,
  username,
  tag,
  serverData = {},
}) => {
  const Router = useRouter();

  // === initial ref ===

  // const firstRender = React.useRef(true);

  // === initial states ===
  const [page, setPage] = React.useState(1);
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
    if (Router.query.is_mediapartner == 1) {
      Title += ` Media Partner`;
      Description = `Jelajahi kompetisi yang menjadikan Kompetisi.id sebagai media partner`;
    }

    // jelajah berdasarkan kategori
    if (main_category) {
      Title += ` Kategori ${main_category}`;
      Description += ` di kategori ${main_category}`;
    }

    // jelajah berdasarkan kategori
    if (sub_category) {
      Title += ` Sub Kategori ${sub_category}`;
      Description += ` di sub kategori ${sub_category}`;
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

  const subcategories = React.useMemo(() => {
    if (main_category && categories.status) {
      const SelCategory =
        categories.data.find((n) => n.name === main_category) || {};
      return SelCategory.subcategories || [];
    }

    return [];
  }, [main_category]);

  // === initial effects ===
  React.useEffect(() => {
    fetchCategories();
  }, []);

  React.useEffect(() => {
    setRespCompetition(serverData.competitions);
  }, [serverData]);

  React.useEffect(() => {
    // need reset page because change filter
    setPage(1);

    const {
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

    if (respCompetition.data && respCompetition.data.competitions.length > 0) {
      const nextPage = page + 1;

      if (Router.query.tag)
        Router.query.tag = Router.query.tag.replace(/%20/g, " ");

      // const ResLength = respCompetition.data.length;
      const Res = await fetchListCompetitionsV3({
        query: {
          ...DEFAULT_REQ_QUERY_COMPETITIONS,
          ...Router.query,
          ...{ page: nextPage },
        },
      });

      // join currentResponse and newResponse
      currResponse.status = Res.status;
      currResponse.message = Res.message;
      currResponse.data.total = Res.data.total;
      if (Res.data.competitions) {
        currResponse.data.competitions = [
          ...currResponse.data.competitions,
          ...Res.data.competitions,
        ];
        setPage(nextPage);
      }

      setRespCompetition(currResponse);
      setLoading(false);
    }
  }, [Router.query, respCompetition, page]);

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
            {/* must be 1 H1 per page, SEO purpose */}
            <h1 style={{ display: "none" }}>{Meta.Title}</h1>
            <div className="container">
              {/* filter by main category and sub category */}
              <div className="row">
                {/* breadcrumbs */}
                <div className="col-md-12">
                  <Breadcrumb breadcrumb={BreadcrumbData} />
                </div>
                {/* end of breadcrumbs */}

                <div className="col-md-12">
                  <h2 style={{ fontSize: "2em" }}>
                    {" "}
                    {Router.query.search
                      ? ` Pencarian "${Router.query.search}"`
                      : "Jelajah"}
                    {Router.query.is_mediapartner == 1 ? " Media Partner" : ""}{" "}
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        modal("open", "select-main-kat");
                      }}
                    >
                      {main_category || "Semua Kategori"}
                      <i className="fa fa-angle-down" />
                    </a>
                    {main_category && (
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
                          {sub_category || "Semua Sub Kategori"}
                          <i className="fa fa-angle-down" />
                        </a>
                      </span>
                    )}
                  </h2>
                </div>
              </div>

              <div className="row">
                <div className="col-md-12">
                  <h2 style={{ fontSize: "2em" }}>
                    {/* sortby
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
                    </a>{" "} */}
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
                  </h2>
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
        <CompetitionBoxV3
          style={{ padding: "10px 15px" }}
          subtitle={true}
          {...respCompetition}
        />
        {/*end of content*/}

        {/* loader */}
        {loading && <GlobalLoading />}

        {/* button loadMore */}
        {!loading &&
          respCompetition.status == 200 &&
          respCompetition.data?.competitions?.length >=
            DEFAULT_REQ_QUERY_COMPETITIONS.limit && (
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
                                ...{ main_category: n.name, sub_category: "" },
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
                            ...{ main_category: "", sub_category: "" },
                          },
                        });
                      }}
                      className="text-muted"
                    >
                      semua kategori
                    </a>
                  </li>
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
                {subcategories.length > 0 &&
                  subcategories.map((n, key) => {
                    return (
                      <li key={key}>
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            modal("close", "select-sub-kat");
                            Router.push({
                              pathname: `/browse/${main_category}/${n.name}`,
                              query: {
                                ...Router.query,
                                ...{ sub_category: n.name },
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
                <li>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      modal("close", "select-sub-kat");
                      Router.push({
                        pathname: `/browse/${main_category}`,
                        query: { ...Router.query, ...{ sub_category: "" } },
                      });
                    }}
                    className="text-muted"
                  >
                    Semua Sub Kategori
                  </a>
                </li>
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
  const main_category = query.main_category
    ? query.main_category.replace(/%20/g, " ")
    : "";
  const sub_category = query.sub_category
    ? query.sub_category.replace(/%20/g, " ")
    : "";
  const tag = query.tag ? query.tag.replace(/%20/g, " ") : "";

  const NextQuery = {
    ...DEFAULT_REQ_QUERY_COMPETITIONS,
    ...query,
    ...{ main_category, sub_category, tag },
  };

  const competitions = await fetchListCompetitionsV3({ query: NextQuery });

  return {
    main_category,
    sub_category,
    tag,
    username: query.username,
    serverData: {
      competitions,
    },
  };
};

export default BrowseCompetition;
