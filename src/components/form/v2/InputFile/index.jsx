import React from "react";
import { Field } from "formik";

const BrowseAccept = {
  image: "image/*",
};

const InputFileV2 = ({
  label,
  name,
  fileType,
  placeholder,
  required,
  accept,
  initialPreview,
}) => {
  // initial states
  const [preview, setPreview] = React.useState(initialPreview || "");

  const changeHandler = React.useCallback((e, form) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (file) {
      const Reader = new FileReader();
      Reader.readAsDataURL(file);
      Reader.onload = () => {
        setPreview(Reader.result);
        // generate next value
        form.setFieldValue(name, Reader.result);
      };
      Reader.onerror = () => {
        console.error("Something wrong with input file");
      };
    }
  }, []);

  return (
    <Field {...{ name }}>
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
            {fileType === "image" && preview && (
              <img
                src={preview}
                alt="preview"
                style={{ maxWidth: 200, maxHeight: 200, marginBottom: 10 }}
              />
            )}
            <input
              {...{ placeholder }}
              {...field}
              type="file"
              accept={accept || BrowseAccept[fileType] || "*"}
              onChange={(e) => {
                changeHandler(e, form);
              }}
            />
            {meta.touched && meta.error && <small>{meta.error}</small>}
          </div>
        );
      }}
    </Field>
  );
};

InputFileV2.defaultProps = {
  placeholder: "",
};

export default InputFileV2;
