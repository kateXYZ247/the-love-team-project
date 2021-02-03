import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";
import { AUTH_ROLE, LOCAL_STORAGE_TOKEN_KEY } from "../../constant/auth";
import { PATH_PROVIDER_LIST_SERVICES } from "../../constant/path";

const initialState = {
  token: null,
  userId: null,
  userDetail: {
    firstName: null,
    lastName: null,
    role: AUTH_ROLE.user,
    address: "",
    zip: "",
    email: "",
    lastLoggedInTime: new Date(),
  },
  loading: false,
  authRedirectPath: "/",
};

const setRedirectPath = (state, action) => {
  return updateObject(state, { authRedirectPath: action.path });
};

const loginStart = (state, action) => {
  return updateObject(state, {
    loading: true,
    authRedirectPath:
      action.role === AUTH_ROLE.provider
        ? PATH_PROVIDER_LIST_SERVICES
        : state.authRedirectPath,
  });
};

const loginSuccess = (state, action) => {
  localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, action.token);
  return updateObject(state, {
    userId: action.userId,
    token: action.token,
  });
};

const setUserDetail = (state, action) => {
  const { role } = action;
  let { data } = action;
  if (role === AUTH_ROLE.provider) {
    data = updateObject(action.data.provider, {
      productName: action.data.productName,
    });
  }
  return updateObject(state, {
    userDetail: data,
    loading: false,
  });
};

const loginGetInfoFail = (state, action) => {
  return updateObject(state, { loading: false });
};

const logout = (state, action) => {
  localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
  return updateObject(state, {
    token: null,
    userId: null,
    userDetail: updateObject(initialState.userDetail, {
      role: state.userDetail.role,
    }),
    loading: false,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_LOGIN_START:
      return loginStart(state, action);
    case actionTypes.AUTH_LOGIN_SUCCESS:
      return loginSuccess(state, action);
    case actionTypes.AUTH_LOGIN_GET_INFO_FAIL:
      return loginGetInfoFail(state, action);
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
