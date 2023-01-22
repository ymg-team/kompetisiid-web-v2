import { Field } from "formik";
import { SelectProps } from "./types";

const SelectV2: React.FC<SelectProps> = ({
  label,
  name,
  type,
  placeholder,
  required,
  noLabel,
  disabled,
  options,
}) => {
  return (
    <Field {...{ name }}>
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
          <select
            style={{ display: "block" }}
            {...{ type, placeholder, disabled }}
            {...field}
          >
            <option value="">-- Silahkan pilih opsi</option>
            {options?.map((n) => (
              <option key={n.value} value={n.value}>
                {n.text}
              </option>
            ))}
          </select>
          {meta.touched && meta.error && <small>{meta.error}</small>}
        </div>
      )}
    </Field>
  );
};

SelectV2.defaultProps = {
  type: "text",
  noLabel: false,
  required: false,
  disabled: false,
  options: [],
};

export default SelectV2;
