import React, { Component } from "react";
import Styled from "styled-components";
import { validate, validator } from "./Validator";

const SelectStyled = Styled.select`
  background: none;
  height: 40px;
  padding: 0 10px;
  border: 1px lightgray solid;

  &.error {
    border-color: #cf3030 !important;
    color: #cf3030 !important;
  }
`;

const is_valid = true;

const Select = ({
  label,
  name,
  options,
  valueKey,
  textKey,
  onChange,
  initialValue,
}) => {
  // initial values
  const [value, setValue] = React.useState(initialValue || "");

  const handleChange = (e) => {
    const { value } = e.target;
    onChange(value);
    setValue(value);
  };

  return (
    <div className={`form-child ${!is_valid ? "error" : ""}`}>
      {label && (
        <label htmlFor={name}>
          {label}{" "}
          {this.props.required ? <span className="text-red">*</span> : null}
        </label>
      )}

      <SelectStyled
        className={`form-child ${!is_valid ? "error" : ""}`}
        onChange={handleChange}
        value={value || ""}
      >
        <option value="0">--- Pilih salah satu</option>
        {options.map((n, key) => (
          <option key={key} value={n[valueKey] || "no value"}>
            {n[textKey] || "no text"}
          </option>
        ))}
      </SelectStyled>
    </div>
  );
};

export default Select;
