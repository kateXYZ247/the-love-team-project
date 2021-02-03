import * as actionTypes from "./actionTypes";
import axios from "../../shared/axios_instance";
import { API_PATH_USER_PLACE_ORDER, HTTP_STATUS_OK } from "../../constant/api";
import { updateObject } from "../../shared/utility";
import { setMessage } from "./message";
import { MESSAGE_TYPE } from "../../constant/message";

export const addToCart = (product) => {
  return {
    type: actionTypes.ORDER_ADD_TO_CART,
    product: product,
  };
};

export const deleteFromCart = (productIndex) => {
  return {
    type: actionTypes.ORDER_DELETE_FROM_CART,
    deleteIndex: productIndex,
  };
};

export const updateCart = () => {
  return {
    type: actionTypes.ORDER_UPDATE_CART,
  };
};

export const updateServiceTimeAddress = (startTime, address) => {
  return {
    type: actionTypes.ORDER_UPDATE_SERVICE_TIME_ADDRESS,
    startTime: startTime,
    address: address,
  };
};

export const switchToPayment = () => {
  return {
    type: actionTypes.ORDER_SWITCH_TO_PAYMENT,
  };
};

export const updatePaymentInfo = (creditCard) => {
  return {
    type: actionTypes.ORDER_UPDATE_PAYMENT_INFO,
    creditCard: creditCard,
  };
};

export const setBackStatus = () => {
  return {
    type: actionTypes.ORDER_SET_BACK_STATUS,
  };
};

export const resetStatus = () => {
  return {
    type: actionTypes.ORDER_RESET_STATUS,
  };
};

export const clearCart = () => {
  return {
    type: actionTypes.ORDER_CLEAR_CART,
  };
};

export const placeOrderStart = () => {
  return {
    type: actionTypes.ORDER_PLACE_ORDER_START,
  };
};

export const placeOrderSuccess = () => {
  return {
    type: actionTypes.ORDER_PLACE_ORDER_SUCCESS,
  };
};

export const placeOrderFail = () => {
  return {
    type: actionTypes.ORDER_PLACE_ORDER_FAIL,
  };
};

export const placeOrder = (order, userId) => {
  const requestBody = updateObject(order, {
    services: null,
    servs: order.services,
    userId: userId,
  });
  return (dispatch) => {
    dispatch(placeOrderStart());
    axios
      .post(API_PATH_USER_PLACE_ORDER, requestBody)
      .then((response) => {
        if (response.status === HTTP_STATUS_OK) {
          dispatch(placeOrderSuccess());
          dispatch(setMessage(MESSAGE_TYPE.success, response.data));
        } else {
          throw new Error(response.statusText);
        }
      })
      .catch((error) => {
        dispatch(placeOrderFail());
        dispatch(setMessage(MESSAGE_TYPE.error, error.message));
      });
  };
};
