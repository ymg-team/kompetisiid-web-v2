import React, { useEffect } from "react";
import Link from "next/link";

import { alert } from "../Alert";
import { connect } from "react-redux";
import { logout as logoutAction } from "../../../store/user/actions";
import { useRouter } from "next/router";

const Header = (props) => {
  const Router = useRouter();

  const { q, session, dispatch, setState, logout } = props;

  const handleSearch = (e) => {
    if (e.keyCode == 13) {
      Router.push({
        pathname: "/browse",
        query: {
          keyword: q,
          status: "active",
        },
      });
    }
  };

  const handleLogout = () => {
    alert(true, "logout...", "warning");
    dispatch(logoutAction());
  };

  useEffect(() => {
    if (logout.meta) {
      if (logout.meta.code === 201) {
        setTimeout(() => {
          window.location.href = "/";
        }, 1500);
        alert(true, logout.meta.message, "success", false);
      } else {
        alert(true, logout.meta.message, "error");
      }
    }
  }, [logout]);

  console.log("session", session);

  return (
    <nav>
      <div style={{ top: q ? "-50px" : "0px" }} className="nav-header">
        <a id="btn-menu" href="#" onClick={(e) => e.preventDefault()}>
          <span className="fa fa-bars" />
        </a>
        <div className="nav-left">
          <a
            className="only-mobile"
            href="#"
            onClick={(e) => e.preventDefault()}
            id="btn-show-nav"
          >
            <img
              src="/assets/4.2/img/icon-128x128.png"
              style={{ width: "40px" }}
            />
          </a>
          <ul className="top-menu" id="top-menu">
            <a
              style={{ position: "absolute", top: "0.5em", right: "0.5em" }}
              id="btn-hide-nav"
              className=" btn-close-nav only-mobile fas fa-times"
              href="#"
              onClick={(e) => e.preventDefault()}
            />
            <li>
              <Link
                legacyBehavior
                onClick={() => toggleNavTop()}
                href="/browse"
              >
                <a>jelajah</a>
              </Link>
            </li>
            <li>
              <Link legacyBehavior onClick={() => toggleNavTop()} href="/add">
                <a>pasang</a>
              </Link>
            </li>
            <li>
              <Link legacyBehavior onClick={() => toggleNavTop()} href="/news">
                <a>kabar</a>
              </Link>
            </li>
          </ul>
        </div>
        <div className="logo hide-mobile">
          <Link legacyBehavior href="/">
            <a className="stage">
              <img id="ki-logo" src="/assets/4.2/img/icon-128x128.png" />
            </a>
          </Link>
        </div>
        <div className="nav-right">
          <ul className="top-menu">
            <li>
              <a
                id="btn-search"
                href="#"
                onClick={(e) => e.preventDefault()}
                title="click untuk melakukan pencarian"
              >
                {" "}
                <span className="fa fa-search" />
              </a>
            </li>
            {Object.keys(session).length > 0 && session.id ? (
              <li>
                <div className="dropdown">
                  <a
                    className="avatar"
                    href="#"
                    onClick={(e) => e.preventDefault()}
                  >
                    <img
                      className="dropdown-button"
                      src={session.avatar.small}
                      data-target="avatar-menu"
                      alt="dropdown button"
                    />
                  </a>
                  <div className="dropdown-items" id="avatar-menu">
                    <ul>
                      <li>
                        <Link legacyBehavior href={`/user/${session.username}`}>
                          <a>Profil saya</a>
                        </Link>
                      </li>
                      {["admin", "moderator"].includes(session.level) ? (
                        <li>
                          <a href={`/super/dashboard`}>Super</a>
                        </li>
                      ) : null}
                      <li>
                        <a href={`/manage`}>Manage</a>
                      </li>
                      <li>
                        <a href="/settings/profile">Pengaturan Profil</a>
                      </li>
                      <li>
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            handleLogout();
                          }}
                        >
                          Logout
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
            ) : (
              <li style={{ display: "none" }} className="hide-mobile">
                <Link legacyBehavior href="/login">
                  <a>login</a>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
      <div className="nav-search">
        <label htmlFor="search">Pencarian </label>
        <input
          type="text"
          value={q || ""}
          placeholder="tekan enter untuk submit"
          onChange={(e) => setState({ q: e.target.value })}
          onKeyDown={(e) => handleSearch(e)}
        />
        <a
          id="btn-closesearch"
          onClick={(e) => {
            e.preventDefault();
            if (q != "") return Router.push("/browse");
          }}
          href="#"
          title="tutup pencarian"
        >
          {" "}
          <span className="fas fa-times" />
        </a>
      </div>
    </nav>
  );
};

function mapStateToProps(state) {
  const { User } = state;
  return {
    session: User.session,
    logout: User.logout,
  };
}

export default connect(mapStateToProps)(Header);
