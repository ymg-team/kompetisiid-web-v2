import React from "react";
import Styled from "styled-components";

const GlobalLoaderStyled = Styled.div`
    padding: 20px 10px;
`;

const GlobalLoader = () => {
  return (
    <GlobalLoaderStyled>
      {props.text || "Tunggu Sebentar..."}
    </GlobalLoaderStyled>
  );
};

export default GlobalLoader;
