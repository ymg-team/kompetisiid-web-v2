import Dynamic from "next/dynamic";
import CareerStyled from "./styled";

// components
import SEO from "@components/meta/SEO";
import Loading from "@components/preloaders/GlobalLoader";

const CareerBox = Dynamic(import("@components/boxs/CareerBox"), {
  loading: Loading,
});

const CareersContainer = () => {
  return (
    <CareerStyled>
      <SEO
        title="Karir - Kompetisi Id"
        description="Mari bergabung bersama kami untuk terus meramaikan semangat kompetisi di Indonesia"
      />
      <CareerBox />
    </CareerStyled>
  );
  s;
};

export default CareersContainer;
