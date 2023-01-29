import React from "react";

// layouts
import SuperLayout from "@layouts/SuperLayoutV5";

// services
import { fetchCompetitionById } from "@services/competition";

// components
import FormCompetition from "@components/fields/Competition";
import SEO from "@components/meta/SEO";
import HeaderDashboard from "@components/headers/HeaderDashboard";
import { NextPage } from "next";
import GlobalLoader from "@components/preloaders/GlobalLoader";

const Meta = {
  title: "Tambah Kompetisi",
  desc: "Buat data kompetisi yang jelas sehingga menarik para pengunjung untuk menjadi pesertanya",
};

type CompetitionCreatePageProps = {
  competition_id?: string | undefined;
};

const CompetitionCreatePage: NextPage<CompetitionCreatePageProps> = ({
  competition_id,
}) => {
  // initial states
  const [competitionData, setCompetitionData]: any = React.useState({});

  React.useEffect(() => {
    fetchCompetitionDetail();
  }, [competition_id]);

  const fetchCompetitionDetail = React.useCallback(async () => {
    const params: any = {
      id: competition_id,
    };
    const Response = await fetchCompetitionById(params);
    setCompetitionData(Response);
  }, [competition_id]);

  return (
    <SuperLayout>
      <SEO {...Meta} />
      <HeaderDashboard title={Meta.title} text={Meta.desc} />
      {competition_id && !competitionData.status ? (
        <GlobalLoader />
      ) : (
        <FormCompetition
          type={competition_id ? "edit" : "create"}
          {...{ competitionData }}
        />
      )}
    </SuperLayout>
  );
};

CompetitionCreatePage.getInitialProps = ({ query }: any) => {
  const { competition_id } = query || {};
  return {
    competition_id,
  };
};

export default CompetitionCreatePage;
