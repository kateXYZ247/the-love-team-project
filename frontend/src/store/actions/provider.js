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

function DateComparator(service1, service2) {
  if (service1.startTime < service2.startTime) {
    return -1;
  } else if (service1.startTime > service2.startTime) {
    return 1;
  } else {
    return 0;
  }
}

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
          response.data.hasOwnProperty("servList")
        ) {
          const servList = response.data.servList.map((serv) => {
            serv.startTime = new Date(serv.startTime);
            serv.endTime = new Date(serv.endTime);
            return serv;
          });
          servList.sort(DateComparator);
          dispatch(fetchServicesSuccess(type, servList));
        } else {
          throw new Error("Invalid data!");
        }
      })
      .catch((error) => {
        if (
          error
            .toString()
            .includes("Cannot read property 'hasOwnProperty' of undefined")
        ) {
          dispatch(
            setMessage(MESSAGE_TYPE.warning, "TIME OUT! PLEASE LOG IN AGAIN!")
          );
        } else {
          dispatch(fetchServicesFail(type));
          dispatch(setMessage(MESSAGE_TYPE.warning, error.message));
        }
      });
  };
};

export const clearFetchedServices = (source) => {
  return {
    type: actionTypes.PROVIDER_CLEAR_FETCHED_SERVICES,
    source: source,
  };
};

export const declineRequest = (removeIndex, source) => {
  return {
    type: actionTypes.PROVIDER_DECLINE_REQUEST,
    removeIndex: removeIndex,
    source: source,
  };
};

const updateServiceStatusStart = (index) => {
  return {
    type: actionTypes.PROVIDER_UPDATE_SERVICE_STATUS.start,
    index: index,
  };
};

const updateServiceStatusSuccess = (source, index, updatedStatus) => {
  return {
    type: actionTypes.PROVIDER_UPDATE_SERVICE_STATUS.success,
    source: source,
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
  updatedStatus,
  serviceSource
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
          dispatch(
            updateServiceStatusSuccess(
              serviceSource,
              serviceIndex,
              updatedStatus
            )
          );
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

export const addPushedRequest = (service) => {
  return {
    type: actionTypes.PROVIDER_ADD_PUSHED_REQUEST,
    service: service,
  };
};

export const clearPushedRequest = () => {
  return {
    type: actionTypes.PROVIDER_CLEAR_PUSHED_REQUEST,
  };
};
