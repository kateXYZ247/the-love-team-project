import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";
import { AUTH_ROLE, LOCAL_STORAGE_TOKEN_KEY } from "../../constant/auth";

const initialState = {
  token: null,
  userId: null,
  userDetail: {
    firstName: "",
    lastName: null,
    role: AUTH_ROLE.user,
    address: "",
    zip: "",
    email: "",
    lastLoggedInTime: new Date(),
  },
  loading: false,
  authRedirectPath: "/",
  stompClient: null,
};

const setRedirectPath = (state, action) => {
  return updateObject(state, { authRedirectPath: action.path });
};

const loginStart = (state, action) => {
  return updateObject(state, {
    loading: true,
  });
};

const loginSuccess = (state, action) => {
  localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, action.token);
  sessionStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, action.token);
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
  sessionStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
  return updateObject(state, {
    token: null,
    userId: null,
    userDetail: updateObject(initialState.userDetail, {
      role: state.userDetail.role,
    }),
    loading: false,
  });
};

const setStompClient = (state, action) => {
  return updateObject(state, {
    stompClient: action.stompClient,
  });
};

const clearStompClient = (state, action) => {
  return updateObject(state, { stompClient: null });
};

const profileUpdateStart = (state, action) => {
  return updateObject(state, {});
};


const profileUpdateSuccess = (state, action) => {
  // update the old object with the newly updated object
  return updateObject(state, {
    // create a userDetail object with update fields
    userDetail: updateObject(state.userDetail, {
      firstName: action.firstName,
      lastName: action.lastName,
      address: action.address + ", " + action.zip,
      phone: action.phone,
    })
  });
};

const profileUpdateFail = (state, action) => {
  return state;
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
    case actionTypes.AUTH_SET_STOMP_CLIENT:
      return setStompClient(state, action);
    case actionTypes.AUTH_CLEAR_STOMP_CLIENT:
      return clearStompClient(state, action);
    case actionTypes.USER_PROFILE_UPDATE_STATUS.start:
      return profileUpdateStart(state, action);
    case actionTypes.USER_PROFILE_UPDATE_STATUS.success:
      return profileUpdateSuccess(state, action);
    case actionTypes.USER_PROFILE_UPDATE_STATUS.fail:
      return profileUpdateFail(state, action);
    default:
      return state;
  }
};

export default reducer;
