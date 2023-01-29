import React from "react";
import { Field } from "formik";
import { EditorV2Styled } from "./styled";
import { DefaultEditor } from "react-simple-wysiwyg";

const EditorV2 = ({ label, name, required, noLabel, disabled }) => {
  return (
    <Field {...{ name }}>
      {({
        field, // { name, value, onChange, onBlur }
        // form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
        meta,
      }) => (
        <div className={`form-child ${meta.touched && meta.error && "error"} `}>
          {!noLabel && (label || name) && (
            <label>
              {label || name} {required && <span className="text-red">*</span>}
            </label>
          )}
          <EditorV2Styled>
            <DefaultEditor {...{ disabled }} {...field} />
          </EditorV2Styled>
          {meta.touched && meta.error && <small>{meta.error}</small>}
        </div>
      )}
    </Field>
  );
};

EditorV2.defaultProps = {
  noLabel: false,
  required: false,
  disabled: false,
};

export default EditorV2;
