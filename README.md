# simple-ui-components

All kind of react components.

## Install

```bash
npm i simple-ui-components
```

## Usage

### Hooks

```jsx
import { Hooks } from "simple-ui-components";

const {
  UpdateObject,
  UpdateArray,
  ShortArray,
  GetIndexBy,
  ShortNameGenerate,
} = Hooks;

let OldObj = { name: "Nimesh Deuja" };
let UpdatedObj = UpdateObject(OldObj, { age: 32 }); // return {name: 'Nimesh Deuja', age: 32} -- Object

let OldArr = [{ name: "Nimesh Deuja", age: 32 }];
let UpdatedArr = UpdateArray(OldArr, {
  name: "Abhisekh Deoja",
  age: 34,
}); // return [{name: 'Nimesh Deuja', age: 32},{name: 'Abhisekh Deoja',age: 34}] -- Array

let ShortedArr = ShortArray(UpdatedArr, "name", "ASC"); // return [{name: 'Abhisekh Deoja',age: 34},{name: 'Nimesh Deuja', age: 32}] -- Array

let index = GetIndexBy(ShortedArr, "age", 34); // return 0 -- Number

let ShortName = ShortNameGenerate("Nimesh Deuja"); // return ND -- String
```

### Dialog

```jsx
import {  Dialog, DialogBody, DialogFooter, } from "simple-ui-components";

<Dialog
  theme="default" // *String* options 'default', 'primary', 'secandary', 'danger'
  size="md" // *String* options 'sm', 'md', 'lg'
  close={()=>} // *Function* close popup function
  open={true} // *Boolen*
  title="Simple dialog box" // *String*
>
  <DialogBody>Dialog box body content.</DialogBody>
  <DialogFooter  multiple={true} // *Boolen*
  >Dialog box footer content.</DialogFooter>
</Dialog>
```

### Input

```jsx
import {
  Hooks,
  Input,
  Form,
  Dialog,
  DialogBody,
  DialogFooter,
} from "simple-ui-components";

const { UpdateObject, CheckValidity } = Hooks;

const [isValid, setIsValid] = useState(false);

const [form, setForm] = useState({
  name: {
    elementType: "input",
    elementConfig: {
      type: "text",
      placeholder: "Your name",
    },
    label: "Name",
    value: "",
    validation: {
      required: true,
      min: 6,
      max: 30,
    },
    valid: false,
    touched: false,
    className: "myClassName",
    inputStyle: {
      width: "half",
      isFirst: true,
    },
  },
  password: {
    elementType: "input",
    elementConfig: {
      type: "password",
      placeholder: "Your password",
    },
    label: "Password",
    value: "",
    validation: {
      required: true,
      min: 6,
      max: 30,
    },
    valid: false,
    touched: false,
    inputStyle: {
      width: "half",
      isFirst: false,
    },
  },
  occupation: {
    elementType: "select",
    elementConfig: {
      options: [
        { id: "", name: "Select", value: "" },
        { id: "1", name: "Developer", value: "developer" },
        { id: "2", name: "UI/UX Designer", value: "designer" },
      ],
    },
    label: "Your occupation",
    value: "1", // selected value can be id
    validation: {
      required: true,
    },
    valid: false,
    touched: false,
    inputStyle: {
      width: "full",
      isFirst: true,
    },
  },
  status: {
    elementType: "checkbox",
    elementConfig: {
      labelText: "right", // 'left', 'right'
    },
    label: "Looking for full time job",
    value: true,
    validation: {
      required: true,
      checkbox: true,
    },
    valid: false,
    touched: false,
    inputStyle: {
      width: "full",
      isFirst: true,
    },
  },
  radio: {
    elementType: "radio",
    elementConfig: {
      labelText: "left", // 'left', 'right'
      options: [
        { label: "Yes", value: "yes", name: "yesNo" },
        { label: "No", value: "no", name: "yesNo" },
      ],
    },
    label: "Are you married?",
    value: "",
    validation: {},
    valid: false,
    touched: false,
    inputStyle: {
      width: "full",
      isFirst: true,
    },
  },
  file: {
    elementType: "file",
    elementConfig: {
      name: "upload_file",
    },
    label: "Upload CV",
    value: "",
    validation: {},
    valid: false,
    touched: false,
    inputStyle: {
      width: "full",
      isFirst: true,
    },
  },
  feedback: {
    elementType: "textarea",
    elementConfig: {
      placeholder: "Give us your feedback",
      rows: 10,
    },
    label: "Feedback",
    value: "",
    validation: {
      required: true,
      min: 6,
      max: 100,
    },
    valid: false,
    touched: false,
    inputStyle: {
      width: "full",
      isFirst: true,
    },
  },
});

const inputChangeHandler = (value, controlName) => {
  let updatedForm = UpdateObject(form, {
    [controlName]: UpdateObject(form[controlName], {
      value: value,
      valid: CheckValidity(value, form[controlName].validation),
      touched: true,
    }),
  });

  let validElement = true;

  for (let inputIdentifier in updatedForm) {
    validElement = updatedForm[inputIdentifier].valid && validElement;
  }

  setForm(updatedForm);
  setIsValid(validElement);
};

const formElementsArray = [];
for (let key in allForm) {
  formElementsArray.push({
    id: key,
    config: form[key],
  });
}

const submitClickHandler = (event) => {
  const toSend = {};
  for (let key in form) {
    toSend[key] = form[key].value;
  }
};

<Form submit={submitClickHandler} layout="default">
  {formElementsArray.map((formElement) => (
    <Input
      key={formElement.id}
      elementType={formElement.config.elementType}
      elementConfig={formElement.config.elementConfig}
      label={formElement.config.label}
      value={formElement.config.value}
      changed={(value, event) => inputChangeHandler(value, formElement.id)}
      invalid={!formElement.config.valid}
      shouldValidate={formElement.config.validation ? true : false}
      touched={formElement.config.touched}
      className={formElement.config.className}
      inputStyle={formElement.config.inputStyle}
    />
  ))}
</Form>;
```

## Author

Nimesh Deuja
