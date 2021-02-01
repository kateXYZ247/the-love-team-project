import * as actionTypes from "./actionTypes";
import axios from "../../shared/axios_instance";
import { API_PATH_PROVIDER_FETCH_REQUESTS } from "../../constant/api";
import { setMessage } from "./message";
import { MESSAGE_TYPE } from "../../constant/message";

export const fetchRequestsSuccess = (requests) => {
  return {
    type: actionTypes.PROVIDER_FETCH_REQUESTS.success,
    requests: requests,
  };
};

export const fetchRequestsFail = () => {
  return {
    type: actionTypes.PROVIDER_FETCH_REQUESTS.fail,
  };
};

export const fetchRequestsStart = () => {
  return {
    type: actionTypes.PROVIDER_FETCH_REQUESTS.start,
  };
};

export const fetchRequests = (userId) => {
  return (dispatch) => {
    dispatch(fetchRequestsStart());
    axios
      .get(API_PATH_PROVIDER_FETCH_REQUESTS + userId)
      .then((response) => {
        console.log(response);
        if (
          response.hasOwnProperty("data") &&
          response.data.hasOwnProperty("servList") &&
          response.data.servList.length > 0
        ) {
          dispatch(fetchRequestsSuccess(response.data.servList));
        } else {
          throw new Error("Non-valid data!");
        }
      })
      .catch((error) => {
        dispatch(fetchRequestsFail());
        dispatch(setMessage(MESSAGE_TYPE.warning, error.message));
      });
  };
};
