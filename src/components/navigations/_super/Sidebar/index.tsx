import React from "react";

// components
import Sidebar from "../../Sidebar";

const SuperSidebar = (props: any) => {
  const stats = React.useMemo(() => {
    return props.stats && props.stats.status === 200
      ? props.stats
      : { request: {}, competition: {}, news: {}, members: {} };
  }, [props.stats]);

  const Menus = React.useMemo(() => {
    return [
      {
        title: "Dashboard",
        to: "/super/dashboard",
      },
      {
        title: "Kompetisi",
        child: [
          {
            title: "Tambah Kompetisi",
            to: "/super/competitions/create",
            icon: "fas fa-plus",
          },
          {
            title: "All",
            to: "/super/competitions",
            label: stats.competition.waiting
              ? {
                  color: "red",
                  text: stats.competition.all,
                }
              : undefined,
          },
          {
            title: "Waiting",
            // hide: !stats.competition.waiting,
            to: "/super/competitions/waiting",
          },
          {
            title: "Active",
            to: "/super/competitions/active",
          },
          {
            title: "End",
            to: "/super/competitions/end",
          },
        ],
      },
      // {
      //   title: "Request",
      //   child: [
      //     {
      //       title: "Request Menunggu",
      //       to: "/super/requests/waiting",
      //       hide: !stats.request.waiting,
      //       label: {
      //         color: "blue",
      //         text: stats.request.waiting,
      //       },
      //     },
      //     {
      //       title: "Request Diterima",
      //       to: "/super/requests/posted",
      //       label: {
      //         color: "blue",
      //         text: stats.request.accept,
      //       },
      //     },
      //     {
      //       title: "Request Ditolak",
      //       to: "/super/requests/reject",
      //       label: {
      //         color: "blue",
      //         text: stats.request.reject,
      //       },
      //     },
      //   ],
      // },
      // {
      //   title: "Kabar",
      //   child: [
      //     {
      //       title: "Tambah Kabar",
      //       icon: "fas fa-plus",
      //       to: "/super/news/create",
      //     },
      //     {
      //       title: "Diposting",
      //       to: "/super/news/posted",
      //       label: {
      //         color: "blue",
      //         text: stats.news.posted,
      //       },
      //     },
      //     {
      //       title: "Draft",
      //       to: "/super/news/draft",
      //       label: {
      //         color: "blue",
      //         text: stats.news.draft,
      //       },
      //     },
      //   ],
      // },
      // {
      //   title: "Users",
      //   child: [
      //     {
      //       title: "Telah Konfirmasi",
      //       to: "/super/users/confirmed",
      //       label: {
      //         text: stats.members.verified,
      //       },
      //     },
      //     {
      //       title: "Belum Konfirmasi",
      //       to: "/super/users/unconfirmed",
      //       label: {
      //         text: stats.members.unverified,
      //       },
      //     },
      //     {
      //       title: "Banned",
      //       to: "/super/users/banned",
      //       label: {
      //         color: "red",
      //         text: stats.members.banned,
      //       },
      //     },
      //   ],
      // },
      {
        title: "Akun",
        child: [
          {
            title: "Logout",
            to: "#",
            onClick: () => props.handleLogout(),
          },
        ],
      },
    ];
  }, [stats]);

  return <Sidebar menus={Menus} />;
};

export default SuperSidebar;
