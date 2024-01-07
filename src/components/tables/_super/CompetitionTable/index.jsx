import React from "react";
import { toSlug } from "string-manager";
import { useRouter } from "next/router";
import { datetimeToRelativeTime } from "@helpers/dateTime";

// services
import { fetchListCompetitions as fetchCompetitions } from "@services/v3/competitions";
// import { fetchCompetitions } from "@services/competition";

// components
import Link from "next/link";
import Label from "@components/Label";
import TextError from "@components/text/TextError";
import GlobalLoader from "@components/preloaders/GlobalLoader";
import Button from "@components/buttons/index";

const REQ_LIMIT = 10;

const SuperCompetitionTable = () => {
  const Router = useRouter();

  // initial states
  const [page, setPage] = React.useState(1);
  const [loading, setLoading] = React.useState(false);
  const [response, setResponse] = React.useState({});

  // initial effects
  React.useEffect(() => {
    fetchCompetitionHandler();
  }, [Router.query]);

  // initial callbacks functions

  // function to fetch competition list
  const fetchCompetitionHandler = React.useCallback(async () => {
    const { status = "", condition = "" } = Router.query;

    const params = {
      query: { page: 1, limit: REQ_LIMIT, status, condition },
    };
    const Response = await fetchCompetitions(params);
    // reset page
    setPage(1);
    // reset response
    setResponse(Response);
  }, [Router.query]);

  // function to fetch loadmore competition list
  const fetchLoadMoreHandler = React.useCallback(async () => {
    setLoading(true);

    const { status = "", condition = "" } = Router.query;
    const nextResponse = { ...response };
    const nextPage = page + 1;

    const params = {
      query: { page: nextPage, limit: REQ_LIMIT, status, condition },
    };

    const Resp = await fetchCompetitions(params);
    nextResponse.status = Resp.status;
    nextResponse.message = Resp.message;
    nextResponse.data.total = Resp.data.total;

    if (Resp.status === 200) {
      nextResponse.data.competitions = [
        ...nextResponse.data.competitions,
        ...Resp.data.competitions,
      ];
    }

    // update states
    setResponse(nextResponse);
    setPage(nextPage);
    setLoading(false);
  }, [response, Router.query, page]);

  return (
    <>
      {response?.status ? (
        !response?.data?.competitions && (
          <TextError text={response.message || "Something Wrong :("} />
        )
      ) : (
        <GlobalLoader />
      )}

      {/* looping items */}
      {response?.data?.competitions && (
        <>
          <p>Total kompetisi {response?.data?.total || 0}</p>
          {response?.data?.competitions?.map((n) => {
            const linkEdit = `/super/competitions/edit/${n.id}`;
            const noSpaceTitle = toSlug(n.title).toLowerCase();
            const linkCompetition = `/competition/${n.id}/regulations/${noSpaceTitle}`;
            return (
              <div key={n.id} className="competition-items">
                <div className="item">
                  <div className="item__left">
                    <h4>
                      <a title="ke halaman kompetisi" href={linkEdit}>
                        {n.title}
                      </a>
                    </h4>
                    <p>
                      <span>
                        Dipost{" "}
                        {datetimeToRelativeTime(n.created_at, {
                          noExtraTime: true,
                        })}
                      </span>{" "}
                      oleh{" "}
                      <a
                        title={n.user.username}
                        href={`/user/${n.user.username}`}
                        target="_blank"
                        rel="noreferrer noopener"
                      >
                        {n.user.username}
                      </a>
                      ,
                      {n.created_at < n.updated_at
                        ? ` update terakhir ${datetimeToRelativeTime(
                            n.updated_at,
                            { noExtraTime: true }
                          )}`
                        : " belum ada update"}
                      <br />
                      Kategori{" "}
                      <a
                        href={`/browse/${n.main_category.name}`}
                        target="_blank"
                        rel="noreferrer noopener"
                      >
                        {n.main_category.name}
                      </a>
                      -
                      <a
                        href={`/browse/${n.main_category.name}/${n.sub_category.name}`}
                        target="_blank"
                        rel="noreferrer noopener"
                      >
                        {n.sub_category.name}
                      </a>
                    </p>

                    {/* competition label */}
                    {n.is_garansi && <Label type="green" text="garansi" />}
                    {n.is_mediapartner && (
                      <Label type="green" text="media partner" />
                    )}
                    {n.is_manage_by_ki && (
                      <Label type="blue" text="Manage on KI" />
                    )}
                    <Label
                      type="red"
                      text={
                        n.is_berakhir
                          ? n.sisapengumuman != "berakhir"
                            ? `pengumuman ${
                                (datetimeToRelativeTime(n.announcement_at),
                                { noExtraTime: true })
                              }`
                            : "berakhir"
                          : `deadline ${datetimeToRelativeTime(n.deadline_at, {
                              noExtraTime: true,
                            })}`
                      }
                    />
                    {/* end of competition label */}
                  </div>
                  <div className="item__right">
                    {/* stats count */}
                    {/* <div className="item__right-item">
                      <h4
                        style={{
                          color:
                            n.content.split(" ").length < 300
                              ? "#cf3030"
                              : "inherit",
                        }}
                        title="total kata dalam deskripsi"
                      >
                        <span>
                          <i className="fa fa-file" />
                          &nbsp;
                          {n.content.split(" ").length}
                        </span>
                      </h4>
                    </div>{" "} */}
                    <div className="item__right-item">
                      <h4 title="total views">
                        <span>
                          <i className="fa fa-eye" />
                          &nbsp;
                          {n.stats.views}
                        </span>
                      </h4>
                    </div>
                    {/* end of stats count */}
                    {/* options */}
                    <div className="item__right-item">
                      <div className="dropdown">
                        <a
                          className="btn btn-sm dropdown-button fa fa-ellipsis-v"
                          title="options"
                          href="#"
                          onClick={(e) => e.preventDefault()}
                          data-target={`menu-${n.id}`}
                        />
                        <div className="dropdown-items" id={`menu-${n.id}`}>
                          <ul>
                            <li>
                              <a
                                target="_blank"
                                rel="noreferrer noopener"
                                href={linkCompetition}
                              >
                                Preview
                              </a>
                            </li>
                            <li>
                              <Link legacyBehavior href={linkEdit}>
                                <a>Ubah</a>
                              </Link>
                            </li>
                            <li>
                              <a onClick={(e) => e.preventDefault()} href="#">
                                Hapus
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    {/* end of options */}
                  </div>
                </div>
              </div>
            );
          })}

          {/* this button loadmore */}
          {response?.data?.competitions?.length < response?.data?.total && (
            <div className="col-md-12 align-center">
              <Button
                loading={loading}
                // color="white-transparent"
                size="large"
                onClick={() => fetchLoadMoreHandler()}
              >
                <>{loading ? "Loading" : "Load More"}</>
              </Button>
              {/* end of this button loadmore */}
            </div>
          )}
        </>
      )}

      {/* end of looping items */}

      {/* button loadmore */}
    </>
  );
};

export default SuperCompetitionTable;
