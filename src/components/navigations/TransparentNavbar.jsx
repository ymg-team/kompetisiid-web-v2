import React from "react";
import { useRouter } from "next/router";
import Styled from "styled-components";
import { Colors } from "~/src/config/style";

// components
import Link from "next/link";

const Menus = [
  {
    link: "/browse?status=active",
    text: "Jelajah",
    title: "Jelajahi kompetisi dari berbagai kategori",
  },
  {
    link: "/add",
    text: "Pasang",
    title: "Pasang Kompetisi disini, gratis!",
  },
  {
    link: "/news",
    text: "Kabar",
    title: "Kumpulan kabar seputar Kompetisi di Indonesia",
  },
  {
    link: "/calendar",
    text: "Kalender",
    title: "Kalender kompetisi se-Indonesia",
  },
];

const StickyNavbarStyled = Styled.div`
  width: 100%;
  transition: top .5s ease;
  &.sticky {
    position: fixed;
    top: -100px;
    background: #ffffffde;
    color: ${Colors.mainGray};
    z-index: 20;
    a {
      color: ${Colors.mainGray};
    }
    input[type="search"] {
      border-bottom: 2px solid ${Colors.mainGray};
      color: ${Colors.mainGray};
    }
    .bg-gray {
      background: transparent;
    }
  }
`;

const NavbarStyled = Styled.div`

  #ki-logo {
    width: 40px;
    height: 40px;
    display: block;
    background-size: contain;
  }

  #btn-sidebar {
    font-size: 32px;
    display: none;
  }

  padding: .5em 0;
  transition: all .5s ease;

  &.fixed {
    position: fixed;
    width: 100%;
    z-index: 10;
  }

  &.bg-gray {
    color: #3a3a3a;
    a {
      color: #3a3a3a;
    }
    input[type="search"] {
      border-bottom: 2px solid #3a3a3a;
      color: #3a3a3a;
    }
  }

  a {
    transition: all .5s ease;
    // color: #FFF;
    text-decoration: none;
    &:hover {
      font-weight: bold
    }
  }

  ul.inline-list {
    height: 40px;
    li {
      padding: 7.5px 10px
    }
  }

  #avatar-menu {
    a {
      color: ${Colors.mainGray}
    }
  }


  a.avatar {
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }
    

  // responsiveness
  // small screen
  @media only screen and (max-width: 543px) {
    #btn-sidebar {
      display: block;
    }
  }

  // medium screen
  @media only screen and (min-width: 544px) and (max-width: 767px) {
    #btn-sidebar {
      display: block;
    }
  }

`;

const SearchStyled = Styled.div`
  input[type="search"] {
    width: 100%;
    background: transparent;
    outline: none;
    border: none;
    border-bottom: 2px solid ${Colors.mainGray};
    color: ${Colors.mainGray};
  }
`;

const Navbar = (props) => {
  const Router = useRouter();

  const session = {};
  const pathnameArr = Router.pathname.split("/");

  // initial states
  const [search, setSearch] = React.useState(false);
  const [keyword, setKeyword] = React.useState("");
  const [sticky, setSticky] = React.useState(false);
  const [styleNavbar, setStyleNavbar] = React.useState({});

  // initial effects

  React.useEffect(() => {
    const { query } = Router;
    setSearch(typeof query.search !== "undefined");
    setKeyword(query.search || "");
  }, [Router.query]);

  // componentDidMount and componentWilUnmount
  React.useEffect(() => {
    // scroll event listener
    document.addEventListener("scroll", handleStickyNavbar);

    return () => {
      // remove event listener
      document.removeEventListener("scroll", handleStickyNavbar);
      // trigger hide sidebar, set to default
    };
  }, []);

  // initial functions

  // handle sticky navbar
  const handleStickyNavbar = () => {
    const position = window.scrollY;
    if (position > 500) {
      const pathArr = window.location.pathname.split("/");
      if (!sticky && pathArr[1] !== "competition") {
        setSticky(true);
        setTimeout(() => {
          setStyleNavbar({ top: 0 });
        }, 100);
      }
    } else {
      setSticky(false);
      setStyleNavbar({ top: "-100px", position: "unset" });
    }
  };

  // toggle search on/off
  const toggleSearch = (close) => {
    setSearch(!search);
    setKeyword("");

    if (close) Router.push("/browse?status=active");
  };

  return (
    <StickyNavbarStyled
      style={styleNavbar}
      className={`${sticky ? "sticky" : ""}`}
    >
      <div className="container">
        <NavbarStyled session={session} className={`${props.className} row`}>
          {search ? (
            <SearchStyled>
              <div className="col-xs-12">
                <ul className="inline-list inline-list-left">
                  <li style={{ padding: "0 12px 0 0" }}>
                    <Link href="/">
                      <a
                        id="ki-logo"
                        style={{
                          backgroundImage: `url(/static/images/logos/maugowes/small-red-logo-transparent.png)`,
                        }}
                      />
                    </Link>
                  </li>
                  <li
                    style={{
                      width: "calc(100% - 40px - 40px - 10px)",
                      paddingTop: 6,
                    }}
                  >
                    <input
                      type="search"
                      autoFocus={true}
                      value={keyword}
                      onChange={(e) => setKeyword(e.target.value || "")}
                      onKeyDown={(e) => {
                        if (e.keyCode === 13 && keyword.trim() !== "") {
                          Router.push({
                            pathname: "/browse?status=active",
                            query: {
                              search: keyword,
                            },
                          });
                        }
                      }}
                    />
                  </li>
                  <li>
                    <a
                      onClick={(e) => {
                        e.preventDefault();
                        toggleSearch(close);
                      }}
                      className="fas fa-times"
                      href="#"
                    />
                  </li>
                </ul>
              </div>
            </SearchStyled>
          ) : (
            <React.Fragment>
              <div className="col-xs-6">
                <ul className="inline-list inline-list-left">
                  {/* button to toggle sidebar on super and dashboard */}
                  {["super", "dashboard", "settings"].includes(
                    pathnameArr[1]
                  ) ? (
                    <li style={{ padding: "0 12px 0 0" }}>
                      <a href="#" id="btn-sidebar">
                        <i className="fas fa-bars" style={{ paddingTop: 6 }} />
                      </a>
                    </li>
                  ) : null}
                  {/* end of button to toggle sidebar on super and dashboard */}

                  <li style={{ padding: "0px 12px 0 0" }}>
                    <Link href="/">
                      <a
                        id="ki-logo"
                        style={{
                          backgroundImage: `url(/static/images/logos/maugowes/small-red-logo-transparent.png)`,
                        }}
                      />
                    </Link>
                  </li>
                  {Menus.map((n) => (
                    <li key={n.link}>
                      <Link href={n.link}>
                        <a title={n.title}>{n.text}</a>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="col-xs-6">
                <ul className="inline-list inline-list-right">
                  <li>
                    <a
                      onClick={(e) => {
                        e.preventDefault(e);
                        toggleSearch();
                      }}
                      className="fas fa-search"
                      href="#"
                    />
                  </li>

                  {/* auth */}
                  {typeof session.id !== "undefined" ? (
                    <div
                      key="loggedin"
                      style={{
                        marginTop: -3,
                        marginRight: 35,
                        padding: "5px 10px",
                        float: "right",
                      }}
                    >
                      <div
                        style={{ position: "absolute" }}
                        className="dropdown"
                      >
                        <a
                          className="avatar"
                          href="#"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                            className="dropdown-button"
                            alt="dropdown button"
                            src={session.avatar.small}
                            data-target="avatar-menu"
                          />
                        </a>
                        <div className="dropdown-items" id="avatar-menu">
                          <ul>
                            <li>
                              <a href={`/user/${session.username}`}>
                                Profil saya
                              </a>
                            </li>
                            {["admin", "moderator"].includes(session.level) ? (
                              <li>
                                <a href={`/super/dashboard`}>Super</a>
                              </li>
                            ) : null}
                            <li>
                              <a href={`/dashboard`}>Dashboard</a>
                            </li>
                            <li>
                              <a href="/settings/profile">Pengaturan Profil</a>
                            </li>
                            <li>
                              <a
                                href="#"
                                onClick={(e) => {
                                  e.preventDefault();
                                  // props.dispatch(logout());
                                }}
                              >
                                Logout
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <li key="public">
                      <Link href="/login">
                        <a>Login</a>
                      </Link>
                    </li>
                  )}
                  {/* end of auth */}
                </ul>
              </div>
            </React.Fragment>
          )}
        </NavbarStyled>
      </div>
    </StickyNavbarStyled>
  );
};

Navbar.defaultProps = {
  className: "",
};

export default Navbar;
