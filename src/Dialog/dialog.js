import React from "react";
import PropTypes from "prop-types";
import style from "./dialog.module.css";

const Dialog = (props) => {
  const closeAllClickHandler = (event) => {
    if (event.target && event.target.title === props.title) {
      props.close();
    }
  };
  let moduleSize = props.size ? props.size : "md";
  let isMultipleButton = props.isMultipleButton ? "multipal" : "";
  let themeElementClass = props.theme ? props.theme : "default";

  let dailogElement = null;
  if (props.open)
    dailogElement = (
      <div
        className={style.modal}
        onClick={closeAllClickHandler}
        title={props.title}
      >
        <div
          className={`${style.modalContent} ${style[moduleSize]} ${style[isMultipleButton]} ${style[themeElementClass]}`}
        >
          <h2>
            {props.title} <span onClick={() => props.close()}>&times;</span>
          </h2>
          {props.children}
        </div>
      </div>
    );
  return dailogElement;
};

Dialog.prototype = {
  theme: PropTypes.string,
  size: PropTypes.string,
  isMultipleButton: PropTypes.bool,
  close: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
};

export default Dialog;
