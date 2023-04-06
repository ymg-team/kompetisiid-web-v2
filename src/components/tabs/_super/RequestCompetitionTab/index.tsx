import React from "react";
import Tab from "@components/tabs/base";
import { useRouter } from "next/router";

const SuperRequestCompetitionTab = () => {
  const Router = useRouter();

  const TAB_CONTENT = React.useMemo(() => {
    const { status } = Router.query;

    return [
      {
        target: "/super/requests",
        is_active: !status,
        text: "All",
      },
      {
        target: "/super/requests/waiting",
        is_active: status === "waiting",
        text: "Waiting",
      },
      {
        target: "/super/requests/approved",
        is_active: status === "posted",
        text: "Approved",
      },
      {
        target: "/super/requests/rejected",
        is_active: status === "reject",
        text: "Rejected",
      },
    ];
  }, [Router.query]);

  return <Tab tabs={TAB_CONTENT} />;
};

export default SuperRequestCompetitionTab;
