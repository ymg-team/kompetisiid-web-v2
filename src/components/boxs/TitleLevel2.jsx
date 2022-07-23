import React from "react";
import Styled from "styled-components";

const TitleLevel2Styled = Styled.div`
  border-bottom: 1px solid lightgray;
  padding-bottom: 20px;
  margin-bottom: 20px;
  h2 {
    margin-bottom: 0;
    font-size: 2em;
  }
  small {
    color: gray;
  }
`;

const TitleLevel2 = (props) => (
  <TitleLevel2Styled>
    <h2>{props.title}</h2>
    <small>{props.text}</small>
  </TitleLevel2Styled>
);

export default TitleLevel2;
