import React from "react";
import styles from "./dialog.module.css";
import PropTypes from "prop-types";

const DialogFooter = (props) => {
  let footerClass = props.multiple ? "multiple" : "";
  return (
    <div
      className={`${styles.footer} ${styles[footerClass]} ${
        props.className ? props.className : ""
      }`}
    >
      {props.children}
    </div>
  );
};

DialogFooter.prototype = {
  multiple: PropTypes.bool,
  className: PropTypes.string,
};

export default DialogFooter;
