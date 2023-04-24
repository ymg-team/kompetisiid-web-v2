import Styled from "styled-components";
import { Colors } from "@configs/style";

export const CKEDitorStyled = Styled.div`
    .ck.ck-editor__main>.ck-editor__editable:not(.ck-focused) {
        border:none;
        border-bottom: 1.5px solid ${Colors.mainGray} !important;
        max-height: 600px;
    }
    .ck.ck-toolbar.ck-toolbar_grouping {
        border-bottom: 1px solid #ccced1;
    }
  
`;
