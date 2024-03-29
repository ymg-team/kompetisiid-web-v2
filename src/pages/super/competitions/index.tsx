import { NextPage } from "next";

// layouts
import SuperLayout from "@layouts/SuperLayoutV5";

// components
import SEO from "@components/meta/SEO";
import Table from "@components/tables/_super/CompetitionTable";
import Tab from "@components/tabs/_super/CompetitionTab";
import HeaderDashboard from "@components/headers/HeaderDashboard";

const META = {
  title: "List Competition",
  desc: "Kompetisi yang terpasang di Kompetisi Id",
};

const SuperCompetitionSuper: NextPage = () => {
  return (
    <SuperLayout>
      <SEO {...META} />
      <HeaderDashboard
        title={"Manage Competition"}
        text="Semua kompetisi yang terpasang di Kompetisi Id"
        noBorder
      />
      <Tab />
      <Table />
    </SuperLayout>
  );
};

export default SuperCompetitionSuper;
