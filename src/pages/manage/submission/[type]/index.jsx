import React from "react";
import PropTypes from "prop-types";
import Dynamic from "next/dynamic";
import { useSelector } from "react-redux";

// services
import { fetchCompetitionSubmission } from "@services/competition_submission";

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
import { useRouter } from "next/router";

const LIST_TYPES = ["all", "checking", "valid", "won", "lost"];

const META = {
  all: {
    title: "Submission",
    description: "Semua submission kamu di Kompetisi Id",
  },
  checking: {
    title: "Submission - Menunggu Diterima",
    description: "Submission dengan status menunggu di validasi penyelenggara",
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
  const Router = useRouter();

  // initial ref
  // const firstRender = React.useRef(true);

  // initial global
  const Session = useSelector((state) => state.Session || {});

  // initial states
  const [loading, setLoading] = React.useState(false);
  const [response, setResponse] = React.useState({});

  // initial effects
  React.useEffect(() => {
    if (Session?.data && Router.query.type) fetchSubmission();
  }, [Session, Router.query]);

  // initial functions
  const fetchSubmission = async () => {
    if (!loading) {
      setLoading(true);
      const { type } = Router.query;

      let queryParams = {
        user_id: Session?.data?.id,
        status: type,
      };

      const Response = await fetchCompetitionSubmission({
        query: queryParams,
      });
      setResponse(Response);
      setLoading(false);
    }
  };

  // initial memo
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
      <SubmissionListBox
        isReadOnly
        submissionData={response}
        userData={Session}
        type="manage"
      />
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
