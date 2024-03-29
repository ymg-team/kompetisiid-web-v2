import Styled from "styled-components";

const ListCategoriesModalStyled = Styled.div`



/* small */
@media only screen and (max-width: 543px) {
    .modal-title, .list-categories a {
        font-size: 20px !important;
    }
    .list-categories a {
        line-height: 1.7;
    }
    .container {
        width:  100%;
        padding: 0 15px !important;
    }
}

/* medium */
@media only screen and (min-width: 544px) and (max-width: 767px) {
    .modal-title, .list-categories a {
        font-size: 20px !important;
    }
    .list-categories a {
        line-height: 1.7;
    }
    .container {
    width:  100%;
    padding: 0 15px !important;
}
}
`;

export default ListCategoriesModalStyled;
