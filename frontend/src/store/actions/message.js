import * as actionTypes from "./actionTypes";

export const setMessage = (messageType, message) => {
  return {
    type: actionTypes.MESSAGE_SET_MESSAGE,
    messageType: messageType,
    message: message,
  };
};

export const clearMessage = () => {
  return {
    type: actionTypes.MESSAGE_CLEAR_MESSAGE,
  };
};
