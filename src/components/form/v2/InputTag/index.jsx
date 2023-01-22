import Styled from "styled-components";
import { Field } from "formik";

// conditional import components
let TagsComp = null;
if (typeof window !== "undefined") {
  const Tagify = require("./Tagify");
  TagsComp = Tagify.default;
}

const InputTagsStyled = Styled.div`
  .tagify {
    border: none;
    border-bottom: 2px solid #969696;
    width: 100%;
  }
`;

const InputTags = ({ name, ...props }) => {
  const tagifyAddHandler = (e, form) => {
    const tags = form.values[name];
    tags.push(e.detail.data.value);
    form.setFieldValue(name, tags);
  };

  const tagifyRemoveHandler = (e, form) => {
    const tags = form.values[name];
    const index = tags.indexOf(e.detail.data.value);
    tags.splice(index, 1);
    form.setFieldValue(name, tags);
  };

  return (
    <Field {...{ name }}>
      {({
        field, // { name, value, onChange, onBlur }
        form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
        meta,
      }) => {
        return (
          <InputTagsStyled
            className={`form-child ${meta.touched && meta.error && "error"} `}
          >
            <label htmlFor={props.id || props.name}>
              {props.label}{" "}
              {props.required && props.label && (
                <span className="text-red">*</span>
              )}
            </label>
            {TagsComp && name && (
              <>
                <TagsComp
                  // ref: https://github.com/yairEO/tagify#react
                  settings={{
                    callbacks: {
                      add: (e) => tagifyAddHandler(e, form),
                      remove: (e) => tagifyRemoveHandler(e, form),
                    },
                  }}
                  mode="input"
                  defaultValue={form.values[name]}
                  {...{ name }}
                />
                {meta.touched && meta.error && <small>{meta.error}</small>}
              </>
            )}
          </InputTagsStyled>
        );
      }}
    </Field>
  );
};

InputTags.defaultProps = {
  initialValue: "",
  tags: [],
};

export default InputTags;

// const Editor = () => <div>this is editor</div>
// export default Editor
