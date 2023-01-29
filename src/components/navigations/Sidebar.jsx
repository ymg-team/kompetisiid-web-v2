import React from "react";
import Styled from "styled-components";
import Link from "next/link";
import Label from "../Label";

const SidebarMobileStyle = `
  background: #ececec;
  position: fixed;
  z-index: 1;
  height: 100vh;
  left: -100%;
  top: 57px;
  transition: all .5s ease;
  padding: 0 15px; 
  overflow: auto;
  &.active {
    left: 0;
  } 
`;

export const SidebarStyled = Styled.div`
ul {
  list-style: none;
  padding: 0;
  margin-top:0;
  li {
    padding: 0.5em 0;
    strong {
      margin-top: 30px;
      display: block;
    }
    a {
      text-decoration: none;
      &:hover, &:focus, &.active {
        font-weight: bold;
      }
    }
    &.active {
      a {
        font-weight: bold;
      }
    }
    
  }
}

// responsiveness

// small screen
@media only screen and (max-width: 543px) {
  ${SidebarMobileStyle}
}

// medium screen
@media only screen and (min-width: 544px) and (max-width: 767px) {
  ${SidebarMobileStyle}
}
`;

const Sidebar = (props) => {
  // initial refs
  const SideBarRef = React.useRef(null);

  // initial functions

  // click handler
  const clickHandler = React.useCallback((e) => {
    if (
      SideBarRef &&
      SideBarRef.current &&
      (!SideBarRef.current.contains(e.target) ||
        e.target.className === "fas fa-bars")
    ) {
      toggleMenus(
        !SideBarRef.current.contains(e.target) &&
          e.target.className !== "fas fa-bars"
      );
    }
  });

  // menus toggler
  const toggleMenus = (hide) => {
    const sidebarEl = document.getElementById("dashboard-sidebar");
    if (sidebarEl) {
      sidebarEl.style.left =
        hide || (sidebarEl.style.left && sidebarEl.style.left === "0px")
          ? "-100%"
          : "0px";
    }
  };

  // initial effects
  // componentDidMount(), listen outside menu box
  React.useEffect(() => {
    document.addEventListener("click", clickHandler);

    // component will unmount
    return () => {
      document.removeEventListener("click", clickHandler);
    };
  }, []);

  return (
    <SidebarStyled
      ref={SideBarRef}
      className="dashboard-sidebar"
      id="dashboard-sidebar"
    >
      <ul>
        {props.menus.map((n) => {
          return (
            <React.Fragment key={n.title}>
              <li>
                {!n.child ? (
                  n.to !== "#" ? (
                    <Link href={n.to}>
                      <a onClick={() => toggleMenus()}>{n.title}</a>
                    </Link>
                  ) : (
                    <a
                      onClick={(e) => {
                        e.preventDefault();
                        toggleMenus();
                        n.onClick();
                      }}
                      href="#"
                    >
                      {n.title}
                    </a>
                  )
                ) : (
                  <strong>{n.title}</strong>
                )}
              </li>
              {n.child
                ? n.child.map((m) => {
                    return !m.hide ? (
                      <li key={m.title}>
                        {m.to === "#" ? (
                          <a
                            onClick={(e) => {
                              e.preventDefault();
                              toggleMenus();
                              m.onClick();
                            }}
                            href="#"
                          >
                            {m.title}
                          </a>
                        ) : (
                          <Link href={m.to}>
                            <a
                              onClick={() => {
                                toggleMenus();
                              }}
                            >
                              {m.icon && <i className={m.icon} />} {m.title}
                              {m.label && m.label.text && (
                                <>
                                  &nbsp;
                                  <Label
                                    type={m.label.color || "blue"}
                                    text={m.label.text}
                                  />
                                </>
                              )}
                            </a>
                          </Link>
                        )}
                      </li>
                    ) : null;
                  })
                : null}
            </React.Fragment>
          );
        })}
      </ul>
    </SidebarStyled>
  );
};

export default Sidebar;
