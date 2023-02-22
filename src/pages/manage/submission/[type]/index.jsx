import React from "react";
import PropTypes from "prop-types";
import Dynamic from "next/dynamic";

// components
import Loading from "@components/preloaders/GlobalLoader";
import SEO from "@components/meta/SEO";
import FullPageError from "~/src/components/boxs/FullPageError";
import HeaderDashboard from "@components/headers/HeaderDashboard";

const SubmissionListBox = Dynamic(
  () => import("@components/boxs/_manage/SubmissionListBox"),
  {
    loading: Loading,
  }
);

// layouts
import ManageLayout from "@layouts/ManageLayoutV5";

const LIST_TYPES = ["checking", "valid", "won", "lost"];

const META = {
  checking: {
    title: "Submission - Menunggu Diterima",
    description:
      "Kompetisi yang kamu ikuti status menunggu di validasi penyelenggara",
  },
  valid: {
    title: "Submission - Valid",
    description:
      "Submission yang telah kamu kirim telah di validasi oleh penyelenggara, tunggu pengumuman pemenang ya",
  },
  won: {
    title: "Submission - Menang",
    description: "Kompetisi yang telah kamu menangkan di Kompetisi Id",
  },
  lost: {
    title: "Submission - Kalah",
    description:
      "Kompetisi yang telah kamu ikuti di Kompetisi id dan kalah, jangan menyerah :)",
  },
};

const ListSubmission = ({ type }) => {
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
      <SubmissionListBox isReadOnly />
    </ManageLayout>
  );
};

ListSubmission.propTypes = {
  type: PropTypes.oneOf(["checking", "", "ended", "won", "lost"]),
};

ListSubmission.getInitialProps = (ctx) => {
  const { query = {} } = ctx || {};
  return {
    type: query.type,
  };
};

export default ListSubmission;
