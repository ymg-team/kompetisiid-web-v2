import React from "react";
import { validate, validator } from "./Validator";

const DatePicker = (props) => {
  // initial refs
  const Picker = React.useRef(null);

  // initial effects
  React.useEffect(() => {
    // componentDidMount
    validate(props);

    // init Pikaday
    initPikaday();
  }, []);

  // listen value changes
  React.useEffect(() => {
    validate(props);
  }, [props.value]);

  // listen initial date changes
  React.useEffect(() => {
    console.log("initialDate", initialDate);
  }, [initialDate]);

  // initial functions

  const validateInput = (props = props) => {
    const result = validate(props);
    props.setState({
      [props.name + "_validate"]: result,
    });
  };

  const initPikaday = () => {
    let { config } = props;
    config = Object.assign(
      {
        field: document.getElementById(props.id || props.name),
        format: "D MMM YYYY",
        onSelect: (val) => {
          props.setState(
            {
              [props.name]: val,
            },
            () => {
              // validateInput()
            }
          );
        },
      },
      config
    );
    setTimeout(
      () => {
        if (window.Pikaday) {
          Picker.current = new Pikaday(config);

          // set default Pikaday value
          if (props.value) {
            console.log("set timepicket value", props.value);
            Picker.current.setDate(props.value);
          }
        }
      },
      typeof window.Pikaday ? 0 : 2500
    );
  };

  const is_valid = !(!props.validate.is_valid && props.validate.message);

  return (
    <div className={`form-child ${!is_valid ? "error" : ""}`}>
      {props.label && (
        <label htmlFor={props.id || props.name}>
          {props.label} {props.required && <span className="text-red">*</span>}
        </label>
      )}
      <input
        type="text"
        id={props.id || props.name}
        autoComplete={"off"}
        onClick={() => {
          console.log("clicked...");
          if (!Picker.current) {
            initPikaday();
          }
        }}
      />
      {!is_valid && <small>{validate.message}</small>}
    </div>
  );
};

DatePicker.defaultProps = {
  config: {},
  initialDate: new Date(),
};

export default DatePicker;
