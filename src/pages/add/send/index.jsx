import React from "react";
import { alert } from "@components/alert/Base";
import { Formik, Form } from "formik";
import Script from "next/script";

// services
import { sendCompetition } from "@services/sendCompetition";

// components
import SEO from "@components/meta/SEO";
import Link from "next/link";
import InputTextV2 from "@components/form/v2/InputText";
import Submit from "@components/form/v2/Submit";
import Subheader from "@components/Subheader";
import { useRouter } from "next/router";

const Meta = {
  title: "Pasang Kompetisi",
  description:
    "Apakah kamu penyelenggara kompetisi? jika iya, kamu bisa menggunakan fitur ini untuk mempublikasi kompetisimu di Kompetisi Id.",
};

const BreadcrumbData = [
  {
    title: "Home",
    link: "/",
  },
  {
    title: "Pasang Kompetisi",
    link: "/add",
  },
  {
    title: "Kirim Kompetisi",
    link: "/add/send",
  },
];

const SendCompetition = () => {
  const Router = useRouter();

  // === initial states ===
  const [loading, setLoading] = React.useState(false);
  const [isAccept, setIsAccept] = React.useState(false);
  const [response, setResponse] = React.useState({});

  React.useEffect(() => {
    setTimeout(() => {
      renderRecaptcha();
    }, 1000);
  });

  React.useEffect(() => {
    if (response.status || response.message) {
      if (response.status == 201) {
        alert(true, response.message, "success");
        setTimeout(() => {
          Router.push("/");
        }, 1500);
      } else {
        alert(true, response.message, "error");
        setLoading(false);
      }
    }
  }, [response]);

  // functions
  const renderRecaptcha = () => {
    if (window.grecaptcha && !document.getElementById("g-recaptcha")) {
      RecaptchaContainer = grecaptcha.render("g-recaptcha", {
        sitekey: "6LcRCAQTAAAAANRlhWdxZvkj00Ee4aP_Zc2Q42Mi",
      });
    }
  };

  return (
    <>
      <SEO {...Meta} />
      <Subheader
        breadcrumb={BreadcrumbData}
        title={Meta.title}
        desc={Meta.description}
      />
      <div style={{ marginTop: "20px" }} className="col-md-12">
        <div className="container">
          <div className="col-md-6 col-md-push-3 p-50-0">
            <h2>Kirim Kompetisi</h2>
            <p className="text-muted">
              Silahkan isi formulir dibawah ini secara komplit. Kami akan
              memberitahukan melalui email untuk memberikan jawaban seputar
              status kompetisi yang anda kirim ini.
              <br />
              <br />
              <Link href="/add">
                <a>kembali ke pasang</a>
              </Link>
            </p>
            <hr />

            <Formik
              initialValues={{ email: "", link: "", title: "", poster: null }}
              validate={(values) => {
                const errors = {};

                // title validation
                if (!values.title) errors.title = "Required";

                // link validation
                if (!values.link) errors.link = "Required";

                // email validation
                if (!values.email) {
                  errors.email = "Required";
                } else if (
                  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                  errors.email = "Invalid email address";
                }

                return errors;
              }}
              onSubmit={(values, { setSubmitting }) => {
                setLoading(true);
                setResponse({});

                if (!grecaptcha) grecaptcha.reset();

                setTimeout(async () => {
                  if (grecaptcha && grecaptcha.getResponse().length == 0) {
                    alert(true, "Rechaptcha belum valid", "error");
                    setLoading(false);
                  } else {
                    const Response = await sendCompetition({
                      jsonBody: values,
                    });
                    setResponse(Response);
                  }
                }, 500);
              }}
            >
              <Form className="form-ki">
                <InputTextV2 type="email" name="email" required />
                <InputTextV2 type="text" name="title" required />
                <InputTextV2 type="text" name="link" required />
                {/* <InputFileV2 name="poster" required /> */}
                <br />
                <div className="form-child">
                  <input
                    onClick={() => setIsAccept(!isAccept)}
                    type="checkbox"
                  />{" "}
                  Saya menyetujui{" "}
                  <a
                    href="https://kompetisi.id/news/TlRFPQ/Syarat-dan-Ketentuan-Mengirim-Kompetisi-di-Kompetisi.Id"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    syarat dan ketentuan yang berlaku
                  </a>
                  <br />
                  <div
                    id="g-recaptcha"
                    className="g-recaptcha"
                    data-sitekey="6LcRCAQTAAAAANRlhWdxZvkj00Ee4aP_Zc2Q42Mi"
                  />
                </div>
                <div className="form-child">
                  <Submit
                    disabled={!isAccept}
                    {...{ loading }}
                    text="kirim permintaan"
                  />
                </div>
              </Form>
            </Formik>

            <Script src="https://www.google.com/recaptcha/api.js" />
          </div>
        </div>
      </div>
    </>
  );
};

export default SendCompetition;
