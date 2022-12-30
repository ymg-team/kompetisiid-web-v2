// components
import { MobileHeaderStyled } from "./styled";

const MobileHeader = ({ title, onBack }) => {
  return (
    <MobileHeaderStyled>
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          if (onBack) onBack();
          else window.history.back();
        }}
      >
        <span className="fa fa-arrow-left" />
      </a>
      <h2 className="header-mobile__text">{title}</h2>
    </MobileHeaderStyled>
  );
};

export default MobileHeader;
