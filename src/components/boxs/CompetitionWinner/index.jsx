import React from "react";

// components
import { CompetitionWinnerStyled } from "./styled";
import Avatar from "@components/avatar";
import Link from "next/link";
import Loader from "@components/preloaders/GlobalLoader";
import { fetchCompetitionWinners } from "@services/competition_winners";

const CompetitionWinnerBox = ({ competition_id }) => {
  // initial states
  const [respWinners, setRespWinners] = React.useState({});

  React.useEffect(() => {
    fetchWinners();
  }, [competition_id]);

  const fetchWinners = React.useCallback(async () => {
    const Response = await fetchCompetitionWinners({ competition_id });
    setRespWinners(Response);
  }, [respWinners, competition_id]);

  return (
    <CompetitionWinnerStyled>
      <strong className="competition-winner__title">Winner:</strong>
      <div>
        {!respWinners.status ? (
          <Loader />
        ) : respWinners.status === 200 ? (
          respWinners.data.winners.map((n) => (
            <Link href={`/user/${n.username}`}>
              <a>
                <Avatar
                  title={`n.username`}
                  src="/assets/4.2/img/avatar-default.jpg"
                  size="small"
                />
              </a>
            </Link>
          ))
        ) : (
          <p className="text-muted">{respWinners.message}</p>
        )}
      </div>
    </CompetitionWinnerStyled>
  );
};

export default CompetitionWinnerBox;
