import { Colors } from "@configs/style";
import Link from "next/link";
import Styled from "styled-components";
import DummyTags from "@configs/consts/staticData/specialTags";

const SpecialHashtagsBoxStyled = Styled.div`
padding: 20px;
background: ${Colors.verySoftGray};
color: ${Colors.mainGray};
display: flex;
justify-content: center;
overflow: auto;
width: 100%;
a {
    margin: 0 10px;
}
.items {
    strong {
        width: 110px;
    }
    display: inline-flex;
}
/* responsiveness */
/* small */
@media only screen and (max-width: 543px) {
  /* display: inline; */
  display: block;
}

/* medium screen */
@media only screen and (min-width: 544px) and (max-width: 767px) {
    /* display: inline; */
    display: block;
`;

const SpecialHashtagsBox = () => {
  return (
    <SpecialHashtagsBoxStyled>
      <span className="items">
        <strong>Tag Populer:</strong>&nbsp;&nbsp;
        {DummyTags.map((n) => (
          <Link key={n.tag} href={`/browse/tag/${n.tag}`}>
            {n.tag}
          </Link>
        ))}
      </span>
    </SpecialHashtagsBoxStyled>
  );
};

export default SpecialHashtagsBox;
