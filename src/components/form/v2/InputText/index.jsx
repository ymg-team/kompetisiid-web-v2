import { Field, Form, Formik, FormikProps } from "formik";

const InputTextV2 = ({ label, name, type, placeholder, required }) => {
  return (
    <Field name={name}>
      {({
        field, // { name, value, onChange, onBlur }
        form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
        meta,
      }) => (
        <div className={`form-child ${meta.touched && meta.error && "error"} `}>
          {(label || name) && (
            <label>
              {label || name} {required && <span className="text-red">*</span>}
            </label>
          )}
          <input {...{ type, placeholder }} {...field} />
          {meta.touched && meta.error && <small>{meta.error}</small>}
        </div>
      )}
    </Field>
  );
};

InputTextV2.defaultProps = {
  type: "text",
};

export default InputTextV2;
