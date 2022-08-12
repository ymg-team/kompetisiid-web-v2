import React from "react";
import Link from "next/link";
import Label from "../Label";
import { TabStyled } from "../navigations/Tab";

const TabCompetition = (props) => {
  const n_pengumuman = props.data ? props.data.announcement.length : 0;
  const n_kontak = props.data ? props.data.contacts.length : 0;

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
                {tab.map((n, key) => (
                  <li key={key} className={props.active == key ? "active" : ""}>
                    <Link
                      href={`/competition/${props.data.id}/${tab[key].link}/${props.data.nospace_title}`}
                      scroll={false}
                    >
                      <a>
                        {n.name}
                        &nbsp;
                        {/* count announcements */}
                        {n.name == "pengumuman" && n_pengumuman > 0 && (
                          <Label
                            type={props.active - 1 == key ? "red" : "white"}
                            text={n_pengumuman}
                          />
                        )}
                        {/* count contacts */}
                        {n.name == "kontak" && n_kontak > 0 && (
                          <Label
                            type={props.active - 1 == key ? "red" : "white"}
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
