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
    inputStyle,
    autoComplete = "Off",
  } = props;

  let classes = `${invalid && shouldValidate && touched ? styles.error : ""} ${[
    className,
  ]}`;

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
              rows={
                elementConfig && elementConfig.rows ? elementConfig.rows : 4
              }
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
      let ele = (
        <input
          name="isGoing"
          type="checkbox"
          checked={value}
          onChange={(event) => changed(event.target.checked, event)}
        />
      );
      let checkboxElement = (
        <>
          {label}
          {ele}
        </>
      );
      if (elementConfig && elementConfig.labelText === "right")
        checkboxElement = (
          <>
            {ele}
            {label}
          </>
        );
      inputElement = (
        <React.Fragment>
          {elementConfig && (
            <label className={`${classes} ${styles[elementConfig.labelText]}`}>
              {checkboxElement}
            </label>
          )}
        </React.Fragment>
      );
      break;
    case "radio":
      inputElement = (
        <React.Fragment>
          <div>{label}</div>
          {elementConfig &&
            elementConfig.options.map((item, index) => {
              let ele = (
                <input
                  type="radio"
                  name={item.name}
                  value={item.value}
                  checked={value === item.value}
                  onChange={(event) => changed(event.target.value, event)}
                />
              );
              let radioElement = (
                <>
                  {item.label}
                  {ele}
                </>
              );
              if (elementConfig && elementConfig.labelText === "right")
                radioElement = (
                  <>
                    {ele}
                    {item.label}
                  </>
                );

              return (
                <label
                  className={`${classes} ${styles[elementConfig.labelText]}`}
                  key={index}
                >
                  {radioElement}
                </label>
              );
            })}
        </React.Fragment>
      );
      break;
    case "file":
      inputElement = (
        <label className={classes}>
          <span
            onClick={(event) => {
              event.preventDefault();
              let button = document.getElementById(elementConfig.name);
              button.click();
            }}
          >
            {label}
          </span>
          {uploadedFile && uploadedFile[elementConfig.name] && (
            <div>
              <b
                onClick={(event) => {
                  event.preventDefault();
                  delete uploadedFile[elementConfig.name];
                  document.getElementById(elementConfig.name).value = "";
                  changed("", event);
                }}
              >
                &times;
              </b>
              {uploadedFile[elementConfig.name]}
            </div>
          )}
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

  let inputStyleClass = inputStyle.width ? inputStyle.width : "full";
  let isFirstElement = inputStyle.isFirst ? "first" : "notFirst";
  return (
    <div
      className={`${styles[classElement]} ${styles[inputStyleClass]} ${styles[isFirstElement]}`}
    >
      {inputElement}
    </div>
  );
};

export default Input;
