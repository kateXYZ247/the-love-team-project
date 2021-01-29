import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";
import { productList } from "../../constant/products";
import { LOCAL_STORAGE_TOKEN_KEY } from "../../constant/auth";

const initialState = {
  token: null,
  userId: null,
  firstName: null,
  lastName: null,
  role: null,
  error: null,
  loading: false,
  authRedirectPath: "/",
};

function loginStart(state, action) {
  return updateObject(state, { loading: true });
}

function loginSuccess(state, action) {
  localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, action.token);
  return updateObject(state, {
    userId: action.userId,
    firstName: action.firstName,
    lastName: action.lastName,
    role: action.role,
    token: action.token,
    loading: false,
  });
}

function loginFail(state, action) {
  return updateObject(state, { products: [...productList], loading: false });
}

function logout(state, action) {
  localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
  return updateObject(state, {
    token: null,
    userId: null,
    firstName: null,
    lastName: null,
    role: null,
    loading: false,
  });
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_LOGIN_START:
      return loginStart(state, action);
    case actionTypes.AUTH_LOGIN_SUCCESS:
      return loginSuccess(state, action);
    case actionTypes.AUTH_LOGIN_FAIL:
      return loginFail(state, action);
    case actionTypes.AUTH_LOGOUT:
      return logout(state, action);
    default:
      return state;
  }
};

export default reducer;
