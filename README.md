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
let UpdatedObj = UpdateObject(OldObj, { age: 32 });
// return {name: 'Nimesh Deuja', age: 32}

let OldArr = [{ name: "Nimesh Deuja", age: 32 }];
let UpdatedArr = UpdateArray(OldArr, {
  name: "Abhisekh Deoja",
  age: 34,
});
// return [{name: 'Nimesh Deuja', age: 32},{name: 'Abhisekh Deoja',age: 34}]

let ShortedArr = ShortArray(UpdatedArr, "name", "ASC");
// return [{name: 'Abhisekh Deoja',age: 34},{name: 'Nimesh Deuja', age: 32}]

let index = GetIndexBy(ShortedArr, "age", 34);

let ShortName = ShortNameGenerate("Nimesh Deuja");
// return 'ND'
```

### Dialog

```jsx
import {  Dialog, DialogBody, DialogFooter, } from "simple-ui-components";

<Dialog
  theme="default" // options: 'default', 'primary', 'secandary', 'danger'
  size="md" // options: 'sm', 'md', 'lg'
  close={()=>}
  open={true}
  title="Simple dialog box"
  className="myClass"
>
    <DialogBody
      className="myClass"
    >
      Dialog box body content.
    </DialogBody>
    <DialogFooter
      multiple={true}
      className="myClass"
    >
    Dialog box footer content.
    </DialogFooter>
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
      placeholder: "Name",
    },
    value: "",
    validation: {
      required: true,
      min: 6,
      max: 30,
    },
    valid: false,
    touched: false,
    className: "myClass",
    inputStyle: {
      width: "half",
      isLast: false,
    },
  },
  password: {
    elementType: "input",
    elementConfig: {
      type: "password",
      placeholder: "Password",
      showPassword: true,
      id: "password", // Id should be unique.
    },
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
      isLast: true,
    },
  },
  email: {
    elementType: "input",
    elementConfig: {
      type: "text",
      placeholder: "Email",
    },
    value: "",
    validation: {
      required: true,
      min: 6,
      max: 30,
    },
    valid: false,
    touched: false,
    inputStyle: {},
  },
  occupation: {
    elementType: "select",
    elementConfig: {
      placeholder: "Your occupation",
      options: [
        { id: "", name: "Select", value: "" },
        { id: "1", name: "Developer", value: "developer" },
        { id: "2", name: "UI/UX Designer", value: "designer" },
      ],
    },
    value: "", // selected value can be options id
    validation: {
      required: true,
    },
    valid: false,
    touched: false,
    inputStyle: {},
  },
  status: {
    elementType: "checkbox",
    elementConfig: {
      label: "Looking for full time job?",
      placeholder: "Yes i am!",
      labelText: "right", //options: 'left', 'right'
    },
    value: true,
    validation: {
      required: true,
      checkbox: true,
    },
    valid: false,
    touched: false,
    inputStyle: {},
  },
  maritalStatus: {
    elementType: "radio",
    elementConfig: {
      placeholder: "Are you married?",
      labelText: "right", //options: 'left', 'right'
      options: [
        { label: "Yes", value: "yes", name: "yesNo" },
        { label: "No", value: "no", name: "yesNo" },
      ],
    },
    value: "", // selected value can be options value
    validation: {},
    valid: false,
    touched: false,
    inputStyle: {},
  },
  file: {
    elementType: "file",
    elementConfig: {
      placeholder: "Upload CV",
      name: "upload_file",
    },
    value: "",
    validation: {},
    valid: false,
    touched: false,
    inputStyle: {},
  },
  feedback: {
    elementType: "textarea",
    elementConfig: {
      placeholder: "Your feedback",
      rows: 10,
    },
    value: "",
    validation: {
      required: true,
      min: 6,
      max: 100,
    },
    valid: false,
    touched: false,
    inputStyle: {},
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
for (let key in form) {
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

<Form
  submit={submitClickHandler}
  layout="default" // options: 'default', 'outline'
>
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

### Tooltip

```jsx
import { Tooltip } from "simple-ui-components";

<Tooltip
  text="Tooltip text"
  placement="left" // options: 'top', 'right', 'bottom', 'left'
  className="myClass"
>
  Hover me
</Tooltip>;
```

### Button

```jsx
import { Button } from "simple-ui-components";

<Button
  type="button" // options 'button', 'submit'
  theme="default" // options 'default', 'primary', 'secondary', 'danger'
  clicked={() => console.log("simple button was clicked!")}
  style={{ height: 40 }}
  className="myClass"
  disabled={false}
>
  Click me
</Button>;
```

## Author

Nimesh Deuja
