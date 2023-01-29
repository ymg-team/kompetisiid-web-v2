import Styled from "styled-components";

export const CompetitionDetailHeaderStyled = Styled.div`
.competition-detail--title {
    line-height: 1.3;
    h1 {
      font-size: 2.5em;
      line-height: 1.2;
    }
    h1, p {
      margin: 0;
    }
  }
  img {
    max-width: 100% !important;
  }
  .alert {
    margin-top: 2em;
  }
  .competition-author {
    img {
      width: 50px !important;
      height: 50px !important;
      border-radius: 30px !important;
    }
  }
  .small-stats-icon {
    margin-right: 15px;
    cursor: default;
  }
  .competition-detail__left {
    padding: 0;
  }
  .competition-detail__right {
    padding:  0 0 0 40px;
  }

  // reponsivenes
  /* Large desktop */
  // @media (min-width: 1200px) { ... }
  
  /* Portrait tablet to landscape and desktop */
  // @media (min-width: 768px) and (max-width: 979px) { ... }
  
  /* Landscape phone to portrait tablet */
  @media (max-width: 767px) { 
    .competition-detail__right {
      padding:  0;
    }
  }
  
  /* Landscape phones and down */
  @media (max-width: 480px) { }
`;
