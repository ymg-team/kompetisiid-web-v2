import React, { useEffect } from "react";
import Styled from "styled-components";

// components
import SEO from "@components/meta/SEO";
import Link from "next/link";
import Subheader from "@components/Subheader";
import { alert } from "@components/alert/Base";

const ChooseMethodStyled = Styled.div`
  .add-competition {
    p {
      margin-bottom: 50px;
      overflow-y: auto;
    } 
    .add-competition-box {
      margin-bottom: 4em;
    }
  }

  // responsiveness
  // small screen
  @media only screen and (max-width: 543px) {
    .add-competition {
      width: 100%;
      p {
        height: initial;
      } 
    }
  }

  // medium screen
  @media only screen and (min-width: 544px) and (max-width: 767px) {
    .add-competition {
      width: 100%;
      p {
        height: initial;
      } 
    }
  }

`;

const title = "Pasang Kompetisi";
const desc =
  "Apakah kamu penyelenggara kompetisi? jika iya, kamu bisa menggunakan fitur ini untuk mempublikasi kompetisimu di Kompetisi Id.";

const BreadcrumbData = [
  {
    title: "Home",
    link: "/",
  },
  {
    title: "Kirim Kompetisi",
    link: "/add",
  },
];

const AddCompetition = () => {
  useEffect(() => {
    // component will unmount
    return () => {
      alert(false);
    };
  }, []);

  return (
    <ChooseMethodStyled>
      <SEO title={title} description={desc} />

      <div className="container">
        <Subheader title={title} desc={desc} breadcrumb={BreadcrumbData} />
        <div className="add-competition">
          <div className="col-md-12 m-20" />
          <div className="row">
            <div className="add-competition-box col-md-6 align-left">
              <h2>Kirim Kompetisi</h2>
              <p>
                Kamu cukup upload poster dan link untuk kemudian dicek pihak
                &quot;KI&quot; dan akan diposting jika data tersebut valid.
                <br />
                <small>
                  *)waktu yang dibutuhkan untuk validasi lebih lama dari pasang
                  sendiri
                </small>
              </p>
              <Link legacyBehavior href="/add/send">
                <a className="btn btn-white" title="klik untuk pasang cepat">
                  Klik untuk kirim kompetisi
                </a>
              </Link>
            </div>
            {/* <div className="add-competition-box col-md-6 align-center">
                <h2>Pasang Sendiri</h2>
                <p>
                  Login dan pasang sendiri kompetisimu melalui dashboard member.
                  Kamu akan lebih mudah memanage kompetisi lainnya, diskusi dan
                  memberikan pengumuman kepada para pengunjung.{" "}
                </p>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    location.href = "/manage/competition/create";
                  }}
                  className="btn btn-white"
                  title="klik untuk pasang cepat"
                >
                  Klik untuk pasang kompetisi
                </a>
              </div> */}
          </div>
        </div>
        <div className="col-md-12 m-20" />
      </div>
    </ChooseMethodStyled>
  );
};

export default AddCompetition;
