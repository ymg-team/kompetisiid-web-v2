import { useEffect } from "react";

// components
import HeaderDashboard from "@components/headers/HeaderDashboard";
import Spacer from "@components/boxs/Spacer";
import Styled from "styled-components";
import Tags from "@components/buttons/CompetitionTags";
import { textParser } from "@helpers/string";
import { alert } from "@components/Alert";

const RegulationStyled = Styled.div`
article {
  line-height: 1.8px;
  word-break: break-word;
  img {
    border-radius: 30px;
    max-width: 100%;
  }
  h2,h3,h4,h5 {
    margin: 50px 0 20px;
    text-transform: capitalize; 
  }
}
`;

const Regulation = (props) => {
  useEffect(() => {
    // get all image inside .competition-regulator
    setTimeout(() => {
      const ImgEl = document.querySelectorAll(".competition-regulation img");
      // ref: https://developer.mozilla.org/en-US/docs/Web/API/NodeList
      for (let n of ImgEl) {
        n.className = "image-modal-target";
      }
    }, 1000);
  }, []);

  return (
    <RegulationStyled className="competition-regulation">
      <Spacer size="medium" />
      <HeaderDashboard
        title="Peraturan Kompetisi"
        text="Sebelum mengikuti kompetisi ini, wajib untuk membaca dan mentaati setiap
        peraturan yang berlaku"
      />
      <article
        onMouseDown={(e) => {
          e.preventDefault();
          alert(true, "Select is disabled", "error");
        }}
        style={{ lineHeight: 1.8 }}
        dangerouslySetInnerHTML={{ __html: textParser(props.html) }}
      />
      <br />
      <a
        target="_blank"
        rel="nofollow noopener noreferrer"
        href={props.link_source}
      >
        Kunjungi website kompetisi
      </a>
      <hr />
      <Tags tags={props.tags} />
    </RegulationStyled>
  );
};

export default Regulation;
