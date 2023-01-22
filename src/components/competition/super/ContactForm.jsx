import React from "react";
import Button from "../../buttons/index";

const CONTACT_TYPE = [
  {
    valueKey: 1,
    textKey: "Web Link",
    icon: "",
  },
  {
    valueKey: 2,
    textKey: "Facebook",
    icon: "",
  },
  {
    valueKey: 3,
    textKey: "Twitter",
    icon: "",
  },
  {
    valueKey: 4,
    textKey: "Instagram",
    icon: "",
  },
  {
    valueKey: 5,
    textKey: "Google Plus",
    icon: "",
  },
  {
    valueKey: 6,
    textKey: "Email",
    icon: "",
  },
  {
    valueKey: 7,
    textKey: "Alamat",
    icon: "",
  },
  {
    valueKey: 8,
    textKey: "Youtube",
    icon: "",
  },
  {
    valueKey: 9,
    textKey: "Telepon",
    icon: "",
  },
];

class ContactForm extends React.Component {
  addContactHandler = () => {
    let { contacts } = this.props;
    contacts.push({ textKey: 1, value: "" });
    return this.props.setState({ contacts });
  };

  removeContactHandler = (key) => {
    let { contacts } = this.props;
    contacts.splice(key, 1);
    return this.props.setState(contacts);
  };

  changeSelectHandler = (e, key) => {
    let { contacts } = this.props;
    contacts[key].type = e.target.value;

    return this.props.setState({ contacts });
  };

  changeInputHandler = (e, key) => {
    let { contacts } = this.props;
    contacts[key].value = e.target.value;
    return this.props.setState({ contacts });
  };

  itemGenerator = (n = {}, key) => {
    return (
      <div key={key} className="row" style={{ padding: "10px 0" }}>
        <div style={{ paddingLeft: 0 }} className="col-xs-4">
          <select
            className="form-child"
            onChange={(e) => this.changeSelectHandler(e, key)}
            value={n.type || ""}
          >
            {CONTACT_TYPE.map((n, key) => {
              return (
                <option key={key} value={n.id}>
                  {n.type}
                </option>
              );
            })}
          </select>
        </div>
        <div className="col-xs-6">
          <input
            onChange={(e) => this.changeInputHandler(e, key)}
            style={{ padding: 0, margin: 0 }}
            className="form-child"
            type="text"
            value={n.value || ""}
          />
        </div>
        <div className="col-xs-2">
          <Button onClick={() => this.removeContactHandler(key)} color={"red"}>
            X
          </Button>
        </div>
      </div>
    );
  };

  render = () => {
    return (
      <React.Fragment>
        {this.props.contacts.map((n, key) => {
          return this.itemGenerator(n, key);
        })}
        <div style={{ paddingLeft: 0 }} className="row col-xs-12">
          {this.props.contacts.length > 0 ? <br /> : null}
          <Button type="button" onClick={() => this.addContactHandler()}>
            {" "}
            + Tambahkan Kontak
          </Button>
        </div>
      </React.Fragment>
    );
  };
}

export default ContactForm;
