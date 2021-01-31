import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";
import { MESSAGE_TYPE } from "../../constant/message";

const initialState = {
  message: null, // display Snackbar message
  messageType: MESSAGE_TYPE.success,
};

const setMessage = (state, action) => {
  return updateObject(state, {
    message: action.message,
    messageType: action.messageType,
  });
};

const clearMessage = (state, action) => {
  return updateObject(state, initialState);
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.MESSAGE_SET_MESSAGE:
      return setMessage(state, action);
    case actionTypes.MESSAGE_CLEAR_MESSAGE:
      return clearMessage(state, action);
    default:
      return state;
  }
};

export default reducer;
