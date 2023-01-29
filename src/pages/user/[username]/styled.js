import Styled from "styled-components";
import { Colors } from "~/src/config/style";

const UserDetailStyled = Styled.div`
&.profile {
    .profile__cover {
      display: block;
      background: ${Colors.softGray};
      background-size: cover;
    }
    .divider {
      margin-top: 300px;
    }
    .meta-container {
      color: ${Colors.mainWhite};
      background-color: ${Colors.mainGray};
      h3 {
          font-weight: normal;
      }
      .avatar {
        position: absolute;
        z-index: 5;
        top: -10px;
        img {
          width: 90px;
          height: 90px;
          border: 3px solid ${Colors.mainWhite};
          border-radius: 50%;
        }
      }
      nav.profile-nav {
        box-shadow: none;
        ul {
          li {
            display: inline-block;
            margin: 20px 20px 20px 0;
            width: 100px;
            a {
              &:hover {
                text-decoration: none;
              }
            }
            h3 {
              line-height: 1;
              margin-bottom: 5px;
              font-size: 2em;
            }
          }
        }
      }
    }
  }
`;

export default UserDetailStyled;
