import { Field, FormikContextType } from "formik";
import { InputTextInterface } from "./interfaces";

const InputTextV2: React.FC<InputTextInterface> = ({
  label,
  name,
  type,
  placeholder,
  required,
  noLabel,
  disabled,
}) => {
  return (
    <Field name={name}>
      {({
        field, // { name, value, onChange, onBlur }
        form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
        meta,
      }: any) => (
        <div className={`form-child ${meta.touched && meta.error && "error"} `}>
          {!noLabel && (label || name) && (
            <label>
              {label || name} {required && <span className="text-red">*</span>}
            </label>
          )}
          <input {...{ type, placeholder, disabled }} {...field} />
          {meta.touched && meta.error && <small>{meta.error}</small>}
        </div>
      )}
    </Field>
  );
};

InputTextV2.defaultProps = {
  type: "text",
  noLabel: false,
  required: false,
  disabled: false,
};

export default InputTextV2;
