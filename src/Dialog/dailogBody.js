import React from "react";
import styles from "./dialog.module.css";

const DialogBody = (props) => {
  return <div className={styles.main}>{props.children}</div>;
};

export default DialogBody;
