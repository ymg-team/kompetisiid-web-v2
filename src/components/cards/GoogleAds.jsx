import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
const { NODE_ENV, GOOGLE_ADSENSE_CLIENT } = publicRuntimeConfig;

// components
const Ads = styled.ins`
  display: block;
  margin: 30px 0;
  text-align: center;
`;

const GoogleAds = (props) => {
  React.useEffect(() => {
    renderGADS();
  }, []);

  const renderGADS = () => {
    // render new Google Ads
    if (NODE_ENV === "production") {
      if (props.timeout) {
        setTimeout(() => {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        }, props.timeout);
      } else {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    }
  };

  let style = { display: "block" };
  if (NODE_ENV !== "production") {
    style.backgroundColor = "#F4F4F4";
    style.height = "250px";
  }
  style = Object.assign(style, props.style);

  if (NODE_ENV !== "production") {
    return <Ads className="col-md-12" style={style} />;
  } else {
    return (
      <Ads
        className="adsbygoogle"
        style={style}
        data-ad-client={GOOGLE_ADSENSE_CLIENT}
        data-ad-slot={props.adSlot}
        data-ad-format="auto"
        data-full-width-responsive="true"
        data-adtest={props.adTest ? "on" : "off"}
      />
    );
  }
};

GoogleAds.propTypes = {
  adClient: PropTypes.string.isRequired,
  adSlot: PropTypes.number.isRequired,
  adTest: PropTypes.bool.isRequired,
  style: PropTypes.object,
  timeout: PropTypes.number,
};

GoogleAds.defaultProps = {
  adTest: false,
  adSlot: 0,
  adClient: "",
  style: {},
};

export default GoogleAds;
