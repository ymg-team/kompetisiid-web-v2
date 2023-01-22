import styled from "styled-components";
import { Colors } from "@configs/style";

const Index = styled.div`
  color: #fff;
  padding: 0;
  margin: 0;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 10px;
  &.error {
    background: ${Colors.mainRed};
  }
  &.login {
    color: ${Colors.darkGray};
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: calc(100vh - 150px - 2em);
  }
  &.bg-gray-soft {
    color: gray;
  }
`;

export default Index;
