import React, { useEffect, useState } from "react";
import { nominalToText } from "../../../helpers/number";
import HomeSliderStyled from "./styled";

// components
import Loader from "../../preloaders/GlobalLoader";

let IntervalSlider;

const HomeSubHeader = (props) => {
  const [sliderStart, setSliderStart] = useState(false);
  const [sliderShow, setSliderShow] = useState(false);

  const { data = [] } = props.slider || {};

  const renderSlider = () => {
    IntervalSlider = setInterval(() => {
      if (window && window.Glide) {
        clearInterval(IntervalSlider);
        new Glide("#homepage-subheader", {
          type: "carousel",
          startAt: 0,
          perView: 2,
          hoverpause: true,
          animationDuration: 200,
          autoplay: 5000,
        }).mount();
        setSliderShow(true);
      }
    }, 200);
  };

  useEffect(() => {
    // setSliderStart(true)
    if (
      typeof window !== "undefined" &&
      props.slider.status &&
      props.slider.status === 200 &&
      !sliderStart
    ) {
      setSliderStart(true);
      renderSlider();
    }
  }, [props.slider]);

  return (
    <HomeSliderStyled>
      <div className="subheader-content home-slider">
        {/*<div className="home-slider__wrapper">*/}
        <div className="glide" id="homepage-subheader">
          {!sliderStart && (
            <div style={{ width: "100%", height: "100%" }}>
              <Loader style={{ marginBottom: 60 }} />
            </div>
          )}
          <div className="glide__track" data-glide-el="track">
            <div
              style={!sliderShow || !sliderStart ? { display: "none" } : {}}
              className="glide__slides"
            >
              {data.map((n, key) => (
                <CompetitionSlider mainTopic={key === 0} key={n.id} {...n} />
              ))}
            </div>
          </div>
          <div
            className="glide__bullets"
            data-glide-el="controls[nav]"
            style={!sliderStart ? { display: "none" } : {}}
          >
            {data.map((n, key) => {
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

      {/*</div>*/}
    </HomeSliderStyled>
  );
};

const CompetitionSlider = (props) => {
  const hrefTarget = `/competition/${props.id}/regulations/${props.nospace_title}`;
  return (
    <div className={`competition-slider`}>
      <div
        className="hide-mobile competition-slider_poster col-md-4"
        style={{ backgroundImage: `url(${props.poster.original})` }}
      />
      <div className="competition-slider_text col-md-8">
        <div>
          <div className="col-md-12">
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
              href={hrefTarget}
              onClick={(e) => {
                e.preventDefault();
                window.transitionTo(hrefTarget);
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
