import Styled from "styled-components";
import { Colors } from "~/src/config/style";

const SubmissionListStyled = Styled.div`
   
    border: 1px solid #e4e4e4;
    margin-bottom: 15px;
    .submission-list__header {
        border-bottom: 1px solid ${Colors.softGray};
        padding: 10px 15px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .submission-list__body {
        padding: 15px;
    }
    p {
        margin: 0;
    }
`;

export default SubmissionListStyled;
