import React from "react";
import styles from "./form.module.css";

var uploadedFile = {};

const Input = (props) => {
  const {
    label,
    elementConfig,
    elementType,
    changed,
    value,
    className,
    invalid,
    shouldValidate,
    touched,
    noMargin,
    autoComplete = "Off",
  } = props;

  let styleClass = className ? className : "";
  let classes = `${invalid ? styles.error : ""} ${styleClass}`;

  let defaultInput = null;
  const uploadImageHandler = (event) => {
    if (event.target.files && event.target.files.length > 0 && elementConfig) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        changed(reader.result, event);
      });
      uploadedFile[elementConfig.name] = event.target.files[0].name;
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  if (elementConfig && elementConfig.type === "password") {
    defaultInput = (
      <React.Fragment>
        <label className={classes}>
          {label}
          <input
            type="password"
            placeholder={elementConfig.placeholder}
            value={value}
            autoComplete={autoComplete}
            onChange={(event) => changed(event.target.value, event)}
          />
        </label>
      </React.Fragment>
    );
  } else {
    defaultInput = (
      <React.Fragment>
        <label className={classes}>
          {label}
          <input
            type="text"
            placeholder={elementConfig.placeholder}
            value={value}
            autoComplete={autoComplete}
            onChange={(event) => changed(event.target.value, event)}
          />
        </label>
      </React.Fragment>
    );
  }

  let inputElement = null;
  switch (elementType) {
    case "input":
      inputElement = defaultInput;
      break;
    case "textarea":
      inputElement = (
        <React.Fragment>
          <label className={classes}>
            {label}
            <textarea
              placeholder={elementConfig && elementConfig.placeholder}
              onChange={(event) => changed(event.target.value, event)}
              value={value}
            ></textarea>
          </label>
        </React.Fragment>
      );
      break;
    case "select":
      inputElement = (
        <React.Fragment>
          <label className={classes}>
            {label}
            {elementConfig && (
              <select
                onChange={(event) => changed(event.target.value, event)}
                defaultValue={value}
              >
                {elementConfig.options.map((item, index) => (
                  <option value={item.id} key={index}>
                    {item.name}
                  </option>
                ))}
              </select>
            )}
          </label>
        </React.Fragment>
      );
      break;
    case "checkbox":
      inputElement = (
        <React.Fragment>
          {elementConfig && elementConfig.labelText === "left" && (
            <label className={classes}>
              {label}
              <input
                name="isGoing"
                type="checkbox"
                checked={value}
                onChange={(event) => changed(event.target.checked, event)}
              />
            </label>
          )}
          {elementConfig && elementConfig.labelText === "right" && (
            <label className={classes}>
              <input
                name="isGoing"
                type="checkbox"
                checked={value}
                onChange={(event) => changed(event.target.checked, event)}
              />
              {label}
            </label>
          )}
        </React.Fragment>
      );
      break;
    case "radio":
      inputElement = (
        <React.Fragment>
          {elementConfig &&
            elementConfig.labelText === "left" &&
            elementConfig.options.map((item, index) => (
              <label key={index} className={classes}>
                {item.label}
                <input
                  type="radio"
                  name={item.name}
                  value={item.value}
                  checked={value === item.value}
                  onChange={(event) => changed(event.target.value, event)}
                />
              </label>
            ))}
          {elementConfig &&
            elementConfig.labelText === "right" &&
            elementConfig.options.map((item, index) => (
              <label key={index} className={classes}>
                <input
                  type="radio"
                  name={item.name}
                  value={item.value}
                  checked={value === item.value}
                  onChange={(event) => changed(event.target.value, event)}
                />
                {item.label}
              </label>
            ))}
        </React.Fragment>
      );
      break;
    case "file":
      inputElement = (
        <label
          onClick={(event) => {
            let button = document.getElementById(elementConfig.name);
            button.click();
          }}
          className={classes}
        >
          {label}
          {uploadedFile &&
            uploadedFile[elementConfig.name] &&
            `: ${uploadedFile[elementConfig.name]}`}
          <input
            type="file"
            id={elementConfig.name}
            onChange={uploadImageHandler}
            style={{ display: "none" }}
          />
        </label>
      );
      break;
    default:
      inputElement = defaultInput;
  }
  let classElement = "text";
  if (elementType) {
    classElement = elementType;
    if (elementConfig && elementConfig.type) {
      classElement = elementConfig.type;
    }
  }
  return <div className={styles[classElement]}>{inputElement}</div>;
};

export default Input;
