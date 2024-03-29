import React, { useState, useEffect } from "react";
import { Colors } from "@configs/style";
import { initModalImages } from "@helpers/modal";
import { useRouter } from "next/router";

// helpers
import { getSession } from "@helpers/cookies";

// redux
import { useSelector, useDispatch } from "react-redux";
import { setSession } from "@store/session/actions";

// components
import Index from "@components/footers/GlobalFooter";
import Styled from "styled-components";
import Navbar from "@components/navigations/TransparentNavbar";
import Alert from "@components/alert/Base";
import FullScreenLoader from "@components/preloaders/FullPage";
import ImageModal from "@components/modals/ImageModal";
import NotificationConfirmModal from "@components/modals/NotificationConfirmation";

const StickyNoteStyle = {
  position: "fixed",
  bottom: 0,
  zIndex: 50,
  background: "#e74c3c",
  color: "#FFF",
  textAlign: "center",
  padding: "10px",
  width: "100%",
  fontWeight: "bold",
};

const StickyNoteLinkStyle = {
  color: "#FFF",
  textDecoration: "underline",
};

const BackToTop = Styled.button`
  outline: none;
  transition: bottom .5s ease, top .5s ease;
  padding: 5px 10px;
  background: ${Colors.mainWhite};
  position: fixed;
  bottom: 20px;
  right: 20px;
  border-radius: 20px;
  color: ${Colors.mainGray};
  border: 1px solid ${Colors.softGray};
`;

const LayoutStyled = Styled.div`
  min-height: 100%;
  .container{
    padding-left:0 !important;
    padding-right:0 !important;
  }

  // responsiveness
  // small screen
  @media only screen and (max-width: 543px) {
    .container{
      padding:0 !important;
    }
  }
`;

export const RoutesNoGAds = ["/login", "/register"];

const HomeLayoutV5 = ({ children, isFullScreen }) => {
  // redux
  const Dispatch = useDispatch();
  const Session = useSelector((state) => state.Session);

  const Router = useRouter();

  const [isHideNavbar, setIsHideNavbar] = useState(false);
  const [showBtnTop, setShowBtnTop] = useState(false);
  const [online, setOnline] = useState(true);
  // const [showNotifConfirmation, setShowNotifConfirmation] = useState(false);

  // init effects

  useEffect(() => {
    // componentDidMount

    // get session from cookies
    const session = getSession();
    // save session to redux store
    Dispatch(setSession({ session }));

    // init modal images
    initModalImages();

    // scroll event listener
    document.addEventListener("scroll", (e) => {
      const position = window.scrollY;
      if (position > 500) {
        if (!showBtnTop) setShowBtnTop(true);
      } else {
        if (showBtnTop) setShowBtnTop(false);
      }
    });

    // online / offline listener
    window.addEventListener("online", () => _updateOnlineStatus());
    window.addEventListener("offline", () => _updateOnlineStatus());
  }, []);

  useEffect(() => {
    if (window.ga) {
      // ref : https://developers.google.com/analytics/devguides/collection/gajs/
      ga("send", "pageview", Router.asPath);
    }
  }, [Router.pathnasPathame]);

  // init memos

  // init functions
  // const resendEmailVerification = () => {}

  // function to trigger is offline / online
  const _updateOnlineStatus = () => {
    setOnline(navigator.onLine);
  };

  let onlineWrapperStyle = {};

  if (!online) {
    onlineWrapperStyle = {
      opacity: "0.4",
      filter: "blur(4px)",
      pointerEvents: "none",
    };
  }

  return (
    <LayoutStyled>
      {/* offline wrapper */}
      <div style={onlineWrapperStyle}>
        {!isHideNavbar && !isFullScreen && <Navbar />}

        {children}

        {!isFullScreen && <Index />}

        {/* button click to go top */}
        <BackToTop
          onClick={() => {
            // ref: https://stackoverflow.com/a/1145012/2780875
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          style={!showBtnTop ? { bottom: "-200px" } : {}}
        >
          <i className="fas fa-chevron-up"></i>
        </BackToTop>
      </div>
      {/* end of offline wrapper */}

      {/* global component */}
      <Alert />
      <FullScreenLoader />
      {/* global component */}

      {/* global modal */}
      <ImageModal />
      <NotificationConfirmModal />
      {/* end of global modal */}

      {/* notification of network is offline */}
      {/* notification to verify email */}
      {!online ? (
        <div style={StickyNoteStyle}>
          {'Jaringan kamu sedang "offline", yang sabar ya :('}
        </div>
      ) : !isFullScreen && Session && Session.id && !Session.is_verified ? (
        <div style={StickyNoteStyle}>
          Kamu belum melakukan verifikasi email, segera cek email kamu. Atau
          klik{" "}
          <a
            onClick={(e) => {
              e.preventDefault();
              // props.dispatch(resendEmailValidationToken());
            }}
            style={StickyNoteLinkStyle}
            href="src/layouts#"
          >
            kirim ulang link verifikasi
          </a>
        </div>
      ) : null}
    </LayoutStyled>
  );
};

HomeLayoutV5.defaultProps = {
  isFullScreen: false,
  isHideNavbar: false,
};

export default HomeLayoutV5;
