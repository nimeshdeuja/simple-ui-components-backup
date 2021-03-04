import React from "react";
import PropTypes from "prop-types";
import styles from "./dialog.module.css";

const Dialog = (props) => {
  const closeAllClickHandler = (event) => {
    if (event.target && event.target.title === props.title) {
      props.close();
    }
  };
  let moduleSize = props.size ? props.size : "md";
  let themeElementClass = props.theme ? props.theme : "default";

  let dailogElement = null;
  if (props.open)
    dailogElement = (
      <div
        className={`${styles.modal} ${props.className ? props.className : ""}`}
        onClick={closeAllClickHandler}
        title={props.title}
      >
        <div
          className={`${styles.modalContent} ${styles[moduleSize]} ${styles[themeElementClass]}`}
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
  close: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default Dialog;
