import Styled from "styled-components";

const GlobalLoaderStyled = Styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 50px 0;

  .pswp__preloader__icn {
    opacity: 0.75;
    width: 50px;
    height: 50px;
    -webkit-animation: clockwise 500ms linear infinite;
    animation: clockwise 500ms linear infinite;
  }

  /* The idea of animating inner circle is based on Polymer loading indicator by Keanu Lee https://blog.keanulee.com/2014/10/20/the-tale-of-three-spinners.html */
  .pswp__preloader__cut {
    position: relative;
    width: 25px;
    height: 50px;
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;
  }

  .pswp__preloader__donut--fake {
    box-sizing: border-box;
    width: 50px;
    height: 50px;
    border: 2px solid red;
    border-radius: 50%;
    position: absolute;
    top: 0;
    left: 0;

    background: none;
    margin: 0;
  }

  .pswp__preloader__donut {
    box-sizing: border-box;

    width: 50px;
    height: 50px;

    border: 4px solid #3a3a3a;
    border-radius: 50%;
    border-left-color: transparent;
    border-bottom-color: transparent;

    position: absolute;
    top: 0;
    left: 0;

    position: absolute;
    top: 0;
    left: 0;

    background: none;
    margin: 0;

    -webkit-animation: donut-rotate 1000ms cubic-bezier(0.4, 0, 0.22, 1)
      infinite;
    animation: donut-rotate 1000ms cubic-bezier(0.4, 0, 0.22, 1) infinite;
  }

  @-webkit-keyframes clockwise {
    0% {
      -webkit-transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
    }
  }
  @keyframes clockwise {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes donut-rotate {
    0% {
      -webkit-transform: rotate(0);
    }
    50% {
      -webkit-transform: rotate(-140deg);
    }
    100% {
      -webkit-transform: rotate(0);
    }
  }
  @keyframes donut-rotate {
    0% {
      transform: rotate(0);
    }
    50% {
      transform: rotate(-140deg);
    }
    100% {
      transform: rotate(0);
    }
  }
`;

export default GlobalLoaderStyled;
