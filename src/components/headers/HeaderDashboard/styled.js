import Styled from "styled-components";

export const HeaderDashboardStyled = Styled.div`
margin-bottom: 20px;
  h1,h2 {
    margin: 0;
  }
  h2 {
    font-size: 1.6em;
  }
  p {
    margin: 10px 0 15px;
    
  }
  border-bottom: ${(props) =>
    props.noBorder ? "none" : "1px solid lightgray"} ;
  margin-bottom: 25px;
`;
