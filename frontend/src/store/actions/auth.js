import * as actionTypes from "./actionTypes";
import axios from "../../shared/axios_instance";
import {
  API_PATH_USER_UPDATE_ACCOUNT,
  API_PATH_ADMIN_DETAIL,
  API_PATH_ADMIN_LOGIN,
  API_PATH_PROVIDER_DETAIL,
  API_PATH_PROVIDER_LOGIN,
  API_PATH_USER_DETAIL,
  API_PATH_USER_LOGIN,
  API_SUB_PATH_PROVIDER_LOCATION,
  HTTP_STATUS_OK,
  WS_PATH_CONNECT,
  WS_PATH_PROVIDERS,
  WS_PATH_REPLY,
  WS_PATH_USER,
} from "../../constant/api";
import { AUTH_ROLE, TOKEN_PREFIX } from "../../constant/auth";
import { setMessage } from "./message";
import { MESSAGE_TYPE } from "../../constant/message";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { AUTH_CLEAR_STOMP_CLIENT, AUTH_SET_STOMP_CLIENT } from "./actionTypes";
import { addPushedRequest } from "./provider";

export const setRedirectPath = (path) => {
  return {
    type: actionTypes.AUTH_SET_REDIRECT_PATH,
    path: path,
  };
};

const providerUpdateLocationStart = () => {
  return {
    type: actionTypes.PROVIDER_UPDATE_LOCATION.start,
  };
};

const providerUpdateLocationSuccess = (latitude, longitude) => {
  return {
    type: actionTypes.PROVIDER_UPDATE_LOCATION.success,
    latitude: latitude,
    longitude: longitude,
  };
};

const providerUpdateLocationFail = () => {
  return {
    type: actionTypes.PROVIDER_UPDATE_LOCATION.fail,
  };
};

export const providerUpdateLocation = (providerId, latitude, longitude) => {
  return (dispatch) => {
    dispatch(providerUpdateLocationStart());
    const data = {
      providerId: providerId,
      latitude: latitude,
      longitude: longitude,
    };
    axios
      .patch(
        API_PATH_PROVIDER_DETAIL + providerId + API_SUB_PATH_PROVIDER_LOCATION,
        data
      )
      .then((response) => {
        if (response.status === HTTP_STATUS_OK) {
          const { data } = response;
          dispatch(
            providerUpdateLocationSuccess(data.latitude, data.longitude)
          );
          dispatch(
            setMessage(MESSAGE_TYPE.success, "Location Successfully Updated!")
          );
        } else {
          throw new Error(response.statusText);
        }
      })
      .catch((error) => {
        dispatch(providerUpdateLocationFail());
        dispatch(setMessage(MESSAGE_TYPE.warning, error.message));
      });
  };
};

export const loginSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_LOGIN_SUCCESS,
    token: token,
    userId: userId,
  };
};

export const setUserDetail = (data, role) => {
  return {
    type: actionTypes.AUTH_SET_USER_DETAIL,
    data: data,
    role: role,
  };
};

export const loginGetInfoFail = (error) => {
  return {
    type: actionTypes.AUTH_LOGIN_GET_INFO_FAIL,
    error: error,
  };
};

export const loginStart = (role) => {
  return {
    type: actionTypes.AUTH_LOGIN_START,
    role: role,
  };
};

// Login, get userDetails, connected to websocket
export const login = (username, password, role) => {
  return (dispatch) => {
    // setup redirect path after login
    dispatch(loginStart(role));
    const data = {
      loginId: username,
      role: role,
      loginType: "BY_EMAIL",
      password: password,
    };
    const urlLogin =
      role === AUTH_ROLE.user ? API_PATH_USER_LOGIN : role === AUTH_ROLE.provider ? API_PATH_PROVIDER_LOGIN : API_PATH_ADMIN_LOGIN;
    const urlDetail =
      role === AUTH_ROLE.user ? API_PATH_USER_DETAIL : role === AUTH_ROLE.provider ? API_PATH_PROVIDER_DETAIL : API_PATH_ADMIN_DETAIL;
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
        // connect to websocket
        if (role === AUTH_ROLE.provider) {
          dispatch(connectToWebSocket(data, headers.authorization));
        }
        return axios.get(urlDetail + data);
      })
      .then((response) => {
        if (response.status !== HTTP_STATUS_OK || response.data === null) {
          throw new Error("Get user info failed");
        }
        // data = userDetail
        const { data } = response;
        dispatch(setUserDetail(data, role));
        const firstName =
          role === AUTH_ROLE.user ? data.firstName
              :
          role === AUTH_ROLE.provider ? data.provider.firstName
              :
          data.firstName;
        dispatch(setMessage(MESSAGE_TYPE.info, "Welcome back, " + firstName));
      })
      .catch((error) => {
        dispatch(loginGetInfoFail());
        dispatch(setMessage(MESSAGE_TYPE.error, error.message));
      });
  };
};

export const logoutAndMessage = () => {
  return (dispatch) => {
    dispatch(logout());
    dispatch(setMessage(MESSAGE_TYPE.info, "See you next time!"));
  };
};

export const logout = () => {
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

const setStompClient = (stompClient) => {
  return {
    type: AUTH_SET_STOMP_CLIENT,
    stompClient: stompClient,
  };
};

const connectToWebSocket = (userId, token) => {
  return (dispatch) => {
    let socket = new SockJS(
      process.env.REACT_APP_BACKEND_URL + WS_PATH_CONNECT
    );
    const stompClient = Stomp.over(socket);
    stompClient.connect(
      {
        Authorization: token,
      },
      () => {
        stompClient.subscribe(WS_PATH_PROVIDERS, (message) => {
          dispatch(
            setMessage(
              MESSAGE_TYPE.info,
              "Notification: " + JSON.parse(message.body).content
            )
          );
        });
        stompClient.subscribe(
          WS_PATH_USER + userId + WS_PATH_REPLY,
          (message) => {
            // console.log("received from private: ", JSON.parse(message.body));
            dispatch(addPushedRequest(JSON.parse(message.body)));
          }
        );
      }
    );
    dispatch(setStompClient(stompClient));
  };
};

export const disconnectWebSocket = (stompClient) => {
  return (dispatch) => {
    if (stompClient !== null) {
      stompClient.disconnect();
    }
    dispatch(clearStompClient());
  };
};

const clearStompClient = () => {
  return {
    type: AUTH_CLEAR_STOMP_CLIENT,
  };
};

export const profileUpdateStart = () => {
  return {
    type: actionTypes.USER_PROFILE_UPDATE_STATUS.start,
  };
};

// is this the correct way to use it?
export const profileUpdateSuccess = (firstName, lastName, address, phone) => {
  return {
    type: actionTypes.USER_PROFILE_UPDATE_STATUS.success,
    firstName: firstName,
    lastName: lastName,
    address: address,
    phone: phone,
  };
};


export const profileUpdateFail = (error) => {
  return {
    type: actionTypes.USER_PROFILE_UPDATE_STATUS.fail,
    error: error,
  };
};

// sending request to the backend

export const profileUpdate = (userId, firstName, lastName, address, phone) => {
  console.log(firstName);
  return (dispatch) => {
    dispatch(profileUpdateStart);
    axios(API_PATH_USER_DETAIL + userId + API_PATH_USER_UPDATE_ACCOUNT, {
      // UI updated data for backend to update
      data: {
        firstName: firstName,
        lastName: lastName,
        address: address,
        phone: phone,
      },
      method: "put",
    })
        .then((response) => {
          console.log(response);
          if (response.status !== 200) {
            throw new Error("Profile Update Failed!")
          }
          const { successMsg } = response.data;
          dispatch(profileUpdateSuccess(userId, firstName, lastName, address, phone));
          dispatch(setMessage(MESSAGE_TYPE.info, successMsg));
        })
        .catch((error) => {
          console.log(error);
          const { errors } = error.response.data;
          console.log(errors);
          dispatch(profileUpdateFail(error));
          dispatch(setMessage(MESSAGE_TYPE.error, errors[0].message));
        });
  };
};
