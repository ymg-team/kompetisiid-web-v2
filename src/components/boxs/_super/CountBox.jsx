import React from "react";
import Styled from "styled-components";
import { Colors } from "~/src/config/style";

import Link from "next/link";
const CountBoxStyled = Styled.div`
    border: 1px solid ${Colors.darkGray};
    padding: 15px 10px 25px;
    text-align: center;
    a {
        text-decoration: none;
    }
    h3 {
        font-size: 25px;
        margin: 10px 0;
        text-decoration: none;
    }
`;

const CountBox = (props) => {
  return (
    <CountBoxStyled>
      <Link href={props.link || "/"}>
        <a>
          <h3>{props.count}</h3>
          {props.text}
        </a>
      </Link>
    </CountBoxStyled>
  );
};

export default CountBox;
