import React from "react";
import styles from "./dialog.module.css";
import PropTypes from "prop-types";

const DialogFooter = (props) => {
  let footerClass = props.multiple && "multiple";
  return (
    <div
      className={`${styles.footer} ${props.multiple && styles[footerClass]}`}
    >
      {props.children}
    </div>
  );
};

DialogFooter.prototype = {
  multiple: PropTypes.bool,
};

export default DialogFooter;
