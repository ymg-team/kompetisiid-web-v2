import React from "react";
import { HeaderDashboardStyled } from "./styled";

const HeaderDashboard = ({ title, text, noBorder, asSubHeader }) => {
  const Heading = ({ children }) => {
    if (asSubHeader) {
      return <h2>{children}</h2>;
    } else {
      return <h1>{children}</h1>;
    }
  };

  return (
    <HeaderDashboardStyled {...{ noBorder, asSubHeader }}>
      <Heading>{title}</Heading>
      {text && <p className="text-muted">{text}</p>}
    </HeaderDashboardStyled>
  );
};

HeaderDashboard.defaultProps = {
  noBorder: false,
  asSubHeader: false,
  text: "",
};

export default HeaderDashboard;
