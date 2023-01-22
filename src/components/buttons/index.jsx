import React from "react";
import Styled from "styled-components";
import PropTypes from "prop-types";

const ButtonStyled = Styled.button`
  border-radius: 5px;
  font-weight: bold;
  letter-spacing: .5px;
  width: ${(props) => (props.fullWidth ? "100%" : "auto")};
  ${(props) => {
    switch (props.size) {
      case "medium":
        return ``;
      case "large":
        return `
          padding: 8px 16px;
          font-size: 1.1em;
        `;
      default:
        return `
          padding: 5px 8px;`;
    }
  }}

  ${(props) => {
    switch (props.color) {
      case "red":
        return `
            background: #ea4b35;
            color: #FFF;
            border: 1px solid #c53d25;
          `;
      case "green":
        return `
            background: #1DBC60;
            color: #FFF;
            border: 1px solid #1DBC60;
          `;
      case "white":
        return `
            border: 1px solid #969696;
            background-color: #FFFFFF;
            color: #313131;
            &.btn-close-modal {
              background-color: #ffffff00;
              border-radius: 200px;
              color: #3a3a3a;
            }
            &:hover {
              background-color: #efefef;
            }
          `;
      case "white-transparent":
        return `
            border: 2px solid #FFFF;
            background-color: transparent;
            color: #FFFFFF;
            
            &:hover {
              border-color: #efefef;
            }
          `;
      default:
        return `
          background-color: #FFF;
          color: #000;
        `;
    }
  }}
`;

const Button = ({ loading, ...props }) => {
  let style = {};
  if (props.loading) {
    style.opacity = 0.4;
    style.cursor = "not-allowed";
  }
  return (
    <ButtonStyled {...props} style={style}>
      {props.loading ? "Menunggu..." : props.children || props.text}
    </ButtonStyled>
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.object,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  color: PropTypes.oneOf(["white", "red", "green", "white-transparent"]),
  loading: PropTypes.bool,
  fullWidth: PropTypes.bool,
};

Button.defaultProps = {
  text: "Button Text",
  size: "medium",
  color: "white",
  fullWidth: false,
  onClick: () => {},
  style: {},
  className: "",
  loading: false,
};

export default Button;
