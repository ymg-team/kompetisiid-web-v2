import React from "react";
import { Field, useField } from "formik";
import Script from "next/script";
import { CKEDitorStyled } from "./styled";

let CKEditorInterval = null;

const CKEditor = (props) => {
  const { label, name, required, noLabel, disabled } = props;
  const [field, meta, helpers] = useField(props);
  const CKEditorRef = React.useRef(null);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      CKEditorInterval = setInterval(() => {
        if (window.ClassicEditor) {
          clearInterval(CKEditorInterval);
          initCKEditor();
        }
      }, 500);
    }
  }, []);

  const initCKEditor = async () => {
    CKEditorRef.current = await ClassicEditor.create(
      document.querySelector("#editor")
    ).catch((error) => {
      console.error("CKEditor Error", error);
    });

    CKEditorRef.current.setData(field.value || "");
    CKEditorRef.current.model.document.on("change", () => {
      const e = {
        target: {
          name,
          value: CKEditorRef.current.getData(),
        },
      };
      field.onChange(e);
    });
  };

  return (
    <Field {...{ name }}>
      {({
        // field, // { name, value, onChange, onBlur }
        // form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
        meta,
      }) => (
        <>
          <Script
            src="https://cdn.ckeditor.com/ckeditor5/37.1.0/classic/ckeditor.js"
            async
          />
          <div
            className={`form-child ${meta.touched && meta.error && "error"} `}
          >
            {!noLabel && (label || name) && (
              <label>
                {label || name}{" "}
                {required && <span className="text-red">*</span>}
              </label>
            )}
            <CKEDitorStyled>
              <div id="editor" />
            </CKEDitorStyled>
            {meta.touched && meta.error && <small>{meta.error}</small>}
          </div>
        </>
      )}
    </Field>
  );
};

export default CKEditor;
