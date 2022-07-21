import React, { useState } from "react";
// import { likeActionCompetition } from "../../pages/competition/actions";

const BtnLikeCompetition = (props) => {
  const [isLiked, setIsLiked] = useState(props.isLiked);
  const [total, setTotal] = useState(props.total);

  const clickHandler = () => {
    // if (props.session && props.session.id) {
    //   const nextTotal = isLiked ? total - 1 : total + 1
    //   setTotal(nextTotal)
    //   setIsLiked(!isLiked)
    //   return props.dispatch(likeActionCompetition(props.competition_id))
    // } else {
    //   return window.transitionTo("/login")
    // }
  };

  return (
    <a
      className="btn"
      href="#"
      title={`Klik untuk ${
        isLiked ? "batal menyukai" : "menyukai"
      } kompetisi ini`}
      style={{ fontSize: 25, padding: "5px 10px" }}
      onClick={(e) => {
        e.preventDefault();
        clickHandler();
      }}
    >
      <span className={`${isLiked ? "fa fa-thumbs-up" : "far fa-thumbs-up"}`} />
      <span
        style={{
          fontWeight: 100,
          marginLeft: 5,
          fontSize: 20,
        }}
      >
        {total}
      </span>
    </a>
  );
};

export default BtnLikeCompetition;
