import Styled, { StyledComponent } from "styled-components";
import { Colors } from "@configs/style";

const SIZE: any = {
  small: "60px",
  medium: "120px",
  large: "160px",
};

export const AvatarStyled: any = Styled.img`
    width: ${({ size }: any) => SIZE[size]};
    height: ${({ size }: any) => SIZE[size]};
    border-radius: 50%;
    border: 3px solid ${Colors.softGray};
    margin-right: 10px;
`;
