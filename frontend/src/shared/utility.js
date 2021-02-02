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

export const checkValidity = (value, rules) => {
  let isValid = true;
  if (rules.required) {
    isValid = value.trim() !== "" && isValid;
  }
  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid;
  }
  if (rules.maxLength) {
    isValid = value.length <= rules.maxLength && isValid;
  }
  return isValid;
};


