import Styled from "styled-components";
import { Colors } from "~/src/config/style";

const AddCompetitionBoxStyled = Styled.div`
    padding: 60px 20px;
    margin-bottom: 50px;
    background: ${Colors.mainRed};
    color: ${Colors.mainWhite};
    display: -webkit-box;

    /* responsiveness */

    /* small */
    @media only screen and (max-width: 543px) {
        .addcompetition__button {
            margin-bottom: 20px;
        }
        .addcompetition__text {
            text-align: center;
        }
    }

    /* medium screen */
    @media only screen and (min-width: 544px) and (max-width: 767px) {
        .addcompetition__button {
            margin-bottom: 20px;
        }
        .addcompetition__text {
            text-align: center;
        }
    }
`;

export default AddCompetitionBoxStyled;
