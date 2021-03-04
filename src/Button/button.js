import React from "react";
import PropTypes from "prop-types";

import styles from "./button.module.css";

const Button = (props) => {
  const {
    type = "button",
    className = "",
    theme = "default",
    clicked,
    disabled,
    style,
  } = props;
  let themeClass = disabled ? "disabled" : theme;
  return (
    <button
      className={`${className} ${styles.button} ${styles[themeClass]}`}
      type={type}
      disabled={disabled}
      onClick={clicked}
      style={style}
    >
      {props.children}
    </button>
  );
};

Button.prototype = {
  type: PropTypes.string, // options 'button', 'submit'
  theme: PropTypes.string, // options 'default', 'primary', 'secondary', 'danger'
  className: PropTypes.string,
  disabled: PropTypes.bool,
  style: PropTypes.object,
  clicked: PropTypes.func.isRequired,
};

export default Button;
