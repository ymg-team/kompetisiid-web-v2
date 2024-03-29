// components
import HeaderDashboard from "@components/headers/HeaderDashboard";
import Spacer from "@components/boxs/Spacer";

const Share = ({ title, desc, link }) => {
  return (
    <>
      <Spacer size="medium" />
      <HeaderDashboard
        title="Share Kompetisi"
        text=" Bagikan ke teman-temanmu untuk meramaikan kompetisi ini."
      />

      {/* click to share on Facebook */}
      <a
        href="#"
        className="share share-facebook"
        title="share ke Facebook"
        onClick={(e) => {
          e.preventDefault();
          window.open(
            `http://www.facebook.com/sharer/sharer.php?u=${link}&title=${title}&desc=${desc}`,
            "MsgWindow",
            "width=500,height=400"
          );
        }}
      >
        <div className="share__icon">
          <i className="fab fa-facebook" />
        </div>
        <div className="share__count">Share ke Facebook</div>
      </a>
      {/* end of click to share on Facebook */}

      {/* click to share on Twitter */}
      <a
        href="#"
        className="share share-twitter"
        title="share ke Twitter"
        onClick={(e) => {
          e.preventDefault();
          window.open(
            `http://twitter.com/intent/tweet?text=${title}+${link}`,
            "MsgWindow",
            "width=500,height=400"
          );
        }}
      >
        <div className="share__icon">
          <i className="fab fa-twitter-square" />
        </div>
        <div className="share__count">Share ke Twitter</div>
      </a>
      {/* end of click to share on Twitter */}

      {/* click to share on Linkedin */}
      <a
        href="#"
        className="share share-linkedin"
        title="share ke Linkedin"
        onClick={(e) => {
          e.preventDefault();
          window.open(
            `http://www.linkedin.com/shareArticle?mini=true&url=${link}&title=${title}`,
            "MsgWindow",
            "width=500,height=400"
          );
        }}
      >
        <div className="share__icon">
          <i className="fab fa-linkedin" />
        </div>
        <div className="share__count">Share ke Linkedin</div>
      </a>
      {/* end of click to share on Linkedin */}
    </>
  );
};
export default Share;
