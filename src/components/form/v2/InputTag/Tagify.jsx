import React from "react";
import Tagify from "@yaireo/tagify/dist/tagify.min.js";
import "@yaireo/tagify/dist/tagify.css";

const TagifyComponent = ({
  settings,
  children,
  name,
  className,
  placeholder,
  autoFocus,
  mode,
  defaultValue,
}) => {
  // initial refs
  const tagifyRef = React.useRef();
  const componentRef = React.useRef();

  // initial effects
  React.useEffect(() => {
    if (
      typeof window !== "undefined" &&
      Tagify &&
      componentRef.current &&
      !tagifyRef.current
    ) {
      tagifyRef.current = new Tagify(componentRef.current, settings || {});
    }
  }, [componentRef, tagifyRef, settings]);

  React.useEffect(() => {
    // if (tagifyRef.current) tagifyRef.current.trigger("chosen:updated");
  }, [children, tagifyRef]);

  const handleRef = (component) => {
    componentRef.current = component;
  };

  const attrs = {
    ref: handleRef,
    name,
    className,
    placeholder,
    autoFocus,
    defaultValue,
  };

  return mode === "textarea" ? (
    <textarea {...attrs} />
  ) : (
    <input {...attrs} type="text" />
  );
};

TagifyComponent.defaultProps = {
  autoFocus: false,
  placeholder: "",
  className: "",
};

export default TagifyComponent;
