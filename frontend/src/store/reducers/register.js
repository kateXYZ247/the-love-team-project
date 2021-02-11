import { registerConstants } from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  firstName: "",
  lastName: null,
  phone: null,
  email: null,
  error: null,
  loading: false,
  flag: false,
};

const registerStart = (state, action) => {
  return updateObject(state, { loading: true });
};
const registerReset = (state, action) => {
  return updateObject(state, { flag: false });
};
const registerSuccess = (state, action) => {
  return updateObject(state, {
    firstName: action.firstName,
    lastName: action.lastName,
    phone: action.phone,
    email: action.email,
    loading: false,
    flag: true,
  });
};
const registerFail = (state, action) => {
  return updateObject(state, { loading: false });
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case registerConstants.REGISTER_REQUEST:
      return registerStart(state, action);
    case registerConstants.REGISTER_SUCCESS:
      return registerSuccess(state, action);
    case registerConstants.REGISTER_FAILURE:
      return registerFail(state, action);
    case registerConstants.REGISTER_RESET:
      return registerReset(state, action);
    default:
      return state;
  }
};

export default reducer;
