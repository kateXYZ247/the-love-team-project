import { orderGratuityRate, orderTaxRate } from "../constant/order";


export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties,
  };
};

export const calculateTotalPrice = (services) => {
  const subTotal = services.reduce((acc, s) => acc + s.productPrice, 0);
  return subTotal * (1 + orderTaxRate) * (1 + orderGratuityRate);
};

// export const checkValidity = (value, rules) => {
//   let isValid = true;
//   if (rules.required) {
//     isValid = value.trim() !== "" && isValid;
//   }
//   if (rules.minLength) {
//     isValid = value.length >= rules.minLength && isValid;
//   }
//   if (rules.maxLength) {
//     isValid = value.length <= rules.maxLength && isValid;
//   }
//   return isValid;
// };

export const checkValidity = (field, value) => {
  let isValid = "";
  switch (field) {
      case "email":
        if (/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value)) {
          return isValid;
        }
        if (value.trim() === "") {
          isValid = "null";
        } else {
          isValid = "invalid";
        }
        return isValid;
      case "name":
        if (/^[a-zA-Z -]/.test(value)) {
          return isValid;
        }
        if (value.trim() === "") {
          isValid = "null";
        } else {
          isValid = "invalid";
        }
        return isValid;
    case "phone":
      if (/[^a-zA-Z -]/.test(value)) {
        return isValid;
      }
      if (value.trim() === "") {
        isValid = "null";
      } else {
        isValid = "invalid";
      }
      return isValid;
    case "password":
      if (value.length < 3) {
        isValid = "invalid";
      }
      return isValid;
    case "address":
      if (value.trim() === "") {
        isValid = "null";
      }
      return isValid;
    case "number":
      if (value.trim() === "") {
        isValid = "null";
        //amex length == 17, visa length == 19
      } else if (value.length < 17 || value.length > 22) {
        isValid = "invalid";
      }
        return isValid;
    case "expiry":
      if (value.trim() === "") {
        isValid = "null";
      } else if (value.length !== 5) {
        isValid = "invalid";
      }
      return isValid;
    case "cvc":
      if (value.trim() === "") {
        isValid = "null";
      } else if (value.length < 3) {
        isValid = "invalid";
      }
      return isValid;
    default:
      return isValid;

  }
};


