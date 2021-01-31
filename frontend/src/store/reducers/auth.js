import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";
import { LOCAL_STORAGE_TOKEN_KEY } from "../../constant/auth";
import { PATH_HOME } from "../../constant/path";

const initialState = {
  token: null,
  userId: null,
  firstName: null,
  lastName: null,
  role: null,
  address: "",
  zip: "",
  email: "",
  lastLoggedInTime: new Date(),
  error: null,
  loading: false,
  authRedirectPath: "/",
};

const setRedirectPath = (state, action) => {
  return updateObject(state, { authRedirectPath: action.path });
};

const loginStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const loginSuccess = (state, action) => {
  localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, action.token);
  return updateObject(state, {
    userId: action.userId,
    token: action.token,
  });
};

const setUserDetail = (state, action) => {
  const { userDetail } = action;
  return updateObject(state, {
    firstName: userDetail.firstName,
    lastName: userDetail.lastName,
    role: userDetail.role,
    address: userDetail.address,
    zip: userDetail.zip,
    email: userDetail.email,
    lastLoggedInTime: new Date(userDetail.lastLoggedInTime),
    loading: false,
  });
};

const loginFail = (state, action) => {
  return updateObject(state, { error: action.error, loading: false });
};

const logout = (state, action) => {
  localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
  return updateObject(state, {
    token: null,
    userId: null,
    firstName: null,
    lastName: null,
    role: null,
    address: "",
    zip: "",
    email: "",
    lastLoggedInTime: new Date(),
    loading: false,
    authRedirectPath: PATH_HOME,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_LOGIN_START:
      return loginStart(state, action);
    case actionTypes.AUTH_LOGIN_SUCCESS:
      return loginSuccess(state, action);
    case actionTypes.AUTH_LOGIN_FAIL:
      return loginFail(state, action);
    case actionTypes.AUTH_SET_USER_DETAIL:
      return setUserDetail(state, action);
    case actionTypes.AUTH_LOGOUT:
      return logout(state, action);
    case actionTypes.AUTH_SET_REDIRECT_PATH:
      return setRedirectPath(state, action);
    default:
      return state;
  }
};

export default reducer;
