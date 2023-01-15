import React from "react";

// services
import { fetchStatsSuper } from "@services/stats";

// layouts
import SuperLayout from "@layouts/SuperLayoutV5";

// components
import CountBox from "@components/boxs/_super/CountBox";
import Loading from "@components/preloaders/GlobalLoader";
import SEO from "@components/meta/SEO";
import HeaderDashboard from "@components/headers/HeaderDashboard";
import Spacer from "@components/boxs/Spacer";
import TextError from "@components/text/TextError";

const DashboardStats = [
  {
    title: "Kompetisi",
    desc: "Seluruh data kompetisi di Kompetisi Id",
    key: "competition",
    link: "/competitions",
    childs: ["draft", "live", "posted", "reject", "waiting"],
  },
  {
    title: "Request",
    desc: "Request tambak kompetisi",
    key: "request",
    link: "/requests",
    childs: ["waiting", "accept", "reject", "total"],
  },
  {
    title: "Kabar",
    desc: "Seluruh kabar di Kompetisi Id",
    key: "news",
    link: "/news",
    childs: ["draft", "posted"],
  },
  {
    title: "Member",
    desc: "Member Kompetisi Id",
    key: "members",
    link: "/members",
    childs: ["verified", "unverified", "banned"],
  },
];

const SuperDashboardPage: React.FC = () => {
  const [respStats, setRespStats]: any = React.useState({});

  React.useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    const ResponseStats = await fetchStatsSuper();
    setRespStats(ResponseStats);
  };

  return (
    <SuperLayout>
      <SEO title={"Super Dashboard"} />

      {respStats.status ? (
        respStats.status === 200 ? (
          DashboardStats.map((n: any) => {
            return (
              <div key={n.key} className="row">
                <div className="col-md-12">
                  <HeaderDashboard title={n.title} text={n.desc} />
                  <Spacer size="medium" />
                </div>
                {n.childs.map((m: any) => {
                  return (
                    <div
                      key={m}
                      style={{ marginBottom: 20 }}
                      className="col-md-3 col-xs-6"
                    >
                      <CountBox
                        count={respStats[n.key][m]}
                        text={m}
                        link={`/super/${n.link}/${m}`}
                      />
                    </div>
                  );
                })}

                <div className="col-md-12">
                  <Spacer size="medium" />
                </div>
              </div>
            );
          })
        ) : (
          <TextError text={respStats.message} />
        )
      ) : (
        <Loading />
      )}
    </SuperLayout>
  );
};

export default SuperDashboardPage;
