import Styled from "styled-components";
import { Colors } from "~/src/config/style";

const HomeSliderStyled = Styled.div`
transition: all .5s ease;
  
  &.bg-red {
    background-color: ${Colors.mainRed};
  }

  &.bg-blue {
    background-color: ${Colors.mainBlue};
  }

  .home-slider {
    padding: 0;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100%;
    max-width: 1800px;
    margin: 0 auto;
    
    .competition-slider {
      text-align: left;
      position: relative;
      .competition-slider_poster {
        height: 250px;
        background-size: cover;
        border-radius: 24px;
      }
      .competition-slider_text {
        padding-left: 40px;
        h1, h2 {
          color: ${Colors.mainGray};
          font-size: 1.3em;
          letter-spacing: 2px;
          line-height: 1.1;
          margin: .5em 0 15px !important;
          white-space: pre-wrap;
          display: block;
          display: -webkit-box;
          max-width: 100%;
          max-height: 135px;
          margin: 0 auto;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
          font-weight: bold;
        }
        .text{
          color: ${Colors.mainGray};
          margin: 0 0 1.5em;
          font-size: 1em;
          white-space: pre-wrap;
          display: block;
          display: -webkit-box;
          max-width: 100%;
          max-height: 138px;
          -webkit-line-clamp: 5;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
          .text__prize {
            padding-bottom: 10px;
          }
        }
      }
    }

    .glide__track {
    }

    .glide__bullets {
      position: inherit;
      transform: none;
      left:0 ;
      zoom: 1.8;
      margin-top: 50px;
      display: block;
      bottom: 0;
      margin: 19px 0 27px;
    }

    .glide__bullet {
      border: 1px solid rgb(58, 58, 58);
      &.glide__bullet--active {
        background: rgb(58, 58, 58);
      }
    }
  }

  /* responsiveness */

  /* small */
  @media only screen and (max-width: 543px) {
    h1 {
      font-size: 2em;
    }
    .competition-slider_text, .competition-slider_text .col-md-12 {
      padding: 0 !important;
    }
    margin-top: 10px !important;
  }

  /* medium screen */
  @media only screen and (min-width: 544px) and (max-width: 767px) {
    h1 {
      font-size: 2.5em;
    }
    .competition-slider_text, .competition-slider_text .col-md-12 {
      padding: 0 !important;
    }
    margin-top: 10px !important;
  }
`;

export default HomeSliderStyled;
