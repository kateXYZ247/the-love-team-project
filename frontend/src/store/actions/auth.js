import * as actionTypes from "./actionTypes";
import axios from "../../shared/axios_instance";
import {
  API_PATH_PROVIDER_DETAIL,
  API_PATH_PROVIDER_LOGIN,
  API_PATH_USER_DETAIL,
  API_PATH_USER_LOGIN,
  HTTP_STATUS_OK,
} from "../../constant/api";
import { AUTH_ROLE, TOKEN_PREFIX } from "../../constant/auth";
import { clearCart } from "./order";
import { setMessage } from "./message";
import { MESSAGE_TYPE } from "../../constant/message";

export const setRedirectPath = (path) => {
  return {
    type: actionTypes.AUTH_SET_REDIRECT_PATH,
    path: path,
  };
};

export const loginSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_LOGIN_SUCCESS,
    token: token,
    userId: userId,
  };
};

export const setUserDetail = (userDetail) => {
  return {
    type: actionTypes.AUTH_SET_USER_DETAIL,
    userDetail: userDetail,
  };
};

export const loginGetInfoFail = (error) => {
  return {
    type: actionTypes.AUTH_LOGIN_GET_INFO_FAIL,
    error: error,
  };
};

export const loginStart = () => {
  return {
    type: actionTypes.AUTH_LOGIN_START,
  };
};

export const login = (username, password, role) => {
  return (dispatch) => {
    dispatch(loginStart());
    const data = {
      loginId: username,
      role: role,
      loginType: "BY_EMAIL",
      password: password,
    };
    const urlLogin =
      role === AUTH_ROLE.user ? API_PATH_USER_LOGIN : API_PATH_PROVIDER_LOGIN;
    const urlDetail =
      role === AUTH_ROLE.user ? API_PATH_USER_DETAIL : API_PATH_PROVIDER_DETAIL;
    axios
      .post(urlLogin, data)
      .then((response) => {
        if (response.status !== HTTP_STATUS_OK) {
          throw new Error("Login failed");
        }
        // data = userId
        const { headers, data } = response;
        if (
          headers === null ||
          !headers.hasOwnProperty("authorization") ||
          !headers.authorization.startsWith(TOKEN_PREFIX)
        ) {
          throw new Error("bad response");
        }
        dispatch(
          loginSuccess(headers.authorization.substr(TOKEN_PREFIX.length), data)
        );
        return axios.get(urlDetail + data);
      })
      .then((response) => {
        if (response.status !== HTTP_STATUS_OK) {
          throw new Error("Get user info failed");
        }
        // data = userDetail
        const { data } = response;
        dispatch(setUserDetail(data));
        if (data !== null && data.hasOwnProperty("firstName")) {
          dispatch(
            setMessage(MESSAGE_TYPE.info, "Welcome back, " + data.firstName)
          );
        }
      })
      .catch((error) => {
        dispatch(loginGetInfoFail());
        dispatch(setMessage(MESSAGE_TYPE.error, error.message));
      });
  };
};

export const logoutAndCleanCart = () => {
  return (dispatch) => {
    dispatch(logout());
    dispatch(clearCart());
    dispatch(setMessage(MESSAGE_TYPE.info, "See you next time!"));
  };
};

export const logout = () => {
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};
