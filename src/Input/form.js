import React from "react";
import style from "./form.module.css";

const Form = (props) => {
  const submitClickHandler = (event) => {
    event.preventDefault();
    props.submit();
  };
  let formDesignClass = props.layout ? props.layout : "default";
  return (
    <form onSubmit={submitClickHandler} className={style[formDesignClass]}>
      {props.children}
    </form>
  );
};

export default Form;
