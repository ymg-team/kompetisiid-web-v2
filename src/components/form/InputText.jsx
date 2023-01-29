import React, { Component } from "react";
import { validate } from "./Validator";

const is_valid = true;

const InputText = ({
  min,
  max,
  initialValue,
  label,
  name,
  type,
  validate,
  autoFocus,
  note,
  id,
  required,
  placeholder,
  onChange,
}) => {
  // initial values
  const [value, setValue] = React.useState(initialValue || "");

  const changeHandler = (e) => {
    const { value } = e.target;
    setValue(value);
    onChange(value);
  };

  return (
    <div className={`form-child ${!is_valid ? "error" : ""}`}>
      {label && (
        <label
          htmlFor={id || name}
          style={note ? { margin: "10px 0 5px" } : {}}
        >
          {label} {required ? <span className="text-red">*</span> : null}
        </label>
      )}

      {note && <small>{note}</small>}
      <input
        onInput={changeHandler}
        onChange={changeHandler}
        onBlur={changeHandler}
        name={name || id}
        id={id || name}
        // value={type === "number" ? value : value.replace(/[\u200B-\u200D\uFEFF]|\s\s/g, " ")}
        {...{ value, autoFocus, placeholder, value, type }}
      />
      {max ? (
        <small>
          {value.length || 0}/{max} karakter <br />
        </small>
      ) : null}
      {!is_valid ? <small>{validate.message}</small> : null}
    </div>
  );
};

InputText.defaultProps = {
  type: "text",
};

export default InputText;
