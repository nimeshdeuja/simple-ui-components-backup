// obj = onject, updatedProperties = Object to add in obj
export const UpdateObject = (obj, updatedProperties) => ({
  ...obj,
  ...updatedProperties,
});

// arr = array, updatedObject = Object to add in arr
export const UpdateArray = (arr, updatedObject) => [
  ...arr,
  { ...updatedObject },
];

// arr = array, sortBy = 'string' key name that you want to short, Take 'string' for ascending 'ASC' and for descending 'DESC'
export const ShortArray = (arr, sortBy, type) => {
  const orderArrays = (cur, nxt) => {
    let current = cur;
    let next = nxt;
    if (typeof curr !== "number" && typeof next !== "number") {
      current = cur.toUpperCase();
      next = nxt.toUpperCase();
    }

    if (current > next) {
      return 1;
    } else if (current < next) {
      return -1;
    } else {
      return 0;
    }
  };

  if (type === "ASC") {
    return arr.sort((a, b) => orderArrays(a[sortBy], b[sortBy]));
  } else {
    return arr.sort((a, b) => orderArrays(b[sortBy], a[sortBy]));
  }
};

// arr = array, indexBy = 'string' key name that you want to get indexOf, indexOf = 'string' value that you want to get index
export const GetIndexBy = (arr, indexBy, indexOf) => {
  let toReturn = -1;
  arr.forEach((item, index) => {
    if (item[indexBy] === indexOf) {
      toReturn = index;
    }
  });
  return toReturn;
};

// name = 'string' Full name
export const ShortNameGenerate = (name) => {
  let shortNameToReturn = "";
  if (name) {
    let splitName = name.split(" ").filter((item) => item !== "");
    let splitNameLength = splitName.length;
    if (splitNameLength <= 1) {
      shortNameToReturn = name.substring(0, 2);
    } else {
      let firstName = splitName[0];
      let lastName = splitName[splitNameLength - 1];
      shortNameToReturn = firstName.substring(0, 1) + lastName.substring(0, 1);
    }
  }
  return shortNameToReturn.toUpperCase();
};

export const CheckValidity = (value, rules) => {
  let isValid = true;
  if (!rules) {
    return true;
  }

  if (rules.required) {
    isValid = value !== "" && isValid;
    if (!rules.isNumeric) isValid = value.trim() !== "" && isValid;
  }

  if (rules.min) {
    isValid = value.length >= rules.min && isValid;
  }

  if (rules.max) {
    isValid = value.length <= rules.max && isValid;
  }

  if (rules.minVal) {
    if (rules.isNumeric) {
      value = value.replaceAll(",", ".");
    }
    isValid = value >= rules.minVal && isValid;
  }

  if (rules.maxVal) {
    if (rules.isNumeric) {
      value = value.replaceAll(",", ".");
    }
    isValid = value <= rules.maxVal && isValid;
  }

  if (rules.isEmail) {
    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    isValid = pattern.test(value) && isValid;
  }

  return isValid;
};
