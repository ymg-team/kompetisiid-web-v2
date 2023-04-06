import type { NextPage } from "next";

// layouts

import SuperLayout from "@layouts/SuperLayoutV5";

// components
import SEO from "@components/meta/SEO";

const META = {
  title: "Request Add Competition",
  desc: "Request Add Copetition do Kompetiis Id",
};

const RequestCompetitionDetailPage: NextPage = () => {
  return (
    <SuperLayout>
      <SEO {...META} />
      <div>this is request competition detail page</div>
    </SuperLayout>
  );
};

export default RequestCompetitionDetailPage;
