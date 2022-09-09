import React from "react";
import { LoginComponentInterface } from "./interfaces";

import Link from "next/link";
import { Form, Formik } from "formik";

import SEO from "@components/meta/SEO";
import FullScreen from "@components/Fullscreen";
import InputTextV2 from "@components/form/v2/InputText";
import { LoginStyled } from "./styled";
import Submit from "@components/form/v2/Submit";

const Login: React.FC<LoginComponentInterface> = ({ isSuper }) => {
  // === initial states ===
  const [loading, setLoading] = React.useState(false);
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  // === initial memos ===
  const Meta = React.useMemo(() => {
    return {
      title: isSuper ? "Halaman Super" : "Login Untuk ",
      description: "Login dan tetap jaga privasi anda ya",
    };
  }, [isSuper]);

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
              console.log("values", values);
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

          {/* <form
            className="form-ki"
            action="#"
            onSubmit={(e) => {
              e.preventDefault();
            }}
            method="post"
          >
            <div className="form-child">
              {username ? (
                <Input
                  label="Password"
                  name="password"
                  type="password"
                  id="input-password"
                  value={password || ""}
                  // validate={this.state.password_validate || {}}
                  setState={(n, cb) => this.setState(n, cb)}
                  required
                  autoFocus
                  autoComplete="off"
                />
              ) : (
                <Input
                  label="Email / username"
                  name="username"
                  type="text"
                  id="input-username"
                  value={username || ""}
                  validate={this.state.username_validate || {}}
                  setState={(n, cb) => this.setState(n, cb)}
                  required
                  autoFocus
                  autoComplete="off"
                />
              )}
            </div>
            <div className="form-child">
              <Submit
                className="btn btn-gray"
                disabled={loading}
                action={() => this.handleLogin()}
                requiredInputs={["username"]}
                setState={(n, cb) => this.setState(n, cb)}
                type="submit"
                style={{
                  fontWeight: "bold",
                  width: "100%",
                  backgroundColor: "#FFF",
                  color: "#292929",
                }}
                text={loading ? "loading..." : "login"}
              />
            </div>
          </form> */}

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
            <a target="_blank" href="https://goo.gl/forms/kMGGZQXJCjoyKThj1">
              Kontak
            </a>
            &nbsp;|&nbsp;
            <a
              href="https://kompetisi.id/news/TVRjPQ/Privacy-Policy"
              target="_blank"
            >
              Privacy
            </a>
            &nbsp;|&nbsp;
            <a href="https://kompetisi.id/news/TXpVPQ/About" target="_blank">
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
