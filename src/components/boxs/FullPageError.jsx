import React from "react";
import Index from "@layouts/FullScreen";
import Link from "next/link";

const FullPageError = ({ message, code }) => {
  return (
    <Index className="error">
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
          <Link href="/browse?status=active">
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
    </Index>
  );
};

export default FullPageError;
