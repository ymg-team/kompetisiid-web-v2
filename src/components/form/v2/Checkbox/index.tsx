import { Field } from "formik";
import { InputTextProps } from "./types";

const Checkbox: React.FC<InputTextProps> = ({
  label,
  name,
  placeholder,
  required,
  noLabel,
  disabled,
}) => {
  return (
    <Field {...{ name }}>
      {({
        field, // { name, value, onChange, onBlur }
        // form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
        meta,
      }: any) => (
        <div className={`form-child ${meta.touched && meta.error && "error"} `}>
          {(label || name) && (
            <label>
              <input
                type="checkbox"
                {...{ placeholder, disabled }}
                checked={field.value}
                {...field}
              />
              &nbsp;
              {label || name} {required && <span className="text-red">*</span>}
            </label>
          )}
          {meta.touched && meta.error && <small>{meta.error}</small>}
        </div>
      )}
    </Field>
  );
};

Checkbox.defaultProps = {
  noLabel: false,
  required: false,
  disabled: false,
};

export default Checkbox;
