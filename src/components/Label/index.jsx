import React from "react";
import LabelStyled from "./index.styled";

const Label = ({ noMargin, circle, size, type, text, children }) => {
  return (
    <LabelStyled
      title=""
      className={`label ${circle ? "label-circle" : ""} ${
        size === "large" ? "label-lg" : ""
      } label-${type}`}
      {...{ noMargin }}
    >
      {typeof text !== "undefined" ? text.toString() : children}
    </LabelStyled>
  );
};

Label.defaultProps = {
  type: "gray",
  size: "",
  circle: false,
  children: null,
  title: "",
  noMargin: false,
};

export default Label;
