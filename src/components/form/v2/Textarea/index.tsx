import { Field } from "formik";
import { InputTextProps } from "./types";

const InputTextV2: React.FC<InputTextProps> = ({
  label,
  name,
  placeholder,
  required,
  noLabel,
  disabled,
  rows,
}) => {
  return (
    <Field name={name}>
      {({
        field, // { name, value, onChange, onBlur }
        // form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
        meta,
      }: any) => (
        <div className={`form-child ${meta.touched && meta.error && "error"} `}>
          {!noLabel && (label || name) && (
            <label>
              {label || name} {required && <span className="text-red">*</span>}
            </label>
          )}
          <textarea
            rows={rows || 3}
            {...{ placeholder, disabled }}
            {...field}
          />
          {meta.touched && meta.error && <small>{meta.error}</small>}
        </div>
      )}
    </Field>
  );
};

InputTextV2.defaultProps = {
  noLabel: false,
  required: false,
  disabled: false,
};

export default InputTextV2;
