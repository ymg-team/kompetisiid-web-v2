import Styled from "styled-components";

export const LoginStyled: any = Styled.div`
    &.register-box {
        /* because in register box if user tap avatar, will convert to browse file */
        .login-box__content__avatar {
        img {
            cursor: pointer;
            border: solid 2px #F4F4F4;
            height: 90px;
            width: 90px;
        }
        }
    }

    .login-box__footer {
        width: 100%;
        text-align: center;
        padding: 10px;
    }
`;
