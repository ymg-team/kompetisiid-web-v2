import React from "react";
import { HeaderDashboardStyled } from "./styled";

const HeaderDashboard = ({ title, text, noBorder }) => (
  <HeaderDashboardStyled {...{ noBorder }}>
    <h2>{title}</h2>
    <p className="text-muted">{text}</p>
  </HeaderDashboardStyled>
);

HeaderDashboard.defaultProps = {
  noBorder: false,
};

export default HeaderDashboard;
