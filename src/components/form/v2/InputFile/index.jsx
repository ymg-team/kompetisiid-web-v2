import { Field, Form } from "formik";

const InputFileV2 = ({ label, name, type, placeholder, required }) => {
  return (
    <Field name={name}>
      {({
        field, // { name, value, onChange, onBlur }
        form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
        meta,
      }) => {
        delete field.value;
        return (
          <div
            className={`form-child ${meta.touched && meta.error && "error"} `}
          >
            {(label || name) && (
              <label>
                {label || name}{" "}
                {required && <span className="text-red">*</span>}
              </label>
            )}
            <input
              {...{ placeholder }}
              {...field}
              type="file"
              onChange={(e) => {
                e.preventDefault();
                form.setFieldValue("poster", e.target.files[0]);
              }}
            />
            {meta.touched && meta.error && <small>{meta.error}</small>}
          </div>
        );
      }}
    </Field>
  );
};

InputFileV2.defaultProps = {};

export default InputFileV2;
