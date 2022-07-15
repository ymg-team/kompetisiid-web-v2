import Styled from "styled-components";

const HomeStyled = Styled.div`
    /* responsiveness */
    /* small */
    @media only screen and (max-width: 543px) {
        .subheader-home-wrapper {
            height: inherit;
            display: inherit;
            padding: 0 5px;
            .home-slider {
                .competition-slider {
                    .competition-slider_text { 
                        display: inherit;
                        position: inherit;
                    }
                }
            }
        }
    }

    /* medium screen */
    @media only screen and (min-width: 544px) and (max-width: 767px) {
        .subheader-home-wrapper {
            height: inherit;
            display: inherit;
            padding: 0 5px;
            .home-slider {
                .competition-slider {
                    .competition-slider_text { 
                        display: inherit;
                        position: inherit;
                    }
                }
            }
        }
    }
`;

export default HomeStyled;
