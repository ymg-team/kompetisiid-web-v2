import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { nominalToText } from "../../../helpers/number";
import HomeSliderStyled from "./styled";

// components
import Loader from "../../preloaders/GlobalLoader";
import { toSlug } from "string-manager/dist/modules/slug";

let IntervalSlider = null;

const HomeSubHeader = ({ slider }) => {
  const [sliderStart, setSliderStart] = useState(false);
  const [sliderShow, setSliderShow] = useState(false);

  const renderSlider = React.useCallback(() => {
    IntervalSlider = setInterval(() => {
      if (window && window.Glide && slider.status === 200 && !sliderStart) {
        new Glide("#homepage-subheader", {
          type: "carousel",
          startAt: 0,
          perView: 2,
          hoverpause: true,
          animationDuration: 500,
          autoplay: 5000,
        }).mount();
        clearInterval(IntervalSlider);
        setSliderStart(true);
        setSliderShow(true);
      }
    }, 100);
  }, [slider, sliderStart]);

  useEffect(() => {
    if (slider.status === 200 && !sliderStart) {
      renderSlider();
    }
  }, [slider, sliderStart]);

  return (
    <HomeSliderStyled>
      <div className="subheader-content home-slider">
        <div className="glide" id="homepage-subheader">
          {!sliderStart && (
            <div style={{ width: "100%", height: "100%" }}>
              <Loader style={{ marginBottom: 60 }} />
            </div>
          )}
          <div
            style={{ display: sliderStart ? "show" : "hide" }}
            className="glide__track"
            data-glide-el="track"
          >
            <div
              style={!sliderShow || !sliderStart ? { display: "none" } : {}}
              className="glide__slides"
            >
              {slider.status === 200 &&
                slider.data.competitions.map((n, key) => (
                  <CompetitionSlider mainTopic={key === 0} key={n.id} {...n} />
                ))}
            </div>
          </div>
          <div
            className="glide__bullets"
            data-glide-el="controls[nav]"
            style={!sliderStart ? { display: "none" } : {}}
          >
            {slider.status === 200 &&
              slider.data.competitions.map((n, key) => {
                return (
                  <button
                    className="glide__bullet"
                    data-glide-dir={`=${key}`}
                    key={key}
                  />
                );
              })}
          </div>
        </div>
      </div>
    </HomeSliderStyled>
  );
};

HomeSubHeader.defaultProps = {
  slider: {},
};

const CompetitionSlider = (props) => {
  const Router = useRouter();

  const hrefTarget = `/competition/${props.id}/regulations/${toSlug(
    props.title.toLowerCase()
  )}`;
  return (
    <div className={`competition-slider`}>
      <div
        onClick={() => Router.push(hrefTarget)}
        className="hide-mobile competition-slider_poster col-md-4"
        style={{
          backgroundImage: `url(${props.poster.original})`,
          cursor: "pointer",
        }}
      />
      <div className="competition-slider_text col-md-8">
        <div>
          <div
            style={{ cursor: "pointer" }}
            className="col-md-12"
            onClick={() => Router.push(hrefTarget)}
          >
            {props.mainTopic ? <h1>{props.title}</h1> : <h2>{props.title}</h2>}
          </div>
          <div className="col-md-12">
            <div className="text">
              <div className="text__prize">
                <strong>
                  Hadiah senilai {nominalToText(props.prize.total)}
                </strong>
              </div>
              {props.sort}
            </div>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                Router.push(hrefTarget);
              }}
              className="btn btn-bordergray btn-rounded"
            >
              Selengkapnya
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeSubHeader;
