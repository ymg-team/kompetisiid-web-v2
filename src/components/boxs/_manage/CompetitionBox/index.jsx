import React from "react";
import { useSelector } from "react-redux";

// services
import { fetchCompetitions } from "@services/competition";

// components
import Spinner from "@components/preloaders/GlobalLoader";
import CompetitionList from "@components/cards/_manage/CompetitionList";

const DEFAULT_LIMIT = 15;

const CompetitionBox = ({ data, type, userType }) => {
  // initial states
  const [response, setResponse] = React.useState({});
  const Session = useSelector((State) => State.Session);

  React.useEffect(() => {
    if (type && userType) {
      fetchCompetitionHandler();
    }
  }, [type, userType]);

  const fetchCompetitionHandler = React.useCallback(
    async (params = {}) => {
      // query generator
      let query = {
        page: params.page || 1,
        limit: DEFAULT_LIMIT,
      };

      if (userType === "participant") {
        // one of live | won | lost
        query.join_status = type;
      }

      const response = await fetchCompetitions({ query });
      setResponse(response);
    },
    [type, userType]
  );

  return (
    <>
      {!response.status && <Spinner />}
      {response.status && response.status === 200
        ? response.data.map((n, key) => (
            <CompetitionList key={key} {...{ n, type, userType }} />
          ))
        : response.message && <strong>{response.message}</strong>}
    </>
  );
};

CompetitionBox.defaultProps = {
  type: "as-participant",
};

export default CompetitionBox;
