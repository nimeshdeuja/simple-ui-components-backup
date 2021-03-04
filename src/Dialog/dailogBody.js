import React from "react";
import styles from "./dialog.module.css";
import PropTypes from "prop-types";

const DialogBody = (props) => (
  <div className={`${styles.main} ${props.className ? props.className : ""}`}>
    {props.children}
  </div>
);

DialogBody.prototype = {
  className: PropTypes.string,
};

export default DialogBody;
