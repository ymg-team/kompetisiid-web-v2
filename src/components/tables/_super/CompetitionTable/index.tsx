import React from "react";

import { useRouter } from "next/router";
import { epochToRelativeTime } from "@helpers/dateTime";

// services
import { fetchCompetitions } from "@services/competition";

// components
import Link from "next/link";
import Label from "@components/Label";
import TextError from "@components/text/TextError";
import GlobalLoader from "@components/preloaders/GlobalLoader";

const REQ_LIMIT = 10;

const SuperCompetitionTable: React.FC = () => {
  const Router = useRouter();

  // initial states
  const [page, setPage] = React.useState(1);
  const [response, setResponse]: any = React.useState({});

  // initial effects
  React.useEffect(() => {
    fetchCompetitionHandler();
  }, [Router.query, page]);

  // initial callbacks
  const fetchCompetitionHandler = React.useCallback(async () => {
    const { status } = Router.query;
    const params = {
      query: { page, limit: REQ_LIMIT, status },
    };
    const Response = await fetchCompetitions(params);
    return setResponse(Response);
  }, [Router.query, page]);

  return (
    <>
      {response.status ? (
        response.status !== 200 && (
          <TextError text={response.message || "Something Wrong :("} />
        )
      ) : (
        <GlobalLoader />
      )}

      {/* looping items */}
      {response.status === 200 && (
        <>
          <p>Total kompetisi {response.count}</p>
          {response.data.map((n: any) => {
            const linkEdit = `/super/competitions/edit/${n.id}`;
            return (
              <div key={n.id} className="competition-items">
                <div className="item">
                  <div className="item__left">
                    <h4>
                      <a
                        title="ke halaman kompetisi"
                        href={`/competition/${
                          n.id
                        }/regulations/${n.nospace_title.toLowerCase()}`}
                        target="_blank"
                        rel="noreferrer noopener"
                      >
                        {n.title}
                      </a>
                    </h4>
                    <p>
                      <span>Dipost {epochToRelativeTime(n.created_at)}</span>{" "}
                      oleh{" "}
                      <a
                        title={n.author.username}
                        href={`/user/${n.author.username}`}
                        target="_blank"
                        rel="noreferrer noopener"
                      >
                        {n.author.username}
                      </a>
                      ,
                      {n.created_at < n.updated_at
                        ? ` update terakhir ${epochToRelativeTime(
                            n.updated_at
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
                    {n.is_garansi ? (
                      <Label type="green" text="garansi" />
                    ) : null}
                    {n.is_mediapartner ? (
                      <Label type="green" text="media partner" />
                    ) : null}
                    {n.is_manage_by_ki ? (
                      <Label type="blue" text="Manage on KI" />
                    ) : null}
                    <Label
                      type="red"
                      text={
                        n.is_berakhir
                          ? n.sisapengumuman != "berakhir"
                            ? `pengumuman ${epochToRelativeTime(
                                n.announcement_at
                              )}`
                            : "berakhir"
                          : `deadline ${epochToRelativeTime(n.deadline_at)}`
                      }
                    />
                    {/* end of competition label */}
                  </div>
                  <div className="item__right">
                    {/* stats count */}
                    <div className="item__right-item">
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
                    </div>{" "}
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
                                href={`/competition/${
                                  n.id
                                }/regulations/${n.nospace_title.toLowerCase()}`}
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
        </>
      )}

      {/* end of looping items */}

      {/* button loadmore */}
    </>
  );
};

export default SuperCompetitionTable;
