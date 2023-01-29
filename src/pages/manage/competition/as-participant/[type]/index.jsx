import React from "react";
import PropTypes from "prop-types";

// components
import SEO from "@components/meta/SEO";
import FullPageError from "~/src/components/boxs/FullPageError";
import HeaderDashboard from "@components/headers/HeaderDashboard";
import CompetitionBox from "@components/boxs/_manage/CompetitionBox";

// layouts
import ManageLayout from "@layouts/ManageLayoutV5";

const LIST_TYPES = ["live", "ended", "won", "lost"];

const META = {
  live: {
    title: "Join Kompetisi - Sedang Berlangsung",
    description:
      "Kompetisi yang kamu ikuti, dan saat ini kompetisi sedang berlangsung hingga menunggu pengumuman pemenang",
  },
};

const ListCompetitionAsParticipantPages = ({ type }) => {
  const meta = React.useMemo(() => {
    return META[type];
  }, [type]);

  if (!LIST_TYPES.includes(type))
    return (
      <FullPageError
        message={"Halaman yang anda kunjungi tidak ditemukan"}
        code={"404"}
      />
    );
  return (
    <ManageLayout>
      <SEO {...meta} />
      <HeaderDashboard title={meta.title} text={meta.description} />
      <CompetitionBox type="as-participant" />
    </ManageLayout>
  );
};

ListCompetitionAsParticipantPages.propTypes = {
  type: PropTypes.oneOf(["live", "ended", "won", "lost"]),
};

ListCompetitionAsParticipantPages.getInitialProps = (ctx) => {
  const { query = {} } = ctx || {};
  return {
    type: query.type,
  };
};

export default ListCompetitionAsParticipantPages;
