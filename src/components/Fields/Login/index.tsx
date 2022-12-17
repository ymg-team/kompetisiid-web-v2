import React from "react";
import { alert } from "~/src/components/Alert";
import { LoginComponentInterface } from "./interfaces";
import { setSession } from "@helpers/cookies";

import Link from "next/link";
import { Form, Formik } from "formik";

import SEO from "@components/meta/SEO";
import FullScreen from "@components/Fullscreen";
import InputTextV2 from "@components/form/v2/InputText";
import { LoginStyled } from "./styled";
import Submit from "@components/form/v2/Submit";

// services
import { superLogin } from "@services/super";
import { login } from "@services/auth";

const Login: React.FC<LoginComponentInterface> = ({ isSuper, isDashboard }) => {
  // === initial states ===
  const [loading, setLoading] = React.useState(false);
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  // === initial memos ===
  const Meta = React.useMemo(() => {
    return {
      title: isSuper ? "Halaman Super" : "Login",
      description: "Login dan tetap jaga privasi anda ya",
    };
  }, [isSuper]);

  const loginHandler = React.useCallback(
    async ({ username, password }: any) => {
      setLoading(true);
      const Response = isSuper
        ? await superLogin({ username, password })
        : await login({ username, password });

      if (Response.status) {
        // login success, time to save session
        setSession(Response);
        setTimeout(() => {
          // reload after 1.5s
          location.href = isDashboard ? "/manage" : "/super/dashboard";
        }, 1000);
      } else {
        // login error
        setLoading(false);
      }

      alert(
        true,
        Response.message,
        Response.status === 200 ? "success" : "error"
      );
    },
    [username, password]
  );

  return (
    <FullScreen className={`login ${isSuper ? "login-super" : ""}`}>
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
          {username && (
            <div className="login-box__content__avatar">
              <p>
                Halo <strong>{username}</strong>
                &nbsp;
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (!password) setPassword("");
                  }}
                >
                  ubah
                </a>
              </p>
              <img src="/assets/4.2/img/avatar-default.jpg" />
            </div>
          )}

          <Formik
            initialValues={{ username: "", password: "" }}
            onSubmit={(values, { setSubmitting }) => {
              return loginHandler(values);
            }}
            validate={(values) => {
              const errors: any = {};

              // title validation
              if (!values.username) errors.username = "Required";
              if (!values.password) errors.password = "Required";

              return errors;
            }}
          >
            <Form className="form-ki">
              <InputTextV2
                type="text"
                name="username"
                label="Email/Username"
                required
              />{" "}
              <InputTextV2
                type="password"
                name="password"
                label="Password"
                required
              />
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
                text={loading ? "loading..." : "login"}
              />
            </Form>
          </Formik>

          {!isSuper && (
            <>
              <hr />
              <p>
                Belum punya akun, silahkan{" "}
                <Link href="/register">
                  <a>Register Disini</a>
                </Link>{" "}
                atau{" "}
                <Link href="/forgot-password">
                  <a>Lupa password</a>
                </Link>
              </p>
            </>
          )}
        </div>

        {/* footer navigation */}
        <div className="login-box__footer">
          <small>
            <Link href="/">
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

export default Login;
