import styled from "styled-components";
import { Colors } from "~/src/config/style";

const Fullscreen = styled.div`
  color: #fff;
  padding: 0;
  margin: 0;
  height: 100vh;
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 10px;
  /* &.login-super {
    color: ${Colors.mainWhite} !important;
    a {
      color: ${Colors.mainWhite} !important;
    }
  } */
  &.error {
    background: ${Colors.mainRed};
  }
  &.login {
    color: ${Colors.darkGray};
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: calc(100vh - 57.99px);
  }
  /* &.login.login-super {
    background: ${Colors.darkGray};
  } */
  &.bg-gray-soft {
    color: gray;
  }
`;

export default Fullscreen;
