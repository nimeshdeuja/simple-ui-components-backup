import React from "react";
import "./form.css";
import "./form-default.css";
import "./form-outline.css";

var uploadedFile = {};

const Input = (props) => {
  const {
    elementConfig,
    elementType,
    changed,
    value,
    className = "",
    invalid,
    shouldValidate,
    touched,
    inputStyle,
    autoComplete = "Off - text",
  } = props;
  let inputStyleClass = inputStyle.width ? inputStyle.width : "";
  let isFirstElement = inputStyle.isLast ? "last" : "";

  let error = invalid && shouldValidate && touched ? "error" : "";

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
      <div
        className={`custom-field ${inputStyleClass} ${isFirstElement} ${className} ${error}`}
      >
        <input
          type="password"
          value={value}
          id={elementConfig.id}
          className={value.length > 0 ? "focused" : ""}
          autoComplete={autoComplete}
          onChange={(event) => changed(event.target.value, event)}
          onBlur={(event) => {
            if (event.target.value.length > 0) {
              event.target.classList.add("focused");
            } else {
              event.target.classList.remove("focused");
            }
          }}
        />
        <span className="placeholder">{elementConfig.placeholder}</span>

        {elementConfig.showPassword && (
          <span
            className="showHidePassword"
            id={elementConfig.id + "showHide"}
            onClick={(event) => {
              let el = document.getElementById([elementConfig.id]);
              el.type = el.type === "text" ? "password" : "text";
              let textElement = document.getElementById(
                [elementConfig.id] + "showHide"
              );
              textElement.innerHTML = textElement.innerHTML === "S" ? "H" : "S";
            }}
          >
            S
          </span>
        )}
      </div>
    );
  } else {
    defaultInput = (
      <div
        className={`custom-field ${inputStyleClass} ${isFirstElement} ${className} ${error}`}
      >
        <input
          type="text"
          value={value}
          className={value.length > 0 ? "focused" : ""}
          autoComplete={autoComplete}
          onChange={(event) => changed(event.target.value, event)}
          onBlur={(event) => {
            if (event.target.value.length > 0) {
              event.target.classList.add("focused");
            } else {
              event.target.classList.remove("focused");
            }
          }}
        />
        <span className="placeholder">{elementConfig.placeholder}</span>
      </div>
    );
  }

  let inputElement = null;
  switch (elementType) {
    case "input":
      inputElement = defaultInput;
      break;
    case "textarea":
      inputElement = (
        <div
          className={`custom-textarea ${inputStyleClass} ${isFirstElement} ${className} ${error}`}
        >
          <textarea
            value={value}
            className={value.length > 0 ? "focused" : ""}
            rows={elementConfig && elementConfig.rows ? elementConfig.rows : 4}
            onChange={(event) => changed(event.target.value, event)}
            onBlur={(event) => {
              if (event.target.value.length > 0) {
                event.target.classList.add("focused");
              } else {
                event.target.classList.remove("focused");
              }
            }}
          ></textarea>
          <span className="placeholder">{elementConfig.placeholder}</span>
        </div>
      );
      break;
    case "select":
      inputElement = (
        <div
          className={`custom-select ${inputStyleClass} ${isFirstElement} ${className} ${error}`}
        >
          <div className="holder">
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
            <span className="arrow"></span>
          </div>
          <span className="placeholder focused">
            {elementConfig.placeholder}
          </span>
        </div>
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
          {elementConfig.placeholder}
          {ele}
        </>
      );
      if (elementConfig && elementConfig.labelText === "right")
        checkboxElement = (
          <>
            {ele}
            {elementConfig.placeholder}
          </>
        );
      inputElement = (
        <div
          className={`custom-checkbox ${inputStyleClass} ${isFirstElement} ${className} ${error}`}
        >
          {elementConfig.label !== "" && (
            <span className="title">{elementConfig.label}</span>
          )}
          <label className={elementConfig.labelText}>{checkboxElement}</label>
        </div>
      );
      break;
    case "radio":
      inputElement = (
        <div
          className={`custom-radio ${inputStyleClass} ${isFirstElement} ${className} ${error}`}
        >
          <span className="placeholder">{elementConfig.placeholder}</span>
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
                <label className={elementConfig.labelText} key={index}>
                  {radioElement}
                </label>
              );
            })}
        </div>
      );
      break;
    case "file":
      inputElement = (
        <div
          className={`custom-file ${inputStyleClass} ${isFirstElement} ${className} ${error}`}
        >
          <span
            onClick={(event) => {
              event.preventDefault();
              let button = document.getElementById(elementConfig.name);
              button.click();
            }}
          >
            {elementConfig.placeholder}
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
        </div>
      );
      break;
    default:
      inputElement = defaultInput;
  }
  return inputElement;
};

export default Input;
