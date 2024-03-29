import React from "react";
import { alert } from "@components/alert/Base";

import Link from "next/link";
import { Form, Formik } from "formik";

import SEO from "@components/meta/SEO";
import FullScreen from "@layouts/FullScreen";
import InputTextV2 from "@components/form/v2/InputText";
import { LoginStyled } from "./styled";
import Submit from "@components/form/v2/Submit";
import ReCAPTCHA from "react-google-recaptcha";

// helpers
import { getStorage } from "@helpers/localStorage";

// services
import { register } from "@services/auth";

// configs
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
const { RECHAPTCHA_SITE_KEY } = publicRuntimeConfig;

const initialFormValues = {
  email: "",
  phone: "62",
  username: "",
  fullname: "",
  password: "",
  password_conf: "",
};

const Register = () => {
  // === initial states ===
  const [loading, setLoading] = React.useState(false);

  // === initial memos ===
  const Meta = React.useMemo(() => {
    return {
      title: "Register Kompetisi Id",
      description:
        "Kamu bisa registrasi baik sebagai penyelenggara dan peserta kompetisi",
    };
  }, []);

  // === initial callbacks ===
  const registerHandler = React.useCallback(async (values) => {
    setLoading(true);
    if (grecaptcha.getResponse()) {
      const Response = await register(values);
      console.log("Response", Response);
      if (Response.status === 201) {
        alert(true, Response.message, "success");

        setTimeout(() => {
          // reload after 1.5s
          const historyBack = getStorage("history_back");
          location.href = historyBack ? "/login" : "/";
        }, 1400);
      } else {
        alert(true, Response.message, "error");
        setLoading(false);
      }
    } else {
      // login error
      setLoading(false);
      return alert(true, "Rechaptcha wajib diisi", "error");
    }
  }, []);

  return (
    <FullScreen className={`login`}>
      <SEO {...Meta} />
      <LoginStyled className="login-box">
        {/* header */}
        <div className="login-box__title">
          <h1 style={{ textAlign: "center", lineHeight: 1 }}>
            {Meta.title} <br />
            <small style={{ fontWeight: "normal" }}>{Meta.description}.</small>
          </h1>
        </div>

        {/* form input */}
        <div className="login-box__content">
          <Formik
            initialValues={initialFormValues}
            onSubmit={(values, { setSubmitting }) => {
              return registerHandler(values);
            }}
            validate={({
              username,
              email,
              phone,
              fullname,
              password,
              password_conf,
            }) => {
              const errors = {};

              // required validation
              if (!username) errors.username = "Wajib diisi";
              if (!email) errors.email = "Wajib diisi";
              if (!fullname) errors.fullname = "Wajib diisi";
              if (!password) errors.password = "Wajib diisi";
              if (!password_conf) errors.password_conf = "Wajib diisi";

              // username format validation
              if (!username.match(/^\S*$/) || username.match(/[A-Z]/g)) {
                errors.username =
                  'Username hanya boleh huruf kecil, angka dan symbol "_", dan tidak ada spasi';
              }

              // phone number format validation
              if (!phone.match(/[628][0-9]{6,18}/)) {
                errors.phone = "Format no.telp tidak valid, Wajib 628****";
              }

              // email format validation
              if (
                !email
                  .toLowerCase()
                  .match(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                  )
              ) {
                errors.email =
                  "Format email tidak valid. Contoh: user@gmail.com";
              }

              // password format validation
              if (
                !password.match(/(?=.*\d)(?=.*[a-z])(?=.*[!@#$%?=*&]).{8,20}/)
              )
                errors.password =
                  "Format password tidak valid, karakter wajib mengandung huruf, angka dan karakter";

              // password confirmation validation
              if (password !== password_conf)
                errors.password_conf =
                  "Konfirmasi password tidak sama dengan password";

              return errors;
            }}
          >
            <Form className="form-ki">
              <InputTextV2 type="text" name="email" label="Email" required />
              <InputTextV2 type="text" name="phone" label="No Telp." required />
              <InputTextV2
                type="text"
                name="username"
                label="Username"
                required
              />
              <InputTextV2
                type="text"
                name="fullname"
                label="Name Lengkap"
                required
              />
              <InputTextV2
                type="password"
                name="password"
                label="Password"
                required
              />
              <InputTextV2
                type="password"
                name="password_conf"
                label="Konfirmasi Password"
                required
              />
              <br />
              <ReCAPTCHA sitekey={RECHAPTCHA_SITE_KEY} />
              <br />
              <Submit
                className="btn btn-gray"
                disabled={loading}
                type="submit"
                style={{
                  fontWeight: "bold",
                  width: "100%",
                  backgroundColor: "#FFF",
                  color: "#292929",
                }}
                text={loading ? "loading..." : "registrasi"}
              />
            </Form>
          </Formik>

          <>
            <hr />
            <p>
              Sudah punya akun, silahkan{" "}
              <Link legacyBehavior href="/login">
                <a>Login</a>
              </Link>
            </p>
          </>
        </div>

        {/* footer navigation */}
        <div className="login-box__footer">
          <small>
            <Link legacyBehavior href="/">
              <a>ke Home</a>
            </Link>
            &nbsp;|&nbsp;
            <a
              target="_blank"
              href="https://goo.gl/forms/kMGGZQXJCjoyKThj1"
              rel="noopener noreferrer"
            >
              Kontak
            </a>
            &nbsp;|&nbsp;
            <a
              href="https://kompetisi.id/news/TVRjPQ/Privacy-Policy"
              target="_blank"
              rel="noopener noreferrer"
            >
              Privacy
            </a>
            &nbsp;|&nbsp;
            <a
              href="https://kompetisi.id/news/TXpVPQ/About"
              target="_blank"
              rel="noopener noreferrer"
            >
              About
            </a>
          </small>
        </div>
        {/* end of footer navigation */}
      </LoginStyled>
    </FullScreen>
  );
};

export default Register;
