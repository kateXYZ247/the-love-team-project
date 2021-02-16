// import axios from 'axios';
import { registerConstants } from "./actionTypes";
import axios from "../../shared/axios_instance";
import { API_PATH_USER_REGISTER } from "../../constant/api";
import { setMessage } from "./message";
import { MESSAGE_TYPE } from "../../constant/message";

export const registerSuccess = () => {
  return {
    type: registerConstants.REGISTER_SUCCESS,
  };
};
export const registerReset = () => {
  return {
    type: registerConstants.REGISTER_RESET,
  };
};
export const registerFail = (error) => {
  return {
    type: registerConstants.REGISTER_FAILURE,
    error: error,
  };
};

export const registerStart = () => {
  return {
    type: registerConstants.REGISTER_REQUEST,
  };
};
export const register = (user) => {
  return (dispatch) => {
    dispatch(registerStart());
    const data = {
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      email: user.email,
      password: user.password,
    };
    axios
      .post(API_PATH_USER_REGISTER, data)
      // .post("http://localhost:8080/users/register", data)
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("Register failed");
        }

        dispatch(setMessage(MESSAGE_TYPE.info, "Welcome , " + data.firstName));
        dispatch(registerSuccess());
      })
      .catch((error) => {
        dispatch(registerFail(error));
        if (error.response) {
          const { errors } = error.response.data;
          dispatch(setMessage(MESSAGE_TYPE.warning, errors[0].message));
        } else {
          dispatch(setMessage(MESSAGE_TYPE.warning, error.message));
        }
      });
  };
};
