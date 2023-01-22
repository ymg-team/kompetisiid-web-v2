import React from "react";
import DatePicker from "react-datepicker";
import { Field } from "formik";
import { InputTextProps } from "./types";

import "react-datepicker/dist/react-datepicker.css";

const Now = new Date();

const DatePickerV2 = ({
  label,
  name,
  required,
  noLabel,
  disabled,
  dateFormat,
  minDate,
  maxDate,
}) => {
  // initial refs
  const datePickerRef = React.useRef();

  // initial states
  const [dateVal, setDateVal] = React.useState(new Date());

  // handler rawOnChange
  // const changeHandlerRaw = (e) => {
  //   const { value } = e.target;

  //   if (value) {
  //   }
  // };

  // handle onKeyDown
  const keyDownHandler = (e, form) => {
    if (e.keyCode === 9 || e.which === 9) {
      // ignore press tab on datepicker, ref: https://github.com/Hacker0x01/react-datepicker/issues/2058#issuecomment-589451843
      if (datePickerRef.current) datePickerRef.current.setOpen(false);
    }
  };

  // handler onBlur
  const onBlurHandler = (e, form) => {
    const { value } = e.target;
    if (value) {
      const dateArr = value.split("-");
      const newDateVal = new Date(`${dateArr[2]}-${dateArr[1]}-${dateArr[0]}`);
      selectHandler(newDateVal, form);
    }
  };

  // handle change date
  const selectHandler = (date, form) => {
    setDateVal(date);
    form.setFieldValue(name, date);
  };

  // handle change date and time
  const changeHandler = (date, form) => {
    setDateVal(date);
    form.setFieldValue(name, date);
  };

  return (
    <Field {...{ name }}>
      {({
        field, // { name, value, onChange, onBlur }
        form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
        meta,
      }) => (
        <div className={`form-child ${meta.touched && meta.error && "error"} `}>
          {!noLabel && (label || name) && (
            <label>
              {label || name} {required && <span className="text-red">*</span>}
            </label>
          )}
          <DatePicker
            showYearDropdown
            showTimeSelect
            todayButton={"Today"}
            ref={datePickerRef}
            selected={dateVal}
            // onChangeRaw={changeHandlerRaw}
            onSelect={(date) => selectHandler(date, form)}
            onKeyDown={(e) => keyDownHandler(e, form)}
            onBlur={(e) => onBlurHandler(e, form)}
            onChange={(date) => changeHandler(date, form)}
            {...{ dateFormat, minDate, maxDate, disabled }}
            // {...field}
          />
          {/* <input {...{ type, placeholder, disabled }} {...field} /> */}
          {meta.touched && meta.error && <small>{meta.error}</small>}
        </div>
      )}
    </Field>
  );
};

DatePickerV2.defaultProps = {
  noLabel: false,
  required: false,
  disabled: false,
};

DatePickerV2.defaultProps = {
  dateFormat: "dd-MM-yyyy HH:mm:ss",
  minDate: Now,
  maxDate: new Date(`${Now.getFullYear() + 5}-01-01`),
};

export default DatePickerV2;
