import Styled from "styled-components";

export const HeaderDashboardStyled = Styled.div`
margin-bottom: 20px;
  h2 {
    font-size: 1.8em;
    margin: 0;
  }
  p {
    margin: 10px 0 15px;
  }
  border-bottom: ${(props) =>
    props.noBorder ? "none" : "1px solid lightgray"} ;
  margin-bottom: 10px;
`;
