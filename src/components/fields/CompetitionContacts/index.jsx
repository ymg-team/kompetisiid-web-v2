import React from "react";
import { Field } from "formik";

// component
import Button from "@components/buttons";
import Spacer from "@components/boxs/Spacer";
import SelectV1 from "@components/form/Select";
import InputV1 from "@components/form/InputText";

const CONTACT_TYPES = [
  {
    id: 1,
    type: "Web Link",
    icon: "",
  },
  {
    id: 2,
    type: "Facebook",
    icon: "",
  },
  {
    id: 3,
    type: "Twitter",
    icon: "",
  },
  {
    id: 4,
    type: "Instagram",
    icon: "",
  },
  {
    id: 5,
    type: "Google Plus",
    icon: "",
  },
  {
    id: 6,
    type: "Email",
    icon: "",
  },
  {
    id: 7,
    type: "Alamat",
    icon: "",
  },
  {
    id: 8,
    type: "Youtube",
    icon: "",
  },
  {
    id: 9,
    type: "Telepon",
    icon: "",
  },
  {
    id: 10,
    type: "Tiktok",
    icon: "",
  },
  {
    id: 11,
    type: "Whatsapp",
    icon: "",
  },
];
const CompetitionContactsForm = ({ name, initialValue }) => {
  // initial states
  const [contacts, setContacts] = React.useState(initialValue);

  // handling add contacts
  const addHandler = React.useCallback(() => {
    const currContacts = [...contacts];
    currContacts.push({});
    setContacts(currContacts);
  }, [contacts]);

  const changeHandler = React.useCallback(
    ({ key, valueType, value, form }) => {
      const currContacts = [...contacts];
      if (valueType === "type") currContacts[key].type = value;
      if (valueType === "value") currContacts[key].value = value;
      setContacts(currContacts);
      // generate next value
      form.setFieldValue(name, currContacts);
    },
    [contacts]
  );

  return (
    <Field {...{ name }}>
      {({
        field, // { name, value, onChange, onBlur }
        form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
        meta,
      }) => {
        return (
          <>
            <div>
              {contacts.length === 0 ? (
                <p className="text-muted">Kontak belum tersedia</p>
              ) : (
                contacts.map((n, key) => {
                  return (
                    <div key={key} className="row">
                      <div className="col-md-5">
                        <SelectV1
                          options={CONTACT_TYPES}
                          value={n.type || ""}
                          initialValue={n.type || ""}
                          valueKey="id"
                          textKey="type"
                          onChange={(value) => {
                            changeHandler({
                              key,
                              value,
                              valueType: "type",
                              form,
                            });
                          }}
                        />
                      </div>
                      <div className="col-md-7">
                        <InputV1
                          value={n.value || ""}
                          initialValue={n.value || ""}
                          onChange={(value) => {
                            changeHandler({
                              key,
                              value,
                              valueType: "value",
                              form,
                            });
                          }}
                        />
                      </div>
                    </div>
                  );
                })
              )}
            </div>
            <div className="row">
              <div className="col-md-12">
                <Spacer size="small" />
                <Button
                  onClick={addHandler}
                  color="white"
                  size="small"
                  loading={false}
                  type="button"
                >
                  <>+ Tambahkan Kontak</>
                </Button>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                {meta.touched && meta.error && <small>{meta.error}</small>}
              </div>
            </div>
          </>
        );
      }}
    </Field>
  );
};

CompetitionContactsForm.defaultProps = {
  initialValue: [],
};

export default CompetitionContactsForm;
