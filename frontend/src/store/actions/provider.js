import * as actionTypes from "./actionTypes";
import axios from "../../shared/axios_instance";
import {
  API_PATH_PROVIDER_ACCEPT_REQUEST,
  API_PATH_PROVIDER_FETCH_REQUESTS,
  HTTP_STATUS_OK,
} from "../../constant/api";
import { setMessage } from "./message";
import { MESSAGE_TYPE } from "../../constant/message";

const fetchRequestsSuccess = (requests) => {
  return {
    type: actionTypes.PROVIDER_FETCH_REQUESTS.success,
    requests: requests,
  };
};

const fetchRequestsFail = () => {
  return {
    type: actionTypes.PROVIDER_FETCH_REQUESTS.fail,
  };
};

const fetchRequestsStart = () => {
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
        if (
          response.hasOwnProperty("data") &&
          response.data.hasOwnProperty("servList") &&
          response.data.servList.length > 0
        ) {
          const servList = response.data.servList.map((serv) => {
            serv.startTime = new Date(serv.startTime);
            return serv;
          });
          dispatch(fetchRequestsSuccess(servList));
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

export const declineRequest = (removeIndex) => {
  return {
    type: actionTypes.PROVIDER_DECLINE_REQUEST,
    removeIndex: removeIndex,
  };
};

const acceptRequestStart = (index) => {
  return {
    type: actionTypes.PROVIDER_ACCEPT_REQUEST.start,
    index: index,
  };
};

const acceptRequestSuccess = (index) => {
  return {
    type: actionTypes.PROVIDER_ACCEPT_REQUEST.success,
    index: index,
  };
};

const acceptRequestFail = () => {
  return {
    type: actionTypes.PROVIDER_ACCEPT_REQUEST.fail,
  };
};

export const acceptRequest = (serviceIndex, serviceId) => {
  return (dispatch) => {
    dispatch(acceptRequestStart());
    axios
      .patch(API_PATH_PROVIDER_ACCEPT_REQUEST + serviceId)
      .then((response) => {
        if (response.status === HTTP_STATUS_OK) {
          dispatch(acceptRequestSuccess(serviceIndex));
        } else {
          throw new Error(response.statusText);
        }
      })
      .catch((error) => {
        dispatch(acceptRequestFail());
        dispatch(setMessage(MESSAGE_TYPE.warning, error.message));
      });
  };
};
