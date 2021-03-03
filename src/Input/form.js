import React from "react";
import PropTypes from "prop-types";
import "./form.css";

const Form = (props) => {
  const submitClickHandler = (event) => {
    event.preventDefault();
    props.submit();
  };
  let formDesignClass = props.formStyle ? props.formStyle : "default";
  return (
    <form
      onSubmit={submitClickHandler}
      className={`simple-form ${formDesignClass}`}
    >
      {props.children}
    </form>
  );
};

Form.prototype = {
  formStyle: PropTypes.string, // options 'default', 'outline'
};

export default Form;
