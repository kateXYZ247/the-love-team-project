import * as actionTypes from "./actionTypes";
import axios from "../../shared/axios_instance";
import {
  API_PATH_PROVIDER_ACCEPT_REQUEST,
  API_PATH_PROVIDER_FETCH_REQUESTS,
  API_PATH_PROVIDER_FETCH_SERVICES,
  HTTP_STATUS_OK,
} from "../../constant/api";
import { setMessage } from "./message";
import { MESSAGE_TYPE } from "../../constant/message";
import { PROVIDER_FETCH_SERVICES_TYPE } from "../../constant/provider";

const fetchServicesSuccess = (fetchType, services) => {
  return {
    type: actionTypes.PROVIDER_FETCH_SERVICES.success,
    fetchType: fetchType,
    services: services,
  };
};

const fetchServicesFail = (fetchType) => {
  return {
    type: actionTypes.PROVIDER_FETCH_SERVICES.fail,
    fetchType: fetchType,
  };
};

const fetchServicesStart = () => {
  return {
    type: actionTypes.PROVIDER_FETCH_SERVICES.start,
  };
};

export const fetchServices = (type, userId) => {
  return (dispatch) => {
    dispatch(fetchServicesStart());
    let url = "";
    switch (type) {
      case PROVIDER_FETCH_SERVICES_TYPE.requests:
        url = API_PATH_PROVIDER_FETCH_REQUESTS + userId;
        break;
      case PROVIDER_FETCH_SERVICES_TYPE.upcomingServices:
        url = API_PATH_PROVIDER_FETCH_SERVICES + userId;
        break;
      case PROVIDER_FETCH_SERVICES_TYPE.historicalServices:
        url = API_PATH_PROVIDER_FETCH_SERVICES + userId;
        break;
      default:
    }
    axios
      .get(url)
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
          dispatch(fetchServicesSuccess(type, servList));
        } else {
          throw new Error("Invalid data!");
        }
      })
      .catch((error) => {
        dispatch(fetchServicesFail(type));
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
