import React from "react";
import Link from "next/link";

const ErrorCard = (props) => (
  <div className="fullheight">
    <div className="container error">
      <div className="col-md-4 col-md-push-4 col-sm-12">
        <h1>{props.code || 500}</h1>
        <h2>{props.message || "Telah Terjadi Masalah"}</h2>
        <p>
          Jika anda tersesat, silahkan masuk ke{" "}
          <Link
            href="/browse?status=active"
            style={{ textDecoration: "underline" }}
          >
            <a>Jelajah Kompetisi</a>
          </Link>
          &nbsp; untuk menemukan kompetisi lainnya atau kembali ke{" "}
          <Link href="/" style={{ textDecoration: "underline" }}>
            <a>Halaman Utama</a>
          </Link>
        </p>
      </div>
    </div>
  </div>
);

export default ErrorCard;
