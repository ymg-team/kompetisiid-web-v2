import type { NextPage } from "next";

// services
import { fetchListRequestCompetition } from "@services/request_competition";

// layouts
import SuperLayout from "@layouts/SuperLayoutV5";

// components
import SEO from "@components/meta/SEO";
import HeaderDashboard from "@components/headers/HeaderDashboard";
import Tab from "@components/tabs/_super/RequestCompetitionTab";
import Table from "@components/tables/_super/RequestAddCompetitionTable";

const META = {
  title: "Request Add Competition",
  desc: "Halaman ini digunakan untuk validasi request beberapa kompetisi yang telah dipasang publik melalui alamat https://kompetisi.id/add/send",
};

const RequestCompetitionPage: NextPage = () => {
  return (
    <SuperLayout>
      <SEO {...META} />
      <HeaderDashboard title={META.title} text={META.desc} noBorder />
      <Tab />
      <Table />
    </SuperLayout>
  );
};

export default RequestCompetitionPage;
