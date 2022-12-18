import React, { useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
// import { likeActionCompetition } from "../../pages/competition/actions";
import { setStorage } from "@helpers/localStorage";
import { alert } from "@components/Alert";

// services
import { likeDislikeCompetition } from "@services/competition";

const BtnLikeCompetition = (props) => {
  const Router = useRouter();

  // initial redux
  const Session = useSelector((state) => state.Session);

  const [isLiked, setIsLiked] = useState(props.isLiked);
  const [total, setTotal] = useState(props.total);

  // initial callbacks
  const clickHandler = React.useCallback(async () => {
    if (Session.status === 200) {
      const Response = await likeDislikeCompetition({
        competition_id: props.competition_id,
      });

      if (typeof Response.liked !== "undefined") {
        setTotal(Response.liked ? total + 1 : total - 1);
        setIsLiked(Response.liked);
        alert(true, `${Response.liked ? "Like" : "Dislike"} sukses`, "success");
      } else {
        alert(true, `Like/Dislike gagal, silahkan coba lagi!`, "error");
      }
    } else {
      setStorage("history_back", Router.asPath);
      Router.push("/login");
    }
  }, [Session, isLiked, total]);

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
