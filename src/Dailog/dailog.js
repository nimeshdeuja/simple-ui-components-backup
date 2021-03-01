import React from "react";
import PropTypes from "prop-types";
import style from "./dailog.module.css";

const Dailog = (props) => {
  const closeAllClickHandler = (event) => {
    if (event.target && event.target.title === props.title) {
      props.close();
    }
  };
  let moduleSize = "md";
  if (props.size) moduleSize = props.size;

  let isMultipleButton = "";
  if (props.isMultipleButton) isMultipleButton = "multipal";

  let themeElementClass = "default";
  if (props.theme) themeElementClass = props.theme;

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

Dailog.prototype = {
  theme: PropTypes.string,
  size: PropTypes.string,
  isMultipleButton: PropTypes.bool,
  close: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
};

export default Dailog;
