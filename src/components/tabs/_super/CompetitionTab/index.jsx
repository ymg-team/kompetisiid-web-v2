import React, { useMemo } from "react";

import Tab from "@components/tabs/base";
import SelectV1 from "@components/form/Select";
import GlobalLoader from "@components/preloaders/GlobalLoader";
import { GlobalFilter } from "@components/filters/GlobalFilter";

import { useRouter } from "next/router";

const SuperCompetitionTab = () => {
  const Router = useRouter();

  const SelectedCondition = useMemo(() => {
    return Router?.query?.condition || "all";
  }, [Router.query.condition]);

  const SelectedStatus = useMemo(() => {
    return Router?.query?.status || "all";
  }, [Router.query.status]);

  const TAB_CONTENT = React.useMemo(() => {
    return [
      {
        id: "all",
        text: "all",
      },
      {
        id: "waiting",
        text: "waiting",
      },
      {
        id: "posted",
        text: "posted",
      },
      {
        id: "reject",
        text: "rejected",
      },
    ];
  }, []);

  return !Router.isReady ? (
    <GlobalLoader />
  ) : (
    <>
      <Tab
        tabs={TAB_CONTENT}
        selected={SelectedStatus}
        onClick={(status) => {
          return Router.push({
            pathname: "/super/competitions",
            query: { ...Router.query, ...{ status } },
          });
        }}
      />
      <GlobalFilter className="row">
        <div className="col-3 filter__item">
          <label>
            <strong>Condition</strong>
          </label>

          <SelectV1
            options={[
              {
                id: "all",
                type: "All",
                icon: "",
              },
              {
                id: "active",
                type: "Active",
                icon: "",
              },
              {
                id: "ended",
                type: "Ended",
                icon: "",
              },
            ]}
            value={SelectedCondition}
            initialValue={SelectedCondition}
            valueKey="id"
            textKey="type"
            onChange={(value) => {
              Router.push({
                pathname: "/super/competitions",
                query: { ...Router.query, ...{ condition: value } },
              });
            }}
          />
        </div>
      </GlobalFilter>
    </>
  );
};

export default SuperCompetitionTab;
