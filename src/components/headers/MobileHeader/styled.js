import Styled from "styled-components";
import { Colors } from "@configs/style";

export const MobileHeaderStyled = Styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    border-bottom: 1px solid ${Colors.softGray};
    .header-mobile__text {
        font-size: 20px;
    }
`;
