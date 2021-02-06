import * as actionTypes from "./actionTypes";
import axios from "../../shared/axios_instance";
import {
  API_PARAMETER_PROVIDER_FETCH_REQUESTS,
  API_PARAMETER_PROVIDER_FETCH_UPCOMING,
  API_PATH_PROVIDER_ACCEPT_REQUEST,
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
    let url = API_PATH_PROVIDER_FETCH_SERVICES;
    switch (type) {
      case PROVIDER_FETCH_SERVICES_TYPE.requests:
        url += userId + API_PARAMETER_PROVIDER_FETCH_REQUESTS;
        break;
      case PROVIDER_FETCH_SERVICES_TYPE.upcomingServices:
        url += userId + API_PARAMETER_PROVIDER_FETCH_UPCOMING;
        break;
      case PROVIDER_FETCH_SERVICES_TYPE.historicalServices:
        url += userId;
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
            serv.endTime = new Date(serv.endTime);
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

const updateServiceStatusStart = (index) => {
  return {
    type: actionTypes.PROVIDER_UPDATE_SERVICE_STATUS.start,
    index: index,
  };
};

const updateServiceStatusSuccess = (index, updatedStatus) => {
  return {
    type: actionTypes.PROVIDER_UPDATE_SERVICE_STATUS.success,
    index: index,
    updatedStatus: updatedStatus,
  };
};

const updateServiceStatusFail = () => {
  return {
    type: actionTypes.PROVIDER_UPDATE_SERVICE_STATUS.fail,
  };
};

export const updateServiceStatus = (
  serviceIndex,
  serviceId,
  providerId,
  updatedStatus
) => {
  return (dispatch) => {
    dispatch(updateServiceStatusStart());
    const data = {
      serviceId: serviceId,
      providerId: providerId,
      status: updatedStatus,
    };
    axios
      .patch(API_PATH_PROVIDER_ACCEPT_REQUEST + serviceId, data)
      .then((response) => {
        if (response.status === HTTP_STATUS_OK) {
          dispatch(updateServiceStatusSuccess(serviceIndex, updatedStatus));
          dispatch(
            setMessage(MESSAGE_TYPE.success, `Service ${updatedStatus}!`)
          );
        } else {
          throw new Error(response.statusText);
        }
      })
      .catch((error) => {
        dispatch(updateServiceStatusFail());
        dispatch(setMessage(MESSAGE_TYPE.warning, error.message));
      });
  };
};
