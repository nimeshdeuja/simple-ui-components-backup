import React from "react";
import styles from "./tooltip.module.css";
import PropTypes from "prop-types";

const Tooltip = (props) => {
  let placementClass = props.placement ? props.placement : "top";
  return (
    <div
      className={`${styles.tooltip} ${props.className ? props.className : ""}`}
    >
      {props.children}
      <span className={`${styles.tooltiptext} ${styles[placementClass]}`}>
        {props.text}
      </span>
    </div>
  );
};

Tooltip.prototype = {
  placement: PropTypes.string, // Options 'top', 'left', 'bottom', 'right'
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default Tooltip;
