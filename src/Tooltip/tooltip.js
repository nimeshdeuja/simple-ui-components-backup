import React from "react";
import Portal from "./portal";
import styles from "./tooltip.module.css";
import PropTypes from "prop-types";

function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

const position = (p) => ({
  current: p,
  negate() {
    if (this.current === "left") return "right";
    if (this.current === "right") return "left";
    if (this.current === "top") return "bottom";
    if (this.current === "bottom") return "top";
  },
  isHorizontal() {
    return this.current === "left" || this.current === "right";
  },
  isVertical() {
    return this.current === "top" || this.current === "bottom";
  },
});

const point = () => ({
  x: null,
  y: null,
  reset(p) {
    (this.x = p.x), (this.y = p.y);
  },
  restrictRect(rect) {
    if (this.x < rect.l) this.x = rect.l;
    else if (this.x > rect.r) this.x = rect.r;

    if (this.y < rect.t) this.y = rect.t;
    else if (this.y > rect.b) this.y = rect.y;
  },
});

const getPoints = (el, tt, placement, space, arrow) => {
  let recurCounter = 0;
  const pt = point();

  const bdys = {
    l: space,
    t: space,
    r: document.body.clientWidth - (tt.clientWidth + space),
    b: window.innerHeight - (tt.clientHeight + space),
  };

  const elRect = el.getBoundingClientRect();

  return (function recursive(placement) {
    recurCounter++;
    const pos = position(placement);

    switch (pos.current) {
      case "left":
        pt.x = elRect.left - (tt.offsetWidth + space);
        pt.y = elRect.top + (el.offsetHeight - tt.offsetHeight) / 2;
        break;
      case "right":
        pt.x = elRect.right + space;
        pt.y = elRect.top + (el.offsetHeight - tt.offsetHeight) / 2;
        break;
      case "top":
        pt.x = elRect.left + (el.offsetWidth - tt.offsetWidth) / 2;
        pt.y = elRect.top - (tt.offsetHeight + space);
        break;
      default:
        pt.x = elRect.left + (el.offsetWidth - tt.offsetWidth) / 2;
        pt.y = elRect.bottom + space;
    }

    if (recurCounter < 2)
      if (
        (pos.isHorizontal() && (pt.x < bdys.l || pt.x > bdys.r)) ||
        (pos.isVertical() && (pt.y < bdys.t || pt.y > bdys.b))
      ) {
        pt.reset(recursive(pos.negate()));
        getArrowPoint(pos.negate(), tt, arrow);
      } else {
        getArrowPoint(pos.current, tt, arrow);
      }

    // Restrict to boundary

    pt.restrictRect(bdys);

    return pt;
  })(placement);
};

const getArrowPoint = (placement, content, arrow) => {
  switch (placement) {
    case "left":
      arrow.style.top = (content.offsetHeight - arrow.offsetHeight) / 2 + "px";
      arrow.style.left = content.offsetWidth + "px";
      break;
    case "right":
      arrow.style.top = (content.offsetHeight - arrow.offsetHeight) / 2 + "px";
      arrow.style.right = content.offsetWidth + "px";
      break;
    case "bottom":
      arrow.style.bottom = content.offsetHeight + "px";
      arrow.style.left = (content.offsetWidth - arrow.offsetWidth) / 2 + "px";
      break;
    default:
      arrow.style.top = content.offsetHeight + "px";
      arrow.style.left = (content.offsetWidth - arrow.offsetWidth) / 2 + "px";
      break;
  }
  arrow.className = "";
  arrow.classList.add(`${styles[placement]}`);
};

const Tooltip = ({
  text,
  placement = "top",
  space = 10,
  children,
  disabled = 0,
}) => {
  let uid = uuidv4();

  const handleMOver = (e) => {
    const content = document.getElementById(`${uid}`);
    const arrow = document.getElementById(`${uid}arrow`);
    const { x, y } = getPoints(
      e.currentTarget,
      content,
      placement,
      space,
      arrow
    );
    content.style.left = x + "px";
    content.style.top = y + "px";
    content.style.visibility = "visible";
  };
  const handleMOut = () => {
    let content = document.getElementById(`${uid}`);
    content.style.visibility = "hidden";
  };

  return (
    <>
      {disabled
        ? children
        : React.cloneElement(<div>{children}</div>, {
            onMouseOver: handleMOver,
            onMouseOut: handleMOut,
          })}
      {disabled || (
        <Portal>
          <span id={uid} className={`${styles.tooltiptext}`}>
            {text}
            <span id={`${uid}arrow`} className={`${styles[placement]}`}></span>
          </span>
        </Portal>
      )}
    </>
  );
};

Tooltip.prototype = {
  text: PropTypes.string,
  placement: PropTypes.string, // options 'top', 'left', 'right', 'bottom'
  space: PropTypes.number,
  disabled: PropTypes.bool,
};

export default Tooltip;
