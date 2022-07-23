import React, { useEffect } from "react";

// component
import SEO from "@components/meta/SEO";
import SubHeader from "@components/Subheader";
import CalendarBox from "@components/boxs/CalendarBox";
import GAds from "@components/cards/GoogleAds";

const BreadcrumbData = [
  {
    title: "Home",
    link: "/",
  },
  {
    title: "Kalender Kompetisi",
    link: "/calendar",
  },
];

const title = "Kalender Kompetisi";
const desc =
  "Kelender kompetisi ini berisi berbagai waktu deadline dan pengumuman dari semua kompetisi di Kompetisi Id";

const CalendarContainer = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scroll(0, 0);
    }
  }, []);

  return (
    <>
      <SEO title={title} description={desc} />
      <SubHeader title={title} desc={desc} breadcrumb={BreadcrumbData} />
      <div className="row">
        <div className="col-md-12 align-center">
          <GAds
            adClient="ca-pub-4468477322781117"
            adSlot={1041612608}
            timeout={1000}
          />
        </div>
      </div>
      <CalendarBox />
    </>
  );
};

export default CalendarContainer;
