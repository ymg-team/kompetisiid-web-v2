import Styled from "styled-components";

const CareeerStyled = Styled.div`
.careers-header {
    padding: 150px 0;
    background-image: url(/assets/4.2/img/careers-background.jpg);
    background-size: cover;
    color: #FFF;
    h1, h3 {
        display: inline-block;
        background: #FFF;
        color: #000;
        padding: 5px 10px;
    }
    h3 {
        margin-bottom: 40px;
    }
    
}
.careers section {
    padding: 20px 0;
    h1  {
        &:after {
            content: "";
            display: block;
            left: 0;
            bottom: 0;
            height: 10px;
            width: 100px;
            border-bottom: 5px solid #000 ;
            margin: 0 auto;
        }
    }
        ;
    h2 {
        margin: 50px 0;
    }
}

.carrers-item {
    padding: 0 50px;
    margin-bottom: 30px
}
.btn-socmed {
    border-radius: 40px;
    width: 40px;
    height: 40px;
    padding: 10px;
    margin: 0 5px
}

// responsiveness
// small screen
@media only screen and (max-width: 543px) {
    .carrers-item {
        padding: 0 !important
    }
}

// medium screen
@media only screen and (min-width: 544px) and (max-width: 767px) {
    .carrers-item {
        padding: 0 !important
    }
}
`;

export default CareeerStyled;
