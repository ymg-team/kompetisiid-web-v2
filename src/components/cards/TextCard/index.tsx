import { Colors } from "@configs/style";
import Styled from "styled-components";

const TextCardStyled = Styled.div`
    padding: 10px;
    text-align: center;
    color: ${Colors.mainGray};
`;

const TextCard = ({ children }: any) => {
  return <TextCardStyled>{children}</TextCardStyled>;
};

export default TextCard;
