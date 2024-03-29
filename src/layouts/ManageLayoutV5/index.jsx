import React from "react";
import Dynamic from "next/dynamic";

// helpers
import { getSession, clearSession } from "@helpers/cookies";

// redux
import { useDispatch, useSelector } from "react-redux";
import { setSession } from "@store/session/actions";

// components
import GlobalLoader from "@components/preloaders/GlobalLoader";
import { alert } from "@components/alert/Base";
import { fullPageLoader } from "@components/preloaders/FullPage";

// components
import Loading from "@components/preloaders/FullContentLoader";
import { useRouter } from "next/router";

const Sidebar = Dynamic(import("@components/navigations/_manage/Sidebar"), {
  loading: Loading,
});

let sessionChecker;

const Index = ({ children }) => {
  const Router = useRouter();

  // initial redux
  const Dispatch = useDispatch();
  const Session = useSelector((state) => state.Session);

  // initial effects
  React.useEffect(() => {
    // get session from cookies
    const session = getSession();
    // save session to redux store
    Dispatch(setSession({ session }));
  }, []);

  React.useEffect(() => {
    clearTimeout(sessionChecker);
    sessionChecker = setTimeout(() => {
      console.log(Router.asPath, Session);

      // handle already login and in login / register page
      if (
        Session.status === 200 &&
        (Router.asPath === "/login" || Router.asPath === "/register")
      ) {
        location.href = "/manage";
      }
      // handle not login but open manage pages
      if (
        Session.status !== 200 &&
        Router.asPath !== "/login" &&
        Router.asPath !== "/register"
      ) {
        location.href = "/login";
      }
    }, 500);
  }, [Session, Router.asPath]);

  // function to handlong logout action
  const handleLogout = () => {
    fullPageLoader(true);
    clearSession();
    setTimeout(() => {
      alert(true, "Kamu telah logout", "success");
      location.href = "/login";
    }, 1000);
  };

  const showSidebar = React.useMemo(() => {
    return (
      Session.status === 200 &&
      Router.asPath !== "/login" &&
      Router.asPath !== "/register"
    );
  }, [Router.asPath, Session]);

  return (
    <div className="container">
      <div className="row m-t-2em">
        {showSidebar && (
          <div className="col-md-3 col-sm-12">
            <Sidebar handleLogout={() => handleLogout()} stats={{}} />
          </div>
        )}
        <div className={showSidebar ? "col-md-9 col-sm-12" : "col-12"}>
          {!Session.status &&
          Router.asPath !== "/login" &&
          Router.asPath !== "/register" ? (
            <GlobalLoader />
          ) : (
            <div style={{ paddingTop: 10 }}>{children}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
