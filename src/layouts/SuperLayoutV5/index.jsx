import React from "react";
import { useRouter } from "next/router";
import Dynamic from "next/dynamic";

// components
import Loading from "@components/preloaders/GlobalLoader";
import { alert } from "@components/alert/Base";
import { fullPageLoader } from "@components/preloaders/FullPage";
import { clearSession, getSession } from "@helpers/cookies";

const Sidebar = Dynamic(import("@components/navigations/_super/Sidebar"), {
  loading: Loading,
});

const SuperLayout = ({ children }) => {
  const Router = useRouter();

  // initial states
  const [session, setSession] = React.useState({});

  React.useEffect(() => {
    const SessionFromCookies = getSession();

    // redirect handler: if success login and on login super page
    if (SessionFromCookies.status === 200 && Router.pathname === "/super") {
      Router.push("/super/dashboard");
    }

    // user is not admin
    if (
      SessionFromCookies.status === 200 &&
      !["admin", "moderator"].includes(SessionFromCookies.data.level)
    ) {
      Router.push("/");
    }

    // redirect handler: login but access inside
    if (SessionFromCookies.status !== 200 && Router.pathname !== "/super")
      Router.push("/super");

    //save cookies data to state
    setSession(SessionFromCookies);
  }, []);

  const handleLogout = () => {
    fullPageLoader(true);
    // props.dispatch(logout())
    setTimeout(() => {
      alert(true, "Kamu telah logout", "success");
      // clear session
      clearSession();

      // redirect to homepage
      location.href = "/super";
    }, 2000);
  };

  return (
    <div className="container">
      {(!session.status && Router.asPath !== "/super") ||
      (session.status === 200 &&
        !["admin", "moderator"].includes(session.data.level)) ? (
        <Loading />
      ) : (
        <>
          <div className="row m-t-2em">
            {session.status === 200 && (
              <div className="col-md-3 col-sm-12">
                <Sidebar handleLogout={() => handleLogout()} stats={{}} />
              </div>
            )}
            <div
              className={
                session.status === 200 ? "col-md-9 col-sm-12" : "col-12"
              }
            >
              {" "}
              {children}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SuperLayout;
