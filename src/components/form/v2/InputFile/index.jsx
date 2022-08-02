import { Field, Form, Formik, FormikProps } from "formik";

const InputFileV2 = ({ label, name, type, placeholder, required }) => {
  return (
    <Field name={name}>
      {({
        field, // { name, value, onChange, onBlur }
        form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
        meta,
      }) => (
        <div className={`form-child ${meta.touched && meta.error && "error"} `}>
          {(label || name) && (
            <label>
              {label || name} {required && <span className="text-red">*</span>}
            </label>
          )}
          <input
            {...{ placeholder }}
            {...field}
            type="file"
            onChange={(e) => {
              e.preventDefault();
              console.log(e.target.files[0]);
              // setFieldValue("poster", e.target.files[0]);
            }}
          />
          {meta.touched && meta.error && <small>{meta.error}</small>}
        </div>
      )}
    </Field>
  );
};

InputFileV2.defaultProps = {};

export default InputFileV2;
