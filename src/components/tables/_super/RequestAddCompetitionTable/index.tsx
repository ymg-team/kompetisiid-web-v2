import React from "react";
import { useRouter } from "next/router";
import * as sw from "sweetalert";

// helpers
import { epochToRelativeTime } from "@helpers/dateTime";

// services
import {
  fetchListRequestCompetition,
  actionRequestCompetition,
} from "@services/request_competition";

// components
import { alert } from "@components/alert/Base";
import GlobalLoader from "@components/preloaders/GlobalLoader";
import Label from "@components/Label";
import TextCard from "@components/cards/TextCard";

// consts
const DEFAULT_LIMIT = 10;

const RequestAddCompetitionTable: React.FC = () => {
  const Router = useRouter();

  // intial refs
  const lastId = React.useRef("");

  // initial states
  const [response, setResponse] = React.useState<any>({});
  const [loadingMore, setLoadingMore] = React.useState<boolean>(false);

  React.useEffect(() => {
    fetchData({});
  }, [Router.query]);

  const fetchData = React.useCallback(
    async ({ lastId }: any) => {
      if (!lastId) setResponse({});
      else setLoadingMore(true);

      const { status } = Router.query || {};
      const query: any = {
        limit: DEFAULT_LIMIT,
      };
      if (status) query.status = status;
      if (lastId) query.lastid = lastId;

      const Response = await fetchListRequestCompetition({ query });

      if (lastId) {
        const currResponse = { ...response };
        currResponse.status = Response.status;
        currResponse.message = Response.message;
        if (Response.data)
          currResponse.data = [...(currResponse.data || []), ...Response.data];
        setResponse(currResponse);
        setLoadingMore(false);
      } else {
        setResponse(Response);
      }
    },
    [Router.query, response]
  );

  const actionHandler = (requestId: string) => {
    sw("Pastikan mengisi reason untuk approve/reject request ini!", {
      buttons: {
        cancel: "Cancel",
        reject: {
          text: "Reject",
          value: "reject",
        },
        approve: {
          text: "Approve",
          value: "posted",
        },
      },
    }).then((status?: "posted" | "reject") => {
      switch (status) {
        case "posted":
        case "reject":
          sw(
            `Kompetisi akan ${
              status === "reject" ? "reject" : "approve"
            } di Masukan alasan`,
            {
              content: "input",
            }
          ).then(async (message: string) => {
            const payload = {
              message,
              status,
            };
            const Response: any = await actionRequestCompetition({
              id: requestId,
              payload,
            });
            console.log("Response", Response);
            alert(
              true,
              Response.message,
              Response.status === 200 ? "success" : "error"
            );
            if (Response.status === 200) {
              // refetch list request
              fetchData({});
            }
          });
          break;
      }
    });
  };

  return (
    <>
      {!response.status ? (
        <GlobalLoader />
      ) : (
        <>
          <p>Total request {response.count || 0}</p>
          <div className="competition-items">
            {/* table looping */}
            {response.data &&
              response.data.map((n: any) => {
                return (
                  <div key={n.id} className="item">
                    <div className="item__left">
                      <h4>
                        <a
                          title="Mengunjungi link kompetisi"
                          href={""}
                          target="_blank"
                          rel="noreferrer noopener"
                        >
                          {n.title}
                        </a>
                      </h4>
                      <p>
                        <span>
                          Direquest: {epochToRelativeTime(n.created_at)}
                        </span>
                        , oleh {n.email}
                        {(n.status === "reject" || n.status === "posted") && (
                          <>
                            <br />
                            Diproses: {epochToRelativeTime(n.updated_at)}
                            <br /> Note: {n.note}
                          </>
                        )}
                      </p>
                      {n.status === "posted" && (
                        <Label type="green" text="approved" />
                      )}
                      {n.status === "reject" && (
                        <Label type="red" text="rejected" />
                      )}
                      {n.status === "waiting" && (
                        <Label type="yellow" text="waiting" />
                      )}
                    </div>

                    {/* actions */}
                    <div className="item__right">
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
                              {n.status === "waiting" && (
                                <li>
                                  <a
                                    href={"#"}
                                    onClick={() => actionHandler(n.id)}
                                  >
                                    Approve/Reject
                                  </a>
                                </li>
                              )}

                              <li>
                                <a
                                  target="_blank"
                                  rel="noreferrer noopener"
                                  href={n.poster.original}
                                >
                                  Lihat Poster
                                </a>
                              </li>
                              <li>
                                <a
                                  target="_blank"
                                  rel="noreferrer noopener"
                                  href={n.link}
                                >
                                  Buka Link
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* end of actions */}
                  </div>
                );
              })}
            {/* end of table looping */}
          </div>

          {response.status === 200 ? (
            <div className="align-center">
              {" "}
              <a
                className="btn btn-white "
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  return fetchData({
                    lastId: response.data[response.data.length - 1].id,
                  });
                }}
                // disabled={loadingMore}
              >
                {loadingMore ? "Loading..." : "Load More"}
              </a>
            </div>
          ) : (
            <TextCard>{response.message}</TextCard>
          )}
        </>
      )}
    </>
  );
};

export default RequestAddCompetitionTable;
