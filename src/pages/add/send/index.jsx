import React, { Component } from "react";
import { alert } from "@components/Alert";
// import { submitCepat } from "./actions";

// components
import SEO from "@components/meta/SEO";
import Link from "next/link";
import InputText from "@components/form/InputText";
import InputFile from "@components/form/InputFile";
import Submit from "@components/form/Submit";
import Subheader from "@components/Subheader";

let RecaptchaContainer;

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
  // === initial states ===

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
            <form
              id="form-send-competition"
              method="POST"
              className="form-ki"
              action="#"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <InputText
                label="email"
                name="input_email"
                setState={(n, cb) => this.setState(n, cb)}
                validate={this.state.input_email_validate || {}}
                value={this.state.input_email || ""}
                required={true}
                max={50}
                type="email"
              />
              <InputText
                id="txt_link_kompetisi"
                label="link kompetisi"
                note="Dengan mengisi link, maka judul dan poster kompetisi akan otomatis terisi"
                name="input_link"
                onInput={(e) => {
                  if (e.target.value) {
                    this.metaGenerator(e.target.value);
                  }
                }}
                setState={(n, cb) => this.setState(n, cb)}
                validate={this.state.input_link_validate || {}}
                value={this.state.input_link || ""}
                required={true}
                max={300}
                type="link"
              />
              <InputText
                label="judul kompetisi"
                name="input_title"
                setState={(n, cb) => this.setState(n, cb)}
                validate={this.state.input_title_validate || {}}
                value={this.state.input_title || ""}
                required={true}
                max={300}
              />
              <InputFile
                label="poster"
                name="input_poster"
                max="2000000" //max 2MB
                setState={(n, cb) => this.setState(n, cb)}
                validate={this.state.input_poster_validate || {}}
                value={this.state.input_poster || ""}
              />
              <div className="form-child">
                <input
                  onClick={() =>
                    this.setState({ is_accept: !this.state.is_accept })
                  }
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
              </div>
              <div className="form-child">
                <div
                  id="g-recaptcha"
                  className="g-recaptcha"
                  data-sitekey="6LcRCAQTAAAAANRlhWdxZvkj00Ee4aP_Zc2Q42Mi"
                />
              </div>
              <div className="form-child">
                <Submit
                  id="form-submit-send-competition"
                  type="submit"
                  loading={this.state.loading}
                  text="kirim permintaan"
                  disabled={response.is_loading}
                  requiredInputs={[
                    "input_email",
                    "input_title",
                    "input_link",
                    "input_poster",
                  ]}
                  setState={(n, cb) => this.setState(n, cb)}
                  action={() => this.handleSubmit()}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SendCompetition;

class AddCompetitionFast extends Component {
  constructor(props) {
    super(props);
    this.state = {
      is_accept: false,
      loading: true,
      input_link: "https://",
    };
  }

  componentDidMount() {
    addScript();

    setTimeout(() => {
      renderRecaptcha();
      this.setState({ loading: false });
    }, 1500);
  }

  UNSAFE_componentWillReceiveProps(np) {
    if (np.response.status && np.response.status != 201)
      this.setState({ loading: false });
    renderRecaptcha();
  }

  componentWillUnmount() {
    alert(false);
    if (RecaptchaContainer) grecaptcha.reset(RecaptchaContainer);
  }

  handleSubmit() {
    if (!this.state.is_accept) {
      return alert(
        true,
        "Wajib menyetujui syarat dan ketentuan yang berlaku",
        "error"
      );
    } else if (!this.state.input_poster) {
      return alert(true, "Wajib upload poster", "error");
    } else if (grecaptcha.getResponse().length == 0) {
      return alert(true, "Rechaptcha belum valid", "error");
    } //start submit
    else {
      this.setState(
        {
          loading: true,
        },
        () => {
          return this.props.dispatch(
            submitCepat({
              link: this.state.input_link,
              title: this.state.input_title,
              email: this.state.input_email,
              poster: this.state.input_poster,
            })
          );
        }
      );
    }
  }

  render() {
    const { response } = this.props;
    if (response.is_loading)
      alert(true, "Mengirim kompetisi...", "warning", true);

    if (response.status) {
      if (response.status === 201) {
        alert(true, response.message, "success");
        setTimeout(() => {
          location.href = "/";
        }, 2000);
      } else {
        alert(true, response.message, "error");
      }
    }

    return <>dfdfdf</>;
  }
}

function addScript() {
  if (!window.grecaptcha) {
    let script = document.createElement("script");
    script.setAttribute("src", "https://www.google.com/recaptcha/api.js");
    document.head.appendChild(script);
  }
}

function renderRecaptcha() {
  if (window.grecaptcha && !document.getElementById("g-recaptcha")) {
    RecaptchaContainer = grecaptcha.render("g-recaptcha", {
      sitekey: "6LcRCAQTAAAAANRlhWdxZvkj00Ee4aP_Zc2Q42Mi",
    });
  }
}

// function mapStateToProps(state) {
//   const { Pasang } = state;
//   return {
//     response: Pasang.cepat,
//   };
// }

// export default connect(mapStateToProps)(AddCompetitionFast);
