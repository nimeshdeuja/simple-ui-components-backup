import React from "react";
import PropTypes from "prop-types";
import "./form.css";

const Form = ({ layout = "default", submit, className = "", children }) => {
  const submitClickHandler = (event) => {
    event.preventDefault();
    submit();
  };
  return (
    <form
      onSubmit={submitClickHandler}
      className={`simple-form ${layout} ${className}`}
      autoComplete="Off"
    >
      {children}
    </form>
  );
};

Form.prototype = {
  layout: PropTypes.string, // options 'default', 'outline'
  className: PropTypes.string,
  submit: PropTypes.func.isRequired,
};

export default Form;
