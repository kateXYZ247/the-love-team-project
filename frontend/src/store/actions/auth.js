import * as actionTypes from "./actionTypes";
import axios from "../../shared/axios_instance";
import { API_PATH_USER_LOGIN, HTTP_STATUS_OK } from "../../constant/api";
import { TOKEN_PREFIX } from "../../constant/auth";
import { clearCart } from "./order";

export const setRedirectPath = (path) => {
  return {
    type: actionTypes.AUTH_SET_REDIRECT_PATH,
    path: path,
  };
};

export const loginSuccess = (token) => {
  return {
    type: actionTypes.AUTH_LOGIN_SUCCESS,
    token: token,
  };
};

export const loginFail = (error) => {
  return {
    type: actionTypes.AUTH_LOGIN_FAIL,
    error: error,
  };
};

export const loginStart = () => {
  return {
    type: actionTypes.AUTH_LOGIN_START,
  };
};

export const login = (username, password) => {
  return (dispatch) => {
    dispatch(loginStart());
    const data = {
      loginId: username,
      role: "user",
      loginType: "BY_EMAIL",
      password: password,
    };
    axios
      .post(API_PATH_USER_LOGIN, data)
      .then((response) => {
        if (response.status !== HTTP_STATUS_OK) {
          throw new Error("Login failed");
        }
        const { headers } = response;
        if (
          headers === null ||
          !headers.hasOwnProperty("authorization") ||
          !headers.authorization.startsWith(TOKEN_PREFIX)
        ) {
          throw new Error("bad response");
        }
        dispatch(
          loginSuccess(headers.authorization.substr(TOKEN_PREFIX.length))
        );
      })
      .catch((error) => {
        dispatch(loginFail(error.message));
      });
  };
};

export const logoutAndCleanCart = () => {
  return (dispatch) => {
    dispatch(logout());
    dispatch(clearCart());
  };
};

export const logout = () => {
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};
