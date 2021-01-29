import * as actionTypes from "./actionTypes";
import axios from "../../shared/axios_instance";
import { PATH_USER_LOGIN } from "../../constant/api";
import { TOKEN_PREFIX } from "../../constant/auth";

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
    console.log(data);
    axios
      .post(PATH_USER_LOGIN, data)
      .then((response) => {
        if (response.status !== 200) {
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
        dispatch(loginFail(error));
      });
  };
};

export const logout = () => {
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};
