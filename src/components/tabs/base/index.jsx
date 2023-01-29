import React from "react";
import Styled from "styled-components";
import { Colors } from "~/src/config/style";

// components
import Link from "next/link";
import Label from "../../Label";

export const TabStyled = Styled.div`
  &.container-competition-tab {
    border-top: 1px solid ${Colors.softGray};
    border-bottom: 1px solid ${Colors.softGray};
    display: flex;
    margin-top: 50em;
    li {
      margin-right: 3em;
      a {
        width: max-content;
        padding: 1em 0;
        display: inline-block;
        text-decoration: none;
        text-transform: capitalize;
        &:hover {
          color: ${Colors.mainGray};
          font-weight: bold;
        }
      }
          
      &.active {
        border-bottom: 4px solid ${Colors.mainRed};
        a {
          font-weight: bold;
          color: ${Colors.mainRed};
        }
        .label.label-gray {
          background: ${Colors.mainRed};
        }
      }
          
    }
    .btn-join {
      opacity: 0;
    }
    &.fixed {
      top: 0;
      z-index: 10;
      position: fixed;
      width: 100%;
      background: ${Colors.mainWhite};
    }
  }

  /* responsiveness */

  /* medium screen */
  @media only screen and (min-width: 544px) and (max-width: 767px) {
    .tab-competition {
      width: 100vw;
      overflow-y: auto;
    }
  }

  /* small */
  @media only screen and (max-width: 543px) {
    .tab-competition {
      width: 100vw;
      overflow-y: auto;
    }
  }
`;

const Tab = ({ tabs }) => (
  <TabStyled
    className="container-competition-tab"
    style={{ margin: "20px 0 20px" }}
  >
    <ul className="horizontal-menu">
      {tabs.map((n, key) => {
        return (
          <li key={key} className={n.is_active ? "active" : ""}>
            <Link href={n.target}>
              <a>
                {n.text} {n.count ? <Label type="gray" text={n.count} /> : null}
              </a>
            </Link>
          </li>
        );
      })}
    </ul>
  </TabStyled>
);

export default Tab;
