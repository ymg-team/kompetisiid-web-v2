import React from "react";

// layouts
import ManageLayout from "@layouts/ManageLayoutV5";

// components
import Spacer from "@components/boxs/Spacer";
import HeaderDashboard from "@components/Headers/HeaderDashboard";
import CountBox from "@components/boxs/_super/CountBox";

const BOX_AS_PARTICIPANTS = [
  {
    text: "Berlangsung",
    count: 0,
    link: "/manage/competition/as-participant/live",
  },
  {
    text: "Selesai",
    count: 0,
    link: "/manage/competition/as-participant/end",
  },
  {
    text: "Menang",
    count: 0,
    link: "/manage/competition/as-participant/won",
  },
  {
    text: "Gagal",
    count: 0,
    link: "/manage/competition/as-participant/lost",
  },
];

const BOX_AS_ORGANIZER = [
  {
    text: "Menunggu",
    count: 0,
    link: "/manage/competition/as-organizer/waiting",
  },
  {
    text: "Terpublikasi",
    count: 0,
    link: "/manage/competition/as-organizer/published",
  },
  {
    text: "Ditolak",
    count: 0,
    link: "/manage/competition/as-organizer/rejected",
  },
];

const ManageDashboardPage = () => {
  return (
    <ManageLayout>
      {/* box as participant */}
      <div className="row">
        <div className="col-md-12">
          <HeaderDashboard
            title="Sebagai Peserta"
            text="Seluruh kompetisi yang kamu ikuti sebagai peserta"
          />
        </div>
        {BOX_AS_PARTICIPANTS.map((n) => (
          <div style={{ marginTop: 20 }} className="col-md-3 col-xs-6">
            <CountBox count={n.count} text={n.text} link={n.link} />
          </div>
        ))}
      </div>
      {/* end of box as participant */}

      <Spacer size="large" />

      {/* box as organizer */}
      <div className="row">
        <div className="col-md-12">
          <HeaderDashboard
            title="Sebagai Penyelenggara"
            text="Seluruh kompetisi yang kamu ikuti sebagai peserta"
          />
        </div>
        {BOX_AS_ORGANIZER.map((n) => (
          <div style={{ marginTop: 20 }} className="col-md-3 col-xs-6">
            <CountBox count={n.count} text={n.text} link={n.link} />
          </div>
        ))}
      </div>
      {/* end of box as organizer */}
    </ManageLayout>
  );
};

export default ManageDashboardPage;
