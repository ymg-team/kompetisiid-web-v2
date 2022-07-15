import React, { useEffect } from "react";
import Link from "next/link";
import { Fullscreen } from "./Fullscreen";
import Helmet from "./Helmet";

const Redirect = (props) => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      setTimeout(() => {
        location.href = props.url;
      }, 1500);
    }
  }, []);

  return (
    <Fullscreen className="bg-gray-soft">
      <Helmet title={`Kamu diredirect ke ${props.url} `} />
      <div className="container">
        <div className="row redirect">
          <div className="redirect-content bg-white align-center">
            <p>
              Kamu akan meninggalkan kompetisi.id .<br />
              Jika redirect otomatis tidak jalan, silahkan klik dibawah ini{" "}
              <strong>
                <a rel="nofollow" href={props.url}>
                  klik disini
                </a>
              </strong>
            </p>
            <small>
              <Link href="/">
                <a>Kembali ke Home</a>
              </Link>
              {" | "}
              <Link href="/browse">
                <a>Jelajah Kompetisi</a>
              </Link>
              {" | "}
              <Link href="/news">
                <a>Kabar kompetisi</a>
              </Link>
            </small>
          </div>
        </div>
      </div>
    </Fullscreen>
  );
};

export default Redirect;
