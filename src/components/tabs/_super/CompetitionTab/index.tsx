import React from "react";
import Tab from "@components/tabs/base";
import { useRouter } from "next/router";

const SuperCompetitionTab = () => {
  const Router = useRouter();

  const TAB_CONTENT = React.useMemo(() => {
    const { status } = Router.query;

    return [
      {
        target: "/super/competitions",
        is_active: !status,
        text: "all",
      },
      {
        target: "/super/competitions/waiting",
        is_active: status === "waiting",
        text: "waiting",
      },
      {
        target: "/super/competitions/active",
        is_active: status === "active",
        text: "active",
      },
      {
        target: "/super/competitions/end",
        is_active: status === "end",
        text: "end",
      },
      // {
      //   target: "/super/competitions/published",
      //   is_active: status === "published",
      //   text: "published",
      // },
      // {
      //   target: "/super/competitions/rejected",
      //   is_active: status === "rejected",
      //   text: "rejected",
      // },
    ];
  }, [Router.query]);

  return <Tab tabs={TAB_CONTENT} />;
};

export default SuperCompetitionTab;
