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

let shortName = ShortNameGenerate("Nimesh Deuja"); // return ND -- String
```

### Dialog

```jsx
import { Dialog } from "simple-ui-components";

<Dialog
  theme="default" // *String* options 'default', 'primary', 'secandary', 'danger'
  size="md" // *String* options 'sm', 'md', 'lg'
  close={()=>} // *Function* close popup function
  open={true} // *Boolen*
  title="Simple dailog box" // *String*
  isMultipleButton={true} // *Boolen*
>
  <main>Dailog box body content.</main>
  <footer>Dailog box footer content.</footer>
</Dialog>
```

## Author

Nimesh Deuja
