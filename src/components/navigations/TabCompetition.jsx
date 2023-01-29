import React from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import Label from "../Label";
import { TabStyled } from "@components/tabs/base";

export const tab = [
  {
    name: "hadiah",
    link: "prizes",
  },
  {
    name: "peraturan",
    link: "regulations",
  },
  {
    name: "pengumuman",
    link: "announcements",
  },
  {
    name: "diskusi",
    link: "discussions",
  },
  {
    name: "kontak",
    link: "contacts",
  },
  {
    name: "share",
    link: "share",
  },
];

const TabCompetition = ({ data, active }) => {
  const Session = useSelector((State) => State.Session);

  const n_pengumuman = React.useMemo(() => {
    return data ? data.announcement.length : 0;
  }, [data]);

  const n_kontak = React.useMemo(() => {
    return data ? data.contacts.length : 0;
  }, [data]);

  const tabList = React.useMemo(() => {
    const tabList = tab;

    if (data.is_manage_by_ki && tabList.length < 7 && Session.status === 200) {
      tabList.push({
        name: "My Submission",
        link: "submission",
      });
    }

    return tabList;
  }, [data, Session]);

  return (
    <TabStyled
      id="container-competition-tab"
      className="row no-margin container-competition-tab"
    >
      <div className="container">
        <div className="row">
          <div className="col-md-10 col-md-push-1">
            <div className="tab-competition">
              <ul className="horizontal-menu">
                {tabList.map((n, key) => (
                  <li key={key} className={active == key ? "active" : ""}>
                    <Link
                      href={`/competition/${data.id}/${
                        tab[key].link
                      }/${data.nospace_title.toLowerCase()}`}
                      scroll={false}
                    >
                      <a>
                        {n.name}
                        &nbsp;
                        {/* count announcements */}
                        {n.name == "pengumuman" && n_pengumuman > 0 && (
                          <Label
                            type={active - 1 == key ? "red" : "white"}
                            text={n_pengumuman}
                          />
                        )}
                        {/* count contacts */}
                        {n.name == "kontak" && n_kontak > 0 && (
                          <Label
                            type={active - 1 == key ? "red" : "white"}
                            text={n_kontak}
                          />
                        )}
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </TabStyled>
  );
};

export default TabCompetition;
