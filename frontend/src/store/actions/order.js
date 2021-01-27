import * as actionTypes from "./actionTypes";

export const addToCart = (product) => {
  return {
    type: actionTypes.ORDER_ADD_TO_CART,
    product: product,
  };
};

export const updateServiceTimeAddress = (time, address) => {
  return {
    type: actionTypes.ORDER_UPDATE_SERVICE_TIME_ADDRESS,
    time: time,
    address: address,
  };
};

export const updatePaymentInfo = (creditCard) => {
  return {
    type: actionTypes.ORDER_UPDATE_PAYMENT_INFO,
    creditCard: creditCard,
  };
};
