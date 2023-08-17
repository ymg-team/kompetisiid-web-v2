import React from "react";

// components
import AddCompetitionBoxStyled from "./styled";
import Button from "../../buttons/index";
import { useRouter } from "next/router";

const ButtonAddCompetition = () => {
  const Router = useRouter();

  return (
    <AddCompetitionBoxStyled>
      <div className="container">
        <div className="row">
          <div className="col-md-3 align-center addcompetition__button">
            <Button
              color="white-transparent"
              size="large"
              onClick={() => Router.push("/add")}
            >
              Pasang Kompetisi
            </Button>
          </div>
          <div className="col-md-9 addcompetition__text">
            Kamu seorang penyelenggara kompetisi?. Yuk pasang kompetisi disini
            agar semakin ramai dan tersebar di seluruh pelosok Indonesia. Klik
            tombol “Pasang Kompetisi”.
          </div>
        </div>
      </div>
    </AddCompetitionBoxStyled>
  );
};

export default ButtonAddCompetition;
