import React from "react";

// components
import Sidebar from "../Sidebar";

const DashboardSidebar = (props) => {
  const stats =
    props.stats && props.stats.status === 200
      ? props.stats
      : { request: {}, competition: {}, news: {}, members: {} };

  const Menus = [
    {
      title: "Dashboard",
      to: "/manage",
    },
    // {
    //   title: "Sebagai Penyelenggara",
    //   child: [
    //     {
    //       title: "Kirim Kompetisi",
    //       icon: "fas fa-plus",
    //       to: "/manage/competition/create",
    //     },
    //     {
    //       title: "Kompetisi Menunggu",
    //       to: "/manage/competition/waiting",
    //       hide: !stats.competition.waiting,
    //       label: {
    //         color: "red",
    //         text: stats.competition.waiting,
    //       },
    //     },
    //     {
    //       title: "Kompetisi Berlangsung",
    //       to: "/manage/competition/live",
    //       label: {
    //         color: "blue",
    //         text: stats.competition.live,
    //       },
    //     },
    //     {
    //       title: "Kompetisi Terpublish",
    //       to: "/manage/competition/posted",
    //       label: {
    //         color: "blue",
    //         text: stats.competition.posted,
    //       },
    //     },
    //     {
    //       title: "Kompetisi Ditolak",
    //       to: "/manage/competition/rejected",
    //       label: {
    //         color: "blue",
    //         text: stats.competition.rejected,
    //       },
    //     },
    //   ],
    // },
    {
      title: "Submissions",
      child: [
        {
          title: "Semua",
          to: "/manage/submission/all",
        },
        {
          title: "Checking",
          to: "/manage/submission/checking",
        },
        {
          title: "Valid",
          to: "/manage/submission/valid",
        },
        {
          title: "Menang",
          to: "/manage/submission/won",
        },
        {
          title: "Gagal",
          to: "/manage/submission/lost",
        },
      ],
    },
    // {
    //   title: "Kompetisi Lainnya",
    //   child: [
    //     {
    //       title: "Kompetisi di Subscribe",
    //       to: "/manage/competition/subscribed",
    //     },
    //     {
    //       title: "Liked Competition",
    //       to: "/manage/competition/liked",
    //     },
    //   ],
    // },
    // {
    //   title: "Pengaturan",
    //   child: [
    //     {
    //       title: "Pengaturan Profil",
    //       to: "/settings/profile",
    //     },
    //     {
    //       title: "Pengaturan Akun",
    //       to: "/settings/account",
    //     },
    //     {
    //       title: "Logout",
    //       to: "#",
    //       onClick: () => {
    //         props.handleLogout();
    //       },
    //     },
    //   ],
    // },
  ];

  return <Sidebar menus={Menus} />;
};

export default DashboardSidebar;
