import React from "react";
import Styled from "styled-components";
import { Colors } from "~/src/config/style";

// components
import Link from "next/link";

const FooterWrapper = Styled.div`
  a {
    color: ${Colors.mainWhite};
    text-decoration: none;
    &:hover {
      color: ${Colors.softGray};
    }
  }

  .footer_content {
    margin-bottom: 50px;
    ul.vertical-menu li {
      margin-left: 0;
      margin-bottom: 7px;
    }
    strong.title {
      display: block;
    }
  }
`;

const FooterThanks = Styled.div`
  &.footer-thanks {
    img.footer-thanks_img {
      padding: 0 20px 20px;
    }
  }
`;

const FooterTop = Styled.div`
  background-color: ${Colors.mainBlack};
  color: ${Colors.softGray};
  padding: 10px;
  .footer-copyright {
    img.footer-copyright-logo  {
      width: 40px;
      float: left;
      padding-right: 10px;
      padding-bottom: 10px;
    }
    .footer-copyright-text {
      display: block;
      float: left;
      line-height: 1.3;
    }
  }
  .social-media {
    font-size: 23px;
    a {
      padding: 5px;
    }
  }
    
    
`;

const FooterBottom = Styled.div`
  background: #000000;
  color: #FFF;
  text-align: right;
  font-weight: bold;
  padding: 5.5px;
  img {
    width: 20px;
  }
`;

const Footer = (props) => {
  const [isLogin, setIsLogin] = React.useState(false);

  return (
    <FooterWrapper>
      <FooterThanks className="col-md-12 footer-thanks align-center">
        <br />
        <h3>TERIMAKASIH</h3>
        <a
          href="https://www.domainesia.com/?aff=585"
          rel="noopener noreferrer"
          target="_blank"
        >
          <img
            className="footer-thanks_img"
            src="https://res.cloudinary.com/dhjkktmal/image/upload/v1561894898/kompetisi-id/referral/domainesia.png"
            alt="Domainesia"
          />
        </a>
        <a
          href="https://m.do.co/c/e4eacf5d20a5"
          rel="noopener noreferrer"
          target="_blank"
        >
          <img
            className="footer-thanks_img"
            src="https://res.cloudinary.com/dhjkktmal/image/upload/v1561894898/kompetisi-id/referral/digitalocean.png"
            alt="Digital Ocean"
          />
        </a>
      </FooterThanks>
      <FooterTop className="col-md-12 footer">
        {/* <footer> */}
        <div className="container">
          <div className="row">
            <div className="col-md-6 footer_content">
              <p>
                <strong className="title">Tentang Kami</strong>
              </p>
              Kami adalah sebuah platform kompetisi untuk berbagai macam
              kompetisi yang diadakan di Indonesia untuk selanjutnya dipanggil
              "KI". Dipersembahkan oleh Yussan Media Group. Penyelenggara dapat
              menggunakan KI sebagai media publikasi, media partner ataupun
              kerja sama untuk kompetisi yang mereka adakan. Peserta dapat
              menjelajahi dan mengikuti berbagai kategori kompetisi di KI dan
              semoga menjadi pemenang.
            </div>
            <div className="col-md-3 footer_content">
              <p>
                <strong className="title">Lebih Lengkap</strong>
              </p>
              <ul className="vertical-menu">
                <li>
                  <Link href="/news/TXpVPQ/About">
                    <a>Apa itu Kompetisi Id</a>
                  </Link>
                </li>
                <li>
                  <Link href="/news/TVRnPQ/Term-Of-Use">
                    <a>Aturan Penggunaan</a>
                  </Link>
                </li>
                <li>
                  <Link href="/news/TVRjPQ/Privacy-Policy">
                    <a>Kebijakan Privasi</a>
                  </Link>
                </li>
                <li>
                  <Link href="/news">
                    <a>Berita terbaru</a>
                  </Link>
                </li>
                <li>
                  <Link href="/download/android">
                    <a>Download Android App</a>
                  </Link>
                </li>
                <li>
                  <a
                    target="_blank"
                    href="https://goo.gl/forms/kMGGZQXJCjoyKThj1"
                    rel="noreferrer noopener"
                  >
                    Hubungi kami
                  </a>
                </li>
                <li>
                  <Link href="/careers">
                    <a>Karir</a>
                  </Link>
                </li>
              </ul>
              <p />
            </div>
            <div className="col-md-3 footer_content">
              <p>
                {" "}
                <strong className="title">Navigasi</strong>
              </p>
              <ul className="vertical-menu">
                <li>
                  <Link href="/add">
                    <a>Pasang kompetisi</a>
                  </Link>
                </li>
                <li>
                  <Link href="/news">
                    <a>Kabar kompetisi</a>
                  </Link>
                </li>
                <li>
                  <Link href="/browse?status=active">
                    <a>Jelajah kompetisi</a>
                  </Link>
                </li>
                <li>
                  <Link href="/calendar">
                    <a>Kalender kompetisi</a>
                  </Link>
                </li>
                <li>
                  <Link href="/categories">
                    <a>Kategori</a>
                  </Link>
                </li>
                {!isLogin && (
                  <li>
                    <Link href="/login">
                      <a>Login / register</a>
                    </Link>
                  </li>
                )}
              </ul>
              <p />
            </div>
          </div>
          <hr style={{ borderTop: "1px solid #656565" }} />
          <div className="row">
            <div
              style={{ padding: "10px 0" }}
              className="col-md-6 col-xs-12 footer-copyright"
            >
              <img
                className="footer-copyright-logo"
                src="/static/images/icons-white/icon-72x72.png"
                alt="kompetisi id icon"
              />
              <small className="footer-copyright-text">
                &copy; 2013 - {new Date().getFullYear()} by Yussan Media Group
                <br />
                DIY, Indonesia
              </small>
            </div>
            <div style={{ padding: "10px 0" }} className="col-md-6 col-xs-12">
              <ul className="horizontal-menu pull-right social-media">
                <li>
                  <a
                    href="https://wa.me/6285156934428?text=Ada%20pertanyaan%20seputar%20produk%20Yussan%20Media%20Group%2C%20bisa%20disini."
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <i className="fab fa-whatsapp" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://facebook.com/kompetisiid"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <i className="fab fa-facebook-f" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://twitter.com/_kompetisiid"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <i className="fab fa-twitter" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://instagram.com/kompetisiid"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <i className="fab fa-instagram" />
                  </a>
                </li>
                <li>
                  <a href="/feed" target="_blank" rel="noreferrer noopener">
                    <i className="fa fa-rss" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* </footer> */}
      </FooterTop>
      <FooterBottom className="col-md-12 poweredby">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              Powered by{" "}
              <a
                href="https://byymg.com"
                rel="noopener noreferer"
                target="_blank"
              >
                <img
                  src="/static/images/icons/ymg-icon-small.png"
                  alt="Yussan Media Group Small Icon"
                />
              </a>
            </div>
          </div>
        </div>
      </FooterBottom>
    </FooterWrapper>
  );
};

export default Footer;
