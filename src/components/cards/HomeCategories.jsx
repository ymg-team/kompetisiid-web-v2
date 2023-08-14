import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import SubHeader from "../headers/SubHeader";

export default class HomeCategories extends PureComponent {
  static defaultProps = {
    meta: {},
  };

  render() {
    return (
      <div
        className="col-md-12"
        style={{
          borderTop: "1px solid gray",
          borderBottom: "1px solid gray",
          padding: "3em 0",
        }}
      >
        <SubHeader
          customClass={"container p-b-50"}
          title="Kategori"
          text="Berikut beberapa ketegori kompetisi yang bisa diikuti disini."
        />

        <div className="container">
          <div className="col-md-12" style={{ wordBreak: "break-word" }}>
            <div className="row">
              {this.props.meta && this.props.meta.code == 200
                ? this.props.data.map((n, key) => (
                    <span style={{ marginRight: "10px" }} key={key}>
                      <Link legacyBehavior href={`/browse/${n.main_kat}`}>
                        <a> {`${n.main_kat} (${n.count_kompetisi})`}</a>
                      </Link>
                    </span>
                  ))
                : null}
              <br />
              <br />
              <Link legacyBehavior href="/categories">
                <a className="btn btn-bordergray">
                  {" "}
                  LIHAT SEMUA KATEGORI -&gt;{" "}
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
