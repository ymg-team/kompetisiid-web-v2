import React, { useState, useMemo, useEffect } from "react";
import { Colors } from "~/src/config/style";
import { initModalImages } from "~/src/helpers/modal";
import { useRouter } from "next/router";
// import { resendEmailValidationToken } from "~src/../../store/user/actions";

// components
import Footer from "../components/Footer";
import Styled from "styled-components";
import Navbar from "../components/navigations/TransparentNavbar";
import Alert from "../components/Alert";
import FullScreenLoader from "../components/preloaders/FullPage";
import ImageModal from "../components/modals/ImageModal";
import NotificationConfirmModal from "../components/modals/NotificationConfirmation";
import GAds from "../components/cards/GoogleAds";

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

let addedEventScroll = false;

const RootLayoutV5 = ({ children }) => {
  const Router = useRouter();

  const [isHideNavbar, setIsHideNavbar] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showBtnTop, setShowBtnTop] = useState(false);
  const [online, setOnline] = useState(true);
  const [showNotifConfirmation, setShowNotifConfirmation] = useState(false);

  const session = {};

  // init effects
  useEffect(() => {
    // componentDidMount

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
        {!isHideNavbar && <Navbar />}

        {children}

        {/* gads */}
        {!isFullScreen ? (
          <div className="col-md-12 align-center">
            <GAds
              adClient="ca-pub-4468477322781117"
              adSlot={5218613800}
              // adTest={true}
            />
          </div>
        ) : null}
        {/* gads */}

        {!isFullScreen && <Footer />}

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
          Jaringan kamu sedang "offline", yang sabar ya :(
        </div>
      ) : !isFullScreen && session && session.id && !session.is_verified ? (
        <div style={StickyNoteStyle}>
          Kamu belum melakukan verifikasi email, segera cek email kamu. Atau
          klik{" "}
          <a
            onClick={(e) => {
              e.preventDefault();
              // props.dispatch(resendEmailValidationToken());
            }}
            style={StickyNoteLinkStyle}
            href="#"
          >
            kirim ulang link verifikasi
          </a>
        </div>
      ) : null}
    </LayoutStyled>
  );
};

RootLayoutV5.defaultProps = {
  isFullScreen: false,
};

export default RootLayoutV5;
