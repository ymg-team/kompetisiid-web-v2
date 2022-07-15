import React from "react";
import { Fullscreen } from "../Fullscreen";
import Link from "next/link";

const FullPageError = ({ message, code }) => {
  return (
    <Fullscreen className="error">
      <div className="error-box">
        <div className="error__code">
          <h1>{code || 500}</h1>
        </div>
        <div className="error__message">
          {message || "Sedang terjadi masalah"}
        </div>
        <div className="error__navigation">
          <Link href="/">
            <a>Kembali ke home</a>
          </Link>
          <Link href="/browse">
            <a>Jelajah</a>
          </Link>
          <Link href="/add">
            <a>Pasang</a>
          </Link>
          <Link href="/news">
            <a>Berita</a>
          </Link>
        </div>
      </div>
    </Fullscreen>
  );
};

export default FullPageError;
